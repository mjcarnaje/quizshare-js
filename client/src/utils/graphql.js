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

export const GET_USER = gql`
	query {
		currentUser {
			id
			email
			username
			avatar
			createdAt
		}
	}
`;

export const GET_PROFILE_INFO = gql`
	query {
		getProfileUser {
			id
			user
			firstName
			lastName
			birthday
			country
			social {
				facebook
				twitter
				instagram
				youtube
			}
		}
	}
`;

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			email
			token
			username
			avatar
			createdAt
		}
	}
`;

export const REGISTER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export const UPDATE_PROFILE_INFO = gql`
	mutation createAndUpdateProfile(
		$firstName: String
		$lastName: String
		$birthday: String
		$country: String
		$facebook: String
		$twitter: String
		$instagram: String
		$youtube: String
	) {
		createAndUpdateProfile(
			profileInput: {
				firstName: $firstName
				lastName: $lastName
				birthday: $birthday
				country: $country
				facebook: $facebook
				twitter: $twitter
				instagram: $instagram
				youtube: $youtube
			}
		) {
			id
			user
			firstName
			lastName
			birthday
			country
			social {
				facebook
				twitter
				instagram
				youtube
			}
		}
	}
`;
