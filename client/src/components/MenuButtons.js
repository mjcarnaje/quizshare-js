import React from 'react';
import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button,
	Icon,
	Text,
	Box,
} from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import { GET_ALL_QUIZZES } from '../utils/graphql';
import { BsThreeDots } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';

const DELETE_COMMENT = gql`
	mutation deleteComment($quizId: String!, $commentId: String!) {
		deleteComment(quizId: $quizId, commentId: $commentId) {
			id
			comments {
				id
				createdAt
				body
				author {
					username
					avatar
					email
				}
			}
			commentCount
		}
	}
`;

const DELETE_QUIZ = gql`
	mutation deleteQuiz($quizId: String!) {
		deleteQuiz(quizId: $quizId)
	}
`;

const MenuButtons = ({ deleteOnly, quizId, commentId }) => {
	const mutation = commentId ? DELETE_COMMENT : DELETE_QUIZ;
	const [delQuizorComment] = useMutation(mutation, {
		update(cache) {
			if (!commentId) {
				let data = cache.readQuery({
					query: GET_ALL_QUIZZES,
				});
				cache.writeQuery({
					query: GET_ALL_QUIZZES,
					data: { getQuizzes: data.getQuizzes.filter((q) => q.id !== quizId) },
				});
			}
		},
		onError(err) {
			console.log(err.graphQLErrors[0]);
		},
		variables: {
			quizId,
			commentId,
		},
	});

	return (
		<Menu>
			{({ isOpen }) => (
				<>
					<MenuButton
						isActive={isOpen}
						as={Button}
						bg='transparent'
						size='sm'
						h='32px'
						w='32px'
						borderRadius='200px'
						_focus={{ outline: 'none' }}
					>
						<BsThreeDots />
					</MenuButton>
					<MenuList minWidth='140px'>
						{!deleteOnly && (
							<MenuItem>
								<FiEdit color='#805AD5' />
								<Text ml='5px' fontFamily='inter'>
									Edit
								</Text>
							</MenuItem>
						)}
						<MenuItem as='button' onClick={delQuizorComment}>
							<MdDelete color='#805AD5' />
							<Text ml='5px' fontFamily='inter'>
								Delete
							</Text>
						</MenuItem>
					</MenuList>
				</>
			)}
		</Menu>
	);
};

export default MenuButtons;
