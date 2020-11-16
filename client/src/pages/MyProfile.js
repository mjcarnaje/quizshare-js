import React, { useState } from 'react';
import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	Icon,
	IconButton,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import UserInfo from '../components/UserInfo';
import ProfileInfo from '../components/ProfileInfo';
import UserInfoEdit from '../components/UserInfoEdit';
import ProfileInfoEdit from '../components/ProfileInfoEdit';
import { useQuery } from '@apollo/client';
import { GET_PROFILE_INFO, GET_USER } from '../utils/graphql';
import { FiEdit } from 'react-icons/fi';

const MyProfile = () => {
	const [profileEdit, setProfileEdit] = useState(false);
	const [userEdit, setUserEdit] = useState(false);

	const { loading: userLoading, data: { currentUser } = {} } = useQuery(
		GET_USER
	);

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
		<>
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
		</>
	);
};

export default MyProfile;
