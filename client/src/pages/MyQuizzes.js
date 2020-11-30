import { useQuery } from '@apollo/client';
import {
	Box,
	Button,
	Center,
	Grid,
	Image,
	SlideFade,
	Spinner,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import empty from '../assets/svg/empty.svg';
import Card from '../components/Card';
import { GET_USER_QUIZZES } from '../utils/graphql';
import { trackWindowScroll } from 'react-lazy-load-image-component';

const MyQuizzes = ({ scrollPosition }) => {
	const { isOpen, onOpen } = useDisclosure();

	const {
		loading,
		error,
		data: { getUserQuizzes: quizzesData } = {},
	} = useQuery(GET_USER_QUIZZES);

	useEffect(() => {
		onOpen();
	}, [onOpen]);

	if (loading)
		return (
			<Center w='full' h='full'>
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='purple.500'
					size='xl'
				/>
			</Center>
		);

	if (error) return <p>Error</p>;

	return (
		<SlideFade in={isOpen} offsetY='20px'>
			<Grid
				w='full'
				templateColumns='repeat(auto-fit, minmax(320px, 1fr))'
				gap={4}
				justifyItems='center'
			>
				{quizzesData.map((quiz) => {
					return (
						<Card
							key={quiz.id}
							quizData={quiz}
							scrollPosition={scrollPosition}
						/>
					);
				})}
			</Grid>
			{quizzesData.length === 0 && (
				<Center w='full' h='full' py='50px' flexDirection='column'>
					<Box h='240px' mb='10px'>
						<Image src={empty} h='full' objectFit='cover' />
					</Box>

					<Text
						fontFamily='inter'
						fontWeight='800'
						fontSize='48px'
						color='gray.700'
					>
						No Quiz Data
					</Text>
					<Button
						as={Link}
						variant='ghost'
						mt='5px'
						colorScheme='purple'
						to='/create-quiz'
					>
						Create Now
					</Button>
				</Center>
			)}
		</SlideFade>
	);
};

export default trackWindowScroll(MyQuizzes);
