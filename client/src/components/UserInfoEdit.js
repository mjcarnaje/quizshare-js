import React, { useEffect, useState } from 'react';
import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Icon,
	Input,
	Select,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import { GET_PROFILE_INFO } from '../utils/graphql';
import { Redirect } from 'react-router-dom';

const UPDATE_PROFILE_INFO = gql`
	mutation createAndUpdateProfile(
		$firstName: String
		$lastName: String
		$birthday: String
		$country: String
		$facebook: String
		$twitter: String
		$instagram: String
		$youtube: String
	) {
		createAndUpdateProfile(
			profileInput: {
				firstName: $firstName
				lastName: $lastName
				birthday: $birthday
				country: $country
				facebook: $facebook
				twitter: $twitter
				instagram: $instagram
				youtube: $youtube
			}
		) {
			id
			user
			firstName
			lastName
			birthday
			country
			social {
				facebook
				twitter
				instagram
				youtube
			}
		}
	}
`;

const UserInfoEdit = ({ profileData, setIsEditUserInfo }) => {
	const { avatar, username, email } = useSelector((state) => state.auth.user);
	const toast = useToast();
	const dispatch = useDispatch();

	const [values, setValues] = useState({
		firstName: '',
		lastName: '',
		birthday: '',
		country: '',
		facebook: '',
		twitter: '',
		instagram: '',
		youtube: '',
	});

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const [updateUser, { loading }] = useMutation(UPDATE_PROFILE_INFO, {
		update(cache, { data: { createAndUpdateProfile: profile } }) {
			const data = cache.readQuery({
				query: GET_PROFILE_INFO,
			});
			cache.writeQuery({
				query: GET_PROFILE_INFO,
				data: data,
			});
			toast({
				title: 'Profile Updated',
				description: 'Your profile information is now updated',
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'bottom-left',
			});
			setIsEditUserInfo(false);
		},
		onError(err) {
			console.log(err.graphQLErrors[0].extensions.errors);
		},
		variables: values,
	});

	const onSubmit = (e) => {
		e.preventDefault();
		updateUser();
	};

	useEffect(() => {
		if (profileData) {
			const profileInputs = { ...values };

			for (const i in profileData) {
				if (i in profileInputs) profileInputs[i] = profileData[i];
			}

			for (const i in profileData.social) {
				if (i in profileInputs) profileInputs[i] = profileData.social[i];
			}

			setValues(profileInputs);
		}
	}, [profileData]);

	const {
		firstName,
		lastName,
		birthday,
		country,
		facebook,
		twitter,
		instagram,
		youtube,
	} = values;
	return (
		<>
			<Box py='16px' px='32px'>
				<Flex w='60%'>
					<FormControl py='8px' mr='1'>
						<FormLabel
							htmlFor='firstName'
							fontFamily='inter'
							fontWeight='semibold'
							color='purple.600'
							fontSize='14px'
						>
							First name
						</FormLabel>
						<Input
							type='text'
							name='firstName'
							size='lg'
							fontFamily='inter'
							fontWeight='400'
							bg='gray.50'
							focusBorderColor='purple.500'
							placeholder='Enter first name'
							onChange={onChange}
							value={firstName || ''}
						/>
					</FormControl>
					<FormControl py='8px' ml='1'>
						<FormLabel
							htmlFor='lastName'
							fontFamily='inter'
							fontWeight='semibold'
							color='purple.600'
							fontSize='14px'
						>
							Last name
						</FormLabel>
						<Input
							type='text'
							name='lastName'
							size='lg'
							fontFamily='inter'
							fontWeight='400'
							bg='gray.50'
							focusBorderColor='purple.500'
							placeholder='Enter last Name'
							onChange={onChange}
							value={lastName || ''}
						/>
					</FormControl>
				</Flex>
				<FormControl py='8px'>
					<FormLabel
						htmlFor='birthday'
						fontFamily='inter'
						fontWeight='semibold'
						color='purple.600'
						fontSize='14px'
					>
						Birthday
					</FormLabel>
					<Input
						type='date'
						name='birthday'
						size='lg'
						fontFamily='inter'
						fontWeight='400'
						bg='gray.50'
						w='60%'
						focusBorderColor='purple.500'
						placeholder='Enter birthday'
						onChange={onChange}
						value={birthday || ''}
					/>
				</FormControl>
				<FormControl py='8px'>
					<FormLabel
						htmlFor='country'
						fontFamily='inter'
						fontWeight='semibold'
						color='purple.600'
						fontSize='14px'
					>
						Country
					</FormLabel>
					<Select
						placeholder='Select country'
						name='country'
						w='60%'
						size='lg'
						fontFamily='inter'
						fontWeight='400'
						bg='gray.50'
						w='60%'
						focusBorderColor='purple.500'
						onChange={onChange}
						value={country || ''}
					>
						<option value='Philippines'>Philippines</option>
						<option value='South Korea'>South Korea</option>
						<option value='Japan'>Japan</option>
					</Select>
				</FormControl>
				<Flex alignItems='flex-start' py='16px' w='60%'>
					<Stack spacing={4} w='full'>
						<Text
							w='190px'
							y='16px'
							pr='12px'
							fontFamily='inter'
							fontWeight='semibold'
							color='purple.600'
						>
							Social Media
						</Text>
						<Stack isInline spacing={6} alignItems='center'>
							<Icon name='facebook' size='36px' color='#3b5999' />
							<Input
								type='text'
								name='facebook'
								size='lg'
								fontFamily='inter'
								fontWeight='400'
								bg='gray.50'
								focusBorderColor='purple.500'
								placeholder='Enter facebook information'
								onChange={onChange}
								value={facebook || ''}
							/>
						</Stack>
						<Stack isInline spacing={6} alignItems='center'>
							<Icon name='twitter' size='36px' color='#55acee' />
							<Input
								type='text'
								name='twitter'
								size='lg'
								fontFamily='inter'
								fontWeight='400'
								bg='gray.50'
								focusBorderColor='purple.500'
								placeholder='Enter twitter information'
								onChange={onChange}
								value={twitter || ''}
							/>
						</Stack>
						<Stack isInline spacing={6} alignItems='center'>
							<Box
								p='5px'
								borderRadius='10px'
								background='linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'
							>
								<Icon name='instagram' size='26px' color='#fff' />
							</Box>
							<Input
								type='text'
								name='instagram'
								size='lg'
								fontFamily='inter'
								fontWeight='400'
								bg='gray.50'
								focusBorderColor='purple.500'
								placeholder='Enter instagram information'
								onChange={onChange}
								value={instagram || ''}
							/>
						</Stack>
						<Stack isInline spacing={6} alignItems='center'>
							<Icon name='youtube' size='36px' color='#cd201f' />
							<Input
								type='text'
								name='youtube'
								size='lg'
								fontFamily='inter'
								fontWeight='400'
								bg='gray.50'
								focusBorderColor='purple.500'
								placeholder='Enter youtube information'
								onChange={onChange}
								value={youtube || ''}
							/>
						</Stack>
					</Stack>
				</Flex>
				<Flex w='full' justifyContent='center' pt='20px'>
					<Button
						variant='outline'
						variantColor='purple'
						textAlign='center'
						my='auto'
						w='224px'
						h='54px'
						onClick={onSubmit}
						loadingText='Updating'
						isLoading={loading ? true : false}
					>
						Save
					</Button>
				</Flex>
			</Box>
		</>
	);
};

export default UserInfoEdit;
