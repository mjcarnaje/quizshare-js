import { useQuery } from '@chakra-ui/react';

const { gql } = require('@apollo/client');

const GET_ALL_QUIZZES = gql`
	query {
		getQuizzes {
			id
			title
			description
			image
			createdAt
			likeCount
			likes {
				id
				username
			}
			commentCount
			comments {
				id
				body
				createdAt
				author {
					id
					username
					avatar
				}
			}
			author {
				avatar
				username
			}
		}
	}
`;

export default () => {
	return useQuery(GET_ALL_QUIZZES);
};
