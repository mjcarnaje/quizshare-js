import React from 'react';
import { Avatar, Box, Flex, Heading, PseudoBox, Text } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import moment from 'moment';

import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import { Link } from 'react-router-dom';
import MenuButtons from './MenuButtons';

const Card = ({
	quizData: {
		id,
		title,
		description,
		likes,
		likeCount,
		comments,
		commentCount,
		createdAt,
		author: { avatar, username },
	},
}) => {
	const user = useSelector((state) => state.auth.user);
	return (
		<PseudoBox
			w='320px'
			minH='180px'
			rounded='8px'
			boxShadow='sm'
			bg='white'
			padding='8px'
			display='flex'
			flexDirection='column'
			cursor='pointer'
			_hover={{ bg: 'gray.50' }}
		>
			<Flex align='center' justify='space-between' as={Link} to={`/quiz/${id}`}>
				<Box display='flex' alignItems='center'>
					<Avatar name='Michael James' src={avatar} />
					<Box marginLeft='8px'>
						<Heading
							as='h2'
							fontSize='12px'
							fontFamily='inter'
							fontWeight='semibold'
						>
							{username.toUpperCase()}
						</Heading>
						<Text
							fontSize='xs'
							fontFamily='inter'
							color='gray.300'
							lineHeight='1'
						>
							{moment(new Date(parseInt(createdAt)).toISOString()).fromNow(
								true
							)}
						</Text>
					</Box>
				</Box>
				<Heading
					as='h2'
					maxW='50%'
					fontFamily='inter'
					color='gray.700'
					fontSize='17px'
					px='4px'
					wordBreak='break-word'
					textAlign='right'
				>
					{title}
				</Heading>
			</Flex>
			<Box px='12px' py='20px' as={Link} to={`/quiz/${id}`}>
				<Text fontFamily='inter' fontSize='15px'>
					{description}
				</Text>
			</Box>
			<Box
				display='flex'
				mt='auto'
				px='16px'
				alignItems='center'
				justifyContent='center'
				position='relative'
			>
				<LikeButton user={user} quiz={{ likeCount, id, likes }} />
				<CommentButton user={user} quiz={{ commentCount, id, comments }} />
				<Box position='absolute' right='0'>
					{user && user.username === username && <MenuButtons quizId={id} />}
				</Box>
			</Box>
		</PseudoBox>
	);
};

export default Card;
