import {
	AspectRatio,
	Avatar,
	Box,
	Center,
	Flex,
	Heading,
	Spacer,
	Text,
} from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
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
	scrollPosition,
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
				<AspectRatio maxW='420px' ratio={16 / 9}>
					{image ? (
						<Box as={Link} to={`/quiz/${id}`} borderRadius='8px' pb='10px'>
							<LazyLoadImage
								effect='blur'
								src={image}
								objectfit='cover'
								scrollPosition={scrollPosition}
							/>
						</Box>
					) : (
						<Center w='full' borderRadius='8px' pb='10px'>
							<Center bg='gray.100' w='full' h='full'>
								<Text
									fontFamily='inter'
									fontWeight='800'
									fontSize='18px'
									color='gray.700'
								>
									No quiz photo included.
								</Text>
							</Center>
						</Center>
					)}
				</AspectRatio>

				<Flex
					align='center'
					justify='space-between'
					as={Link}
					to={`/quiz/${id}`}
				>
					<Box display='flex' alignItems='center'>
						<Avatar name={username || 'username'} src={avatar} />
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
					<Text
						fontFamily='inter'
						color='gray.700'
						fontSize='15px'
						wordBreak='break-all'
					>
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
