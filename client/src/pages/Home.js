import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Card from '../components/Card';
import { Box, Spinner } from '@chakra-ui/core';

const GET_ALL_QUIZZES = gql`
	query {
		getQuizzes {
			id
			title
			description
			createdAt
			likeCount
			author {
				avatar
				username
			}
		}
	}
`;

const Home = () => {
	const { loading, error, data } = useQuery(GET_ALL_QUIZZES);
	if (loading)
		return (
			<Spinner
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.200'
				color='blue.500'
				size='xl'
			/>
		);
	if (error) return <p>Error :</p>;
	return (
		<>
			<Box display='flex' flexWrap='wrap'>
				{data.getQuizzes.map((quiz) => (
					<Card
						createdAt={quiz.createdAt}
						avatar={quiz.author.avatar}
						username={quiz.author.username}
						title={quiz.title}
						description={quiz.description}
						likeCount={quiz.likeCount}
					/>
				))}
			</Box>
		</>
	);
};

export default Home;
