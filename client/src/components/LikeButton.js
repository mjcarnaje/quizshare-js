import React, { useState, useEffect } from 'react';
import { PseudoBox, Icon, Text } from '@chakra-ui/core';
import { useMutation, gql } from '@apollo/client';

const LIKE_QUIZ_MUTATION = gql`
	mutation toggleLikeQuiz($quizId: String!) {
		toggleLikeQuiz(quizId: $quizId) {
			id
			likes {
				id
				username
			}
			likeCount
		}
	}
`;

const LikeButton = ({ quiz: { likes, id, likeCount }, user }) => {
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		if (user && likes.find((like) => like.username === user.username)) {
			setIsLiked(true);
		} else {
			setIsLiked(false);
		}
	}, [user, likes]);

	const [toggleLikeQuiz] = useMutation(LIKE_QUIZ_MUTATION, {
		onError(err) {
			return err;
		},
		variables: { quizId: id },
	});

	return (
		<>
			<PseudoBox
				as='button'
				role='group'
				display='flex'
				alignItems='center'
				marginX='16px'
				color={isLiked ? 'red.500' : 'gray.500'}
				onClick={toggleLikeQuiz}
				_hover={{ color: 'red.500' }}
				_focus={{ outline: 'none' }}
			>
				<PseudoBox
					as='div'
					_groupHover={{ bg: 'red.100' }}
					display='flex'
					alignItems='center'
					justifyContent='center'
					h={8}
					w={8}
					borderRadius={50}
				>
					<Icon
						name={isLiked ? 'heart-solid' : 'heart-outline'}
						size='18px'
						_groupHover={{ color: 'inherit' }}
					/>
				</PseudoBox>
				{likeCount && (
					<Text fontFamily='inter' color='inherit' marginLeft='8px'>
						{likeCount}
					</Text>
				)}
			</PseudoBox>
		</>
	);
};

export default LikeButton;
