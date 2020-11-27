import { useQuery } from '@apollo/client';
import { Box, Grid, Spinner, SlideFade, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Card from '../components/Card';
import { GET_USER_QUIZZES } from '../utils/graphql';

const MyQuizzes = () => {
	const { isOpen, onToggle } = useDisclosure();

	const {
		loading,
		error,
		data: { getUserQuizzes: quizzesData } = {},
	} = useQuery(GET_USER_QUIZZES);

	useEffect(() => {
		onToggle();
	}, []);

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

	if (error) return <p>Error</p>;

	return (
		<SlideFade in={isOpen} offsetY='20px'>
			<Grid h='auto' w='full' templateColumns='repeat(2, 1fr)' gap={6}>
				{quizzesData.map((quiz) => {
					return <Card key={quiz.id} quizData={quiz} />;
				})}
			</Grid>
		</SlideFade>
	);
};

export default MyQuizzes;
