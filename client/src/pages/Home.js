import { useQuery } from '@apollo/client';
import {
	Container,
	Divider,
	Grid,
	Heading,
	Spinner,
	useDisclosure,
	ScaleFade,
	SlideFade,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Card from '../components/Card';
import { GET_ALL_QUIZZES } from '../utils/graphql';

const Home = () => {
	const { onToggle, isOpen } = useDisclosure();

	const { loading, error, data: { getQuizzes: quizzesData } = {} } = useQuery(
		GET_ALL_QUIZZES
	);

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
		<Container maxW='lg' py='50px'>
			<SlideFade in={isOpen} offsetY='20px'>
				<Heading
					as='h1'
					fontFamily='inter'
					fontWeight='800'
					color='gray.700'
					fontSize='56px'
					textAlign='center'
				>
					All quizzes
				</Heading>
				<Grid
					h='auto'
					w='full'
					mt={10}
					templateColumns='repeat(3, 1fr)'
					gap={4}
				>
					{quizzesData.map((quiz) => {
						return <Card key={quiz.id} quizData={quiz} />;
					})}
				</Grid>
			</SlideFade>
		</Container>
	);
};

export default Home;
