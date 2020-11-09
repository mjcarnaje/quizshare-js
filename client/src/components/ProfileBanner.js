import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Avatar,
	Box,
	Text,
	Button,
	Scale,
	AlertDialogCloseButton,
	useToast,
} from '@chakra-ui/core';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import { logoutUser } from '../store/authSlice';

const DELETE_USER = gql`
	mutation deleteUserData {
		deleteUserData
	}
`;

const ProfileBanner = () => {
	const cache = useApolloClient();
	const toast = useToast();
	const dispatch = useDispatch();
	const { avatar, username, email } = useSelector((state) => state.auth.user);
	const [isOpen, setIsOpen] = useState();
	const onClose = () => setIsOpen(false);
	const cancelRef = useRef();
	const btnRef = useRef();

	const [deleteUser, { loading }] = useMutation(DELETE_USER, {
		update() {
			toast({
				title: 'Account deleted.',
				description:
					"We've deleted all your data for you. Thank you for using this personal website",
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			cache.clearStore();
			dispatch(logoutUser());
			<Redirect to='/login' />;
		},
		onError(err) {
			console.log(err.graphQLErrors[0]);
		},
	});

	return (
		<Box
			w='95%'
			m='auto'
			display='flex'
			alignItems='center'
			justifyContent='space-between'
			py='24px'
			px='10px'
		>
			<Box display='flex' alignItems='center' w='full'>
				<Avatar name={username && username} src={avatar && avatar} />
				<Box ml='15px'>
					<Text
						fontFamily='inter'
						fontWeight='bold'
						fontSize='20px'
						color='blue.900'
					>
						{username && username}
					</Text>
					<Text
						fontFamily='inter'
						fontSize='14px'
						fontWeight='300'
						color='gray.700'
						lineHeight='1'
					>
						{email && email}
					</Text>
				</Box>
				<Box ml='auto'>
					<Button
						leftIcon='delete'
						variantColor='red'
						onClick={() => setIsOpen(true)}
						size='sm'
					>
						Delete Account
					</Button>

					<Scale in={isOpen}>
						{(styles) => (
							<AlertDialog
								leastDestructiveRef={cancelRef}
								finalFocusRef={btnRef}
								onClose={onClose}
								isOpen={true}
								isCentered
							>
								<AlertDialogOverlay opacity={styles.opacity} />
								<AlertDialogContent {...styles} borderRadius='8px'>
									<AlertDialogHeader
										fontSize='lg'
										fontWeight='bold'
										fontFamily='inter'
									>
										Delete Account
									</AlertDialogHeader>

									<AlertDialogBody fontFamily='inter'>
										All your data will be deleted. Are you sure? You can't undo
										this action afterwards.
									</AlertDialogBody>

									<AlertDialogFooter>
										<Button
											ref={cancelRef}
											onClick={onClose}
											fontFamily='inter'
										>
											Cancel
										</Button>
										<Button
											variantColor='red'
											onClick={deleteUser}
											ml={3}
											fontFamily='inter'
											loadingText='Deleting data...'
											isLoading={loading ? true : false}
										>
											Delete
										</Button>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						)}
					</Scale>
				</Box>
			</Box>
		</Box>
	);
};

export default ProfileBanner;
