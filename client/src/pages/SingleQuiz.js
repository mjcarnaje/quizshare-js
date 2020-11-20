import React from 'react';
import { useQuery } from '@apollo/client';
import {
	Avatar,
	Text,
	Divider,
	Button,
	Box,
	Spinner,
	IconButton,
	Image,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import LikeButton from '../components/LikeButton';
import CommentButton from '../components/CommentButton';
import CommentBox from '../components/CommentBox';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdLibraryBooks } from 'react-icons/md';
import { GET_QUIZ } from '../utils/graphql';

const SingleQuiz = ({ match: { params }, history }) => {
	const user = useSelector((state) => state.auth.user);
	const quizId = params.id;

	const { loading, error, data: { getQuiz: quizData } = {} } = useQuery(
		GET_QUIZ,
		{
			variables: {
				quizId,
			},
		}
	);
	if (loading)
		return (
			<Spinner
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.200'
				color='purple.500'
				size='xl'
			/>
		);
	if (error) return <p>Error :</p>;
	const {
		id,
		title,
		description,
		likes,
		likeCount,
		comments,
		commentCount,
		questionCount,
		createdAt,
		author: { avatar, username, email },
	} = quizData;
	return (
		<Box h='full' w={{ base: 'full', md: '70%' }} py='10px' px='50px'>
			<Box
				bg='white'
				m='auto'
				p='10px'
				display='flex'
				alignItems='center'
				borderTopLeftRadius='8px'
				borderTopRightRadius='8px'
				borderBottomWidth='1px'
				boxShadow='sm'
			>
				<IconButton
					as={Link}
					to='/home'
					variant='ghost'
					colorScheme='purple'
					aria-label='Back'
					isRound
					fontSize='24px'
					icon={<IoMdArrowRoundBack />}
				/>
				<Text
					ml='20px'
					fontFamily='montserrat'
					fontWeight='800'
					fontSize='22px'
					color='gray.800'
				>
					Quiz
				</Text>
			</Box>
			<Box
				bg='white'
				m='auto'
				borderBottomLeftRadius='8px'
				borderBottomRightRadius='8px'
				px='15px'
				pt='15px'
				pb='8px'
				boxShadow='sm'
			>
				<Box display='flex' w='full'>
					<Avatar name='Dan Abrahmov' src={`${avatar}`} />
					<Box ml='10px'>
						<Text fontFamily='inter' fontSize='17px' fontWeight='semibold'>
							{username}
						</Text>
						<Text
							fontFamily='inter'
							fontSize='14px'
							color='gray.600'
							lineHeight='.7'
						>
							{email}
						</Text>
					</Box>
					<Divider orientation='vertical' mx='20px' />
					<Text
						my='auto'
						fontFamily='inter'
						fontWeight='bold'
						fontSize='24px'
						color='purple.500'
					>
						{title}
					</Text>
				</Box>
				<Text
					fontFamily='inter'
					py='10px'
					fontSize='23px'
					fontWeight='400'
					wordBreak='break-all'
				>
					{description}
				</Text>
				<Text fontFamily='inter' fontSize='14px' color='gray.600' pb='10px'>
					{moment(new Date(parseInt(createdAt)).toISOString()).format(
						' h:mm A · MMM D, YYYY'
					)}
				</Text>
				<Divider />
				<Box display='flex' justifyContent='space-around' py='10px'>
					<Box display='flex'>
						<Text fontFamily='inter' fontWeight='bold' mr='4px'>
							{likeCount}
						</Text>
						<Text fontFamily='inter' color='gray.600'>
							Likes
						</Text>
					</Box>
					<Box display='flex'>
						<Text fontFamily='inter' fontWeight='bold' mr='4px'>
							{commentCount}
						</Text>
						<Text fontFamily='inter' color='gray.600'>
							Comments
						</Text>
					</Box>
					<Box display='flex'>
						<Text fontFamily='inter' fontWeight='bold' mr='4px'>
							{questionCount}
						</Text>
						<Text fontFamily='inter' color='gray.600'>
							Items
						</Text>
					</Box>
				</Box>
				<Divider />
				<Box
					display='grid'
					gridTemplateColumns='repeat(3, auto)'
					justifyItems='center'
					pt='10px'
				>
					<LikeButton user={user} quiz={{ id, likes }} />
					<CommentButton user={user} quiz={{ id, comments }} />
					<Link to={`take/${id}`}>
						<Button
							colorScheme='purple'
							rightIcon={<MdLibraryBooks />}
							variant='ghost'
						>
							Take Quiz
						</Button>
					</Link>
				</Box>
			</Box>
			{comments.map((comment) => (
				<CommentBox key={comment.id} commentData={comment} quizId={id} />
			))}
		</Box>
	);
};

export default SingleQuiz;
