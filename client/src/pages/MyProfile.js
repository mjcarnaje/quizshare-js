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
} from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import AccountInfo from '../components/AccountInfo';
import UserInfo from '../components/UserInfo';
import AccountInfoEdit from '../components/AccountInfoEdit';
import UserInfoEdit from '../components/UserInfoEdit';
import { useQuery } from '@apollo/client';
import { GET_PROFILE_INFO } from '../utils/graphql';

const MyProfile = () => {
	const { avatar, username, email } = useSelector((state) => state.auth.user);
	const [isEditAccountInfo, setisEditAccountInfo] = useState(false);
	const [isEditUserInfo, setIsEditUserInfo] = useState(false);

	const { loading, error, data: { getProfileUser } = {} } = useQuery(
		GET_PROFILE_INFO
	);

	if (loading)
		return (
			<Spinner thickness='8px' speed='.7s' color='purple.500' size='70px' />
		);
	if (error) return <p>Error :</p>;

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
								rightIcon={!isEditAccountInfo ? 'edit' : ''}
								variantColor='purple'
								variant='ghost'
								onClick={() => setisEditAccountInfo(!isEditAccountInfo)}
							>
								{isEditAccountInfo ? 'Cancel' : 'Edit'}
							</Button>
						</Box>
					</Flex>
					<Divider my='0px' />
					{isEditAccountInfo ? (
						<AccountInfoEdit
							setisEditAccountInfo={setisEditAccountInfo}
							userInfo={{ avatar, username, email }}
						/>
					) : (
						<AccountInfo userInfo={{ avatar, username, email }} />
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
								rightIcon={!isEditUserInfo ? 'edit' : ''}
								variantColor='purple'
								variant='ghost'
								onClick={() => setIsEditUserInfo(!isEditUserInfo)}
							>
								{isEditUserInfo ? 'Cancel' : 'Edit'}
							</Button>
						</Box>
					</Flex>
					<Divider my='0px' />
					{isEditUserInfo ? (
						<UserInfoEdit
							setIsEditUserInfo={setIsEditUserInfo}
							profileData={getProfileUser}
						/>
					) : (
						<UserInfo
							setIsEditUserInfo={setIsEditUserInfo}
							profileData={getProfileUser}
						/>
					)}
				</Box>
			</Stack>
		</>
	);
};

export default MyProfile;
