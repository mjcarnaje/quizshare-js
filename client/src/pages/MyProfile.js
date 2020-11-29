import { useQuery } from '@apollo/client';
import {
	Box,
	Button,
	Divider,
	Flex,
	Spinner,
	Stack,
	Text,
	useDisclosure,
	SlideFade,
	Center,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import ProfileInfo from '../components/ProfileInfo';
import ProfileInfoEdit from '../components/ProfileInfoEdit';
import UserInfo from '../components/UserInfo';
import UserInfoEdit from '../components/UserInfoEdit';
import { GET_PROFILE_INFO, GET_USER } from '../utils/graphql';

const MyProfile = () => {
	const { isOpen, onOpen } = useDisclosure();

	const [profileEdit, setProfileEdit] = useState(false);
	const [userEdit, setUserEdit] = useState(false);

	const { loading: userLoading, data: { currentUser } = {} } = useQuery(
		GET_USER
	);

	useEffect(() => {
		onOpen();
	}, [onOpen]);

	let userInfo;

	if (userLoading) {
		userInfo = (
			<Flex w='full' justify='center' align='center' h='300px'>
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='purple.500'
					size='xl'
				/>
			</Flex>
		);
	} else {
		userInfo = <UserInfo isEdit={setUserEdit} data={currentUser} />;
	}

	const { loading: profileLoading, data: { getProfileUser } = {} } = useQuery(
		GET_PROFILE_INFO
	);

	let profileInfo;

	if (profileLoading) {
		profileInfo = (
			<Flex w='full' justify='center' align='center' h='300px'>
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='purple.500'
					size='xl'
				/>
			</Flex>
		);
	} else {
		profileInfo = <ProfileInfo isEdit={setProfileEdit} data={getProfileUser} />;
	}

	return (
		<SlideFade in={isOpen} offsetY='20px'>
			<Stack spacing={4}>
				<Box bg='white' borderRadius='8px' boxShadow='sm'>
					<Center py='16px' px='24px' w='full'>
						<Text
							fontFamily='inter'
							fontWeight='bold'
							fontSize='18px'
							color='purple.600'
						>
							Account
						</Text>
						<Box ml='auto'>
							<Button
								rightIcon={!profileEdit ? <FiEdit /> : ''}
								colorScheme='purple'
								variant='ghost'
								onClick={() => setUserEdit(!userEdit)}
							>
								{userEdit ? 'Cancel' : 'Edit'}
							</Button>
						</Box>
					</Center>
					<Divider my='0px' />
					{userEdit ? (
						<UserInfoEdit isEdit={setUserEdit} userInfo={currentUser} />
					) : (
						userInfo
					)}
				</Box>
				<Box bg='white' borderRadius='8px' boxShadow='sm'>
					<Center py='16px' px='24px' w='full'>
						<Text
							fontFamily='inter'
							fontWeight='bold'
							fontSize='18px'
							color='purple.600'
						>
							Profile
						</Text>
						<Box ml='auto'>
							<Button
								rightIcon={!profileEdit ? <FiEdit /> : ''}
								colorScheme='purple'
								variant='ghost'
								onClick={() => setProfileEdit(!profileEdit)}
							>
								{profileEdit ? 'Cancel' : 'Edit'}
							</Button>
						</Box>
					</Center>
					<Divider my='0px' />
					{profileEdit ? (
						<ProfileInfoEdit
							profileData={getProfileUser}
							isEdit={setProfileEdit}
						/>
					) : (
						profileInfo
					)}
				</Box>
			</Stack>
		</SlideFade>
	);
};

export default MyProfile;
