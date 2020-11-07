import React, { useRef, useState } from 'react';
import {
	PseudoBox,
	Icon,
	Text,
	SlideIn,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	useDisclosure,
	Divider,
	Avatar,
	Textarea,
	Button,
	Box,
} from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { gql, useMutation } from '@apollo/client';

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

	return (
		<>
			<PseudoBox
				as='button'
				role='group'
				display='flex'
				alignItems='center'
				marginX='16px'
				color='gray.500'
				_hover={{ color: 'blue.500' }}
				_focus={{ outline: 'none' }}
				onClick={onOpen}
			>
				<PseudoBox
					as='div'
					_groupHover={{ bg: 'blue.100' }}
					display='flex'
					alignItems='center'
					justifyContent='center'
					h={8}
					w={8}
					borderRadius={50}
				>
					<Icon name='comment' size='18px' _groupHover={{ color: 'inherit' }} />
				</PseudoBox>
				{commentCount && (
					<Text fontFamily='inter' color='inherit' marginLeft='8px'>
						{commentCount}
					</Text>
				)}
			</PseudoBox>
			<SlideIn in={isOpen}>
				{(styles) => (
					<Modal
						onClose={() => {
							onClose();
							setBody('');
						}}
						isOpen={true}
						size='lg'
						initialFocusRef={initialRef}
					>
						<ModalOverlay opacity={styles.opacity} />
						<ModalContent pb={5} {...styles} borderRadius='8px'>
							<ModalHeader></ModalHeader>
							<ModalCloseButton />
							<Divider mt='15px' />
							<ModalBody display='flex' my='10px'>
								<Avatar
									name='Kent Dodds'
									src={userInfo.avatar && userInfo.avatar}
								/>
								<Textarea
									ref={initialRef}
									ml='10px'
									placeholder='Comment your reply'
									fontFamily='inter'
									fontSize='18px'
									minH='125px'
									resize='none'
									variant='unstyled'
									value={body}
									onChange={(e) => setBody(e.target.value)}
								/>
							</ModalBody>
							<Box textAlign='right' px='24px'>
								<Button
									variantColor='purple'
									borderRadius='50px'
									px='20px'
									isDisabled={body.trim() === ''}
									onClick={onSubmit}
								>
									Reply
								</Button>
							</Box>
						</ModalContent>
					</Modal>
				)}
			</SlideIn>
		</>
	);
};

export default CommentButton;
