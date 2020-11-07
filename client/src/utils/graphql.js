import { gql } from '@apollo/client';

export const GET_ALL_QUIZZES = gql`
	query {
		getQuizzes {
			id
			title
			description
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
