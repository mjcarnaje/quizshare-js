import { useQuery } from '@apollo/client';
import { Container, Divider, Grid, Heading, Spinner } from '@chakra-ui/react';
import React from 'react';
import Card from '../components/Card';
import { GET_ALL_QUIZZES } from '../utils/graphql';

const Home = () => {
	const { loading, error, data: { getQuizzes: quizzesData } = {} } = useQuery(
		GET_ALL_QUIZZES
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

	if (error) return <p>Error</p>;

	return (
		<Container maxW='lg'>
			<Heading
				as='h1'
				py='1rem'
				fontSize='3rem'
				letterSpacing='3px'
				textAlign='center'
				fontFamily='inter'
				fontWeight='bold'
				color='gray.700'
				textTransform='uppercase'
			>
				All Quizzes
			</Heading>
			<Divider borderColor='purple.400' w='25%' m='auto' />
			<Grid h='auto' w='full' mt={5} templateColumns='repeat(3, 1fr)' gap={4}>
				{quizzesData.map((quiz) => {
					return <Card key={quiz.id} quizData={quiz} />;
				})}
			</Grid>
		</Container>
	);
};

export default Home;
