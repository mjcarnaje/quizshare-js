import React, { useState } from 'react';
import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	Icon,
	IconButton,
	Stack,
	Text,
} from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import AccountInfo from '../components/AccountInfo';
import UserInfo from '../components/UserInfo';
import AccountInfoEdit from '../components/AccountInfoEdit';
import UserInfoEdit from '../components/UserInfoEdit';

const MyProfile = () => {
	const { avatar, username, email } = useSelector((state) => state.auth.user);
	const [isEditAccountInfo, setisEditAccountInfo] = useState(false);
	const [isEditUserInfo, setisEditUserInfo] = useState(false);
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
								onClick={() => setisEditUserInfo(!isEditUserInfo)}
							>
								{isEditUserInfo ? 'Cancel' : 'Edit'}
							</Button>
						</Box>
					</Flex>
					<Divider my='0px' />
					{isEditUserInfo ? <UserInfoEdit /> : <UserInfo />}
				</Box>
			</Stack>
		</>
	);
};

export default MyProfile;
