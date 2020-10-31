import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ALL_QUIZZES = gql`
	query {
		getQuizzes {
			id
			title
		}
	}
`;

const Home = () => {
	const { loading, error, data } = useQuery(GET_ALL_QUIZZES);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :</p>;
	return (
		<>
			{data.getQuizzes.map((quiz) => (
				<div>{quiz.title}</div>
			))}
		</>
	);
};

export default Home;
