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

export const GET_USER_QUIZZES = gql`
	query {
		getUserQuizzes {
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
