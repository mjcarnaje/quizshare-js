import { gql, useMutation } from '@apollo/client';
import {
	Avatar,
	Box,
	Button,
	FormControl,
	Icon,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	Textarea,
	useDisclosure,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

const COMMENT_MUTATION = gql`
	mutation($quizId: String!, $body: String!) {
		createComment(quizId: $quizId, body: $body) {
			id
			comments {
				id
				body
				author {
					id
					username
					avatar
					email
				}
			}
			commentCount
		}
	}
`;

const CommentButton = ({ user, quiz: { commentCount, comments, id } }) => {
	const userInfo = useSelector((state) => state.auth.user);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef();
	const history = useHistory();
	const [body, setBody] = useState('');

	const [submitComment] = useMutation(COMMENT_MUTATION, {
		update() {
			setBody('');
			onClose();
		},
		onError(err) {
			return err;
		},
		variables: {
			quizId: id,
			body,
		},
	});

	const onSubmit = () => {
		submitComment();
	};

	const commentOnQuiz = () => {
		if (!userInfo) {
			history.push('/login');
			return;
		}
		onOpen();
	};

	return (
		<>
			<Box
				role='group'
				display='flex'
				alignItems='center'
				marginX='16px'
				color='gray.500'
				_hover={{ color: 'blue.500' }}
				_focus={{ outline: 'none' }}
				onClick={commentOnQuiz}
			>
				<IconButton
					variant='outline'
					colorScheme='gray'
					aria-label='Like post'
					isRound
					_focus={{ outline: 'none' }}
					border='none'
					_groupHover={{ bg: 'blue.100', color: 'blue.500' }}
					fontSize='18px'
					icon={
						<Icon viewBox='0 0 28 28' color='inherit' boxSize='20px'>
							<path
								fill='currentColor'
								d='M14 6c-6.5 0-12 3.656-12 8 0 2.328 1.563 4.547 4.266 6.078l1.359 0.781-0.422 1.5c-0.297 1.109-0.688 1.969-1.094 2.688 1.578-0.656 3.016-1.547 4.297-2.672l0.672-0.594 0.891 0.094c0.672 0.078 1.359 0.125 2.031 0.125 6.5 0 12-3.656 12-8s-5.5-8-12-8zM28 14c0 5.531-6.266 10-14 10-0.766 0-1.531-0.047-2.266-0.125-2.047 1.813-4.484 3.094-7.187 3.781-0.562 0.156-1.172 0.266-1.781 0.344h-0.078c-0.313 0-0.594-0.25-0.672-0.594v-0.016c-0.078-0.391 0.187-0.625 0.422-0.906 0.984-1.109 2.109-2.047 2.844-4.656-3.219-1.828-5.281-4.656-5.281-7.828 0-5.531 6.266-10 14-10v0c7.734 0 14 4.469 14 10z'
							/>
						</Icon>
					}
				/>
				{commentCount && (
					<Text fontFamily='inter' color='inherit' marginLeft='8px'>
						{commentCount}
					</Text>
				)}
			</Box>

			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader></ModalHeader>
					<ModalCloseButton />
					<ModalBody display='flex'>
						<Avatar name={userInfo?.username} src={userInfo?.avatar} />
						<FormControl>
							<Textarea
								ref={initialRef}
								placeholder='Comment your reply'
								type='text'
								bg='none'
								variant='filled'
								resize='none'
								value={body}
								onChange={(e) => setBody(e.target.value)}
								_focus={{ outline: 'none', bg: 'none' }}
								_hover={{ bg: 'none' }}
								fontFamily='inter'
								overflow='hidden'
								as={TextareaAutosize}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='purple'
							borderRadius={50}
							px='30px'
							isDisabled={body.trim() === ''}
							onClick={onSubmit}
						>
							Reply
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CommentButton;
