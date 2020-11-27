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
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import ProfileInfo from '../components/ProfileInfo';
import ProfileInfoEdit from '../components/ProfileInfoEdit';
import UserInfo from '../components/UserInfo';
import UserInfoEdit from '../components/UserInfoEdit';
import { GET_PROFILE_INFO, GET_USER } from '../utils/graphql';

const MyProfile = () => {
	const { isOpen, onToggle } = useDisclosure();

	const [profileEdit, setProfileEdit] = useState(false);
	const [userEdit, setUserEdit] = useState(false);

	const { loading: userLoading, data: { currentUser } = {} } = useQuery(
		GET_USER
	);

	useEffect(() => {
		onToggle();
	}, []);

	let userInfo;

	if (userLoading) {
		userInfo = (
			<Flex w='full' justify='center' align='center' h='300px'>
				<Spinner thickness='8px' speed='.7s' color='purple.500' size='70px' />
			</Flex>
		);
	} else {
		userInfo = <UserInfo data={currentUser} />;
	}

	const { loading: profileLoading, data: { getProfileUser } = {} } = useQuery(
		GET_PROFILE_INFO
	);

	let profileInfo;

	if (profileLoading) {
		profileInfo = (
			<Flex w='full' justify='center' align='center' h='300px'>
				<Spinner thickness='8px' speed='.7s' color='purple.500' size='70px' />
			</Flex>
		);
	} else {
		profileInfo = <ProfileInfo isEdit={setProfileEdit} data={getProfileUser} />;
	}

	return (
		<SlideFade in={isOpen} offsetY='20px'>
			<Stack spacing={4}>
				<Box bg='white' borderRadius='8px' boxShadow='sm'>
					<Flex py='16px' px='24px' w='full'>
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
					</Flex>
					<Divider my='0px' />
					{userEdit ? (
						<UserInfoEdit isEdit={setUserEdit} userInfo={currentUser} />
					) : (
						userInfo
					)}
				</Box>
				<Box bg='white' borderRadius='8px' boxShadow='sm'>
					<Flex py='16px' px='24px' w='full'>
						<Text
							fontFamily='inter'
							fontWeight='bold'
							fontSize='18px'
							color='purple.600'
						>
							User Information
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
					</Flex>
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
