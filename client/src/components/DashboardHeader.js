import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Avatar,
	Box,
	Button,
	Spinner,
	Text,
	useToast,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { GET_USER } from '../utils/graphql';

const DELETE_USER = gql`
	mutation deleteUserData {
		deleteUserData
	}
`;

const DashboardHeader = () => {
	const cache = useApolloClient();
	const toast = useToast();
	const dispatch = useDispatch();

	const [isOpen, setIsOpen] = useState();
	const onClose = () => setIsOpen(false);
	const cancelRef = useRef();
	const btnRef = useRef();

	const { loading: currentUserLoading, data: { currentUser } = {} } = useQuery(
		GET_USER
	);

	const [deleteUser, { loading }] = useMutation(DELETE_USER, {
		update() {
			cache.clearStore();
			dispatch(logoutUser());
			setIsOpen(false);

			toast({
				title: 'Account deleted.',
				description:
					"We've deleted all your data for you. Thank you for using this personal website",
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		},
		onError(err) {
			console.log(err.graphQLErrors[0]);
		},
	});

	if (currentUserLoading) {
		return (
			<Box w='full' textAlign='center'>
				<Spinner thickness='2px' speed='.7s' color='purple.500' size='30px' />
			</Box>
		);
	}
	const { username, avatar, email } = currentUser;
	return (
		<Box
			m='auto'
			display='flex'
			alignItems='center'
			justifyContent='space-between'
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
						leftIcon={<MdDeleteForever />}
						colorScheme='red'
						onClick={() => setIsOpen(true)}
						size='sm'
					>
						Delete Account
					</Button>

					<AlertDialog
						leastDestructiveRef={cancelRef}
						finalFocusRef={btnRef}
						onClose={onClose}
						isCentered
					>
						<AlertDialogOverlay />
						<AlertDialogContent borderRadius='8px'>
							<AlertDialogHeader
								fontSize='lg'
								fontWeight='bold'
								fontFamily='inter'
							>
								Delete Account
							</AlertDialogHeader>

							<AlertDialogBody fontFamily='inter'>
								All your data will be deleted. Are you sure? You can't undo this
								action afterwards.
							</AlertDialogBody>

							<AlertDialogFooter>
								<Button ref={cancelRef} onClick={onClose} fontFamily='inter'>
									Cancel
								</Button>
								<Button
									colorScheme='red'
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
				</Box>
			</Box>
		</Box>
	);
};

export default DashboardHeader;
