import {
	AspectRatio,
	Avatar,
	Box,
	Flex,
	Heading,
	Image,
	Spacer,
	Tag,
	Text,
} from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentButton from './CommentButton';
import LikeButton from './LikeButton';
import MenuButtons from './MenuButtons';

const Card = ({
	quizData: {
		id,
		title,
		description,
		image,
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
		<Box maxWidth='420px' w='full'>
			<Flex
				direction='column'
				h='full'
				rounded='8px'
				boxShadow='sm'
				bg='white'
				p='8px'
				cursor='pointer'
				_hover={{ bg: 'gray.50' }}
			>
				{image && (
					<AspectRatio maxW='420px' ratio={16 / 9}>
						<Image
							src={image}
							objectFit='cover'
							loading='lazy'
							borderRadius='8px'
							pb='10px'
						/>
					</AspectRatio>
				)}
				<Flex
					align='center'
					justify='space-between'
					as={Link}
					to={`/quiz/${id}`}
				>
					<Box display='flex' alignItems='center'>
						<Avatar name='Michael James' src={avatar} />
						<Box marginLeft='8px'>
							<Heading
								as='h2'
								fontSize='12px'
								fontFamily='inter'
								lineHeight='1.6'
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
						fontFamily='inter'
						color='gray.700'
						fontSize='17px'
						px='4px'
						wordBreak='break-word'
						textAlign='right'
						lineHeight={1.2}
						ml='10px'
					>
						{title.length > 40 ? `${title.slice(0, 40)}...` : title}
					</Heading>
				</Flex>

				<Box px='12px' pt='20px' as={Link} to={`/quiz/${id}`}>
					<Text fontFamily='inter' fontSize='15px' wordBreak='break-all'>
						{description.length > 70
							? `${description.slice(0, 75)}...`
							: description}
					</Text>
				</Box>
				<Spacer />
				<Box
					display='flex'
					px='16px'
					alignItems='center'
					justifyContent='center'
					position='relative'
				>
					<LikeButton user={user} quiz={{ likeCount, id, likes }} />
					<CommentButton user={user} quiz={{ commentCount, id, comments }} />
					<Box position='absolute' right='0'>
						{user?.username === username && <MenuButtons quizId={id} />}
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};

export default Card;
