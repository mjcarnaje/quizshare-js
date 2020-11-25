import { useQuery } from '@apollo/client';
import { Box, Grid, Spinner } from '@chakra-ui/react';
import React from 'react';
import Card from '../components/Card';
import { GET_USER_QUIZZES } from '../utils/graphql';

const MyQuizzes = () => {
	const {
		loading,
		error,
		data: { getUserQuizzes: quizzesData } = {},
	} = useQuery(GET_USER_QUIZZES);
	if (loading)
		return (
			<Spinner thickness='8px' speed='.7s' color='purple.500' size='70px' />
		);
	if (error) return <p>Error :</p>;

	return (
		<Box>
			<Grid h='auto' w='full' templateColumns='repeat(2, 1fr)' gap={6}>
				{quizzesData.map((quiz) => {
					return <Card key={quiz.id} quizData={quiz} />;
				})}
			</Grid>
		</Box>
	);
};

export default MyQuizzes;
