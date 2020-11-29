import { useQuery } from '@apollo/client';
import {
	Box,
	Container,
	Grid,
	Heading,
	SlideFade,
	Spinner,
	useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Card from '../components/Card';
import { GET_ALL_QUIZZES } from '../utils/graphql';

const Home = () => {
	const { onOpen, isOpen } = useDisclosure();

	const { loading, error, data: { getQuizzes: quizzesData } = {} } = useQuery(
		GET_ALL_QUIZZES
	);

	useEffect(() => {
		onOpen();
	}, [onOpen]);

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
		<Box h='full' w='full'>
			<Container maxW='lg' pb='60px'>
				<SlideFade in={isOpen} offsetY='20px'>
					<Heading
						as='h1'
						fontFamily='inter'
						fontWeight='800'
						color='gray.700'
						fontSize={{ base: '48px', md: '56px' }}
						lineHeight='1'
						textAlign='center'
						py='60px'
					>
						All Featured Quizzes
					</Heading>
					<Grid
						w='full'
						templateColumns='repeat(auto-fit, minmax(320px, 1fr))'
						gap={4}
						justifyItems='center'
					>
						{quizzesData.map((quiz) => {
							return <Card key={quiz.id} quizData={quiz} />;
						})}
					</Grid>
				</SlideFade>
			</Container>
		</Box>
	);
};

export default Home;
