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
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import { loadCurrentUser } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { render } from 'react-dom';
import { GET_ALL_QUIZZES } from '../utils/graphql';

const UPDATE_ACCOUNT_INFO = gql`
	mutation updateAccount(
		$avatar: String
		$username: String
		$email: String
		$password: String
		$confirmPassword: String
	) {
		updateAccount(
			updateAccountInput: {
				avatar: $avatar
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			avatar
			createdAt
		}
	}
`;

const UserInfoEdit = ({
	isEdit,
	userInfo: { username: authUsername, email: authEmail, avatar: authAvatar },
}) => {
	const dispatch = useDispatch();
	const [values, setValues] = useState({
		avatar: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const toast = useToast();

	const [image, setImage] = useState('');
	const [previewSource, setPreviewSource] = useState('');

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const imageInputChange = (e) => {
		if (e.target.files) {
			const file = e.target.files[0];
			previewFile(file);
		}
	};

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
			setValues({ ...values, avatar: reader.result });
		};
	};

	const [updateProfile, { loading }] = useMutation(UPDATE_ACCOUNT_INFO, {
		update(cache, { data: { updateAccount } = {} }) {
			isEdit(false);
			dispatch(loadCurrentUser(updateAccount));

			toast({
				title: 'Updated',
				description: 'Your account information is now updated',
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'bottom-left',
			});
		},
		onError(err) {
			toast({
				title: 'Error',
				description: `${err.graphQLErrors[0].message.substr(16)}`,
				status: 'error',
				duration: 9000,
				isClosable: true,
				position: 'bottom-right',
			});
		},
		variables: {
			...values,
			avatar: values.avatar
				? values.avatar.includes('cloudinary')
					? ''
					: values.avatar
				: '',
		},
	});

	const onSubmit = (e) => {
		e.preventDefault();
		updateProfile();
	};

	useEffect(() => {
		setValues({
			...values,
			avatar: authAvatar,
			username: authUsername,
			email: authEmail,
		});
	}, [authAvatar, authUsername, authEmail]);

	const { username, email, password, confirmPassword } = values;

	return (
		<>
			<Box py='16px' px='32px'>
				<Box pb='12px'>
					<Text
						w='190px'
						py='12px'
						fontFamily='inter'
						fontWeight='semibold'
						color='purple.600'
						fontSize='14px'
					>
						Profile Image
					</Text>
					<Flex alignItems='center'>
						<Avatar
							name={authUsername && authUsername}
							src={previewSource ? previewSource : authAvatar ? authAvatar : ''}
							size='xl'
						/>
						<input
							id='image-button'
							type='file'
							name='image'
							onChange={imageInputChange}
							value={image}
							hidden
						/>
						<Button
							as='label'
							htmlFor='image-button'
							colorScheme='gray'
							color='gray.600'
							variant='ghost'
							ml='15px'
						>
							Upload an image
						</Button>
					</Flex>
				</Box>
				<FormControl py='8px'>
					<FormLabel
						htmlFor='username'
						fontFamily='inter'
						fontWeight='semibold'
						color='purple.600'
						fontSize='14px'
					>
						Username
					</FormLabel>
					<Input
						type='username'
						name='username'
						size='lg'
						fontFamily='inter'
						fontWeight='400'
						bg='gray.50'
						w='60%'
						focusBorderColor='purple.500'
						placeholder='Enter username'
						onChange={onChange}
						value={username}
					/>
				</FormControl>
				<FormControl py='8px'>
					<FormLabel
						htmlFor='email'
						fontFamily='inter'
						fontWeight='semibold'
						color='purple.600'
						fontSize='14px'
					>
						Email
					</FormLabel>
					<Input
						type='email'
						name='email'
						size='lg'
						fontFamily='inter'
						fontWeight='400'
						bg='gray.50'
						w='60%'
						focusBorderColor='purple.500'
						placeholder='Enter email'
						onChange={onChange}
						value={email}
					/>
				</FormControl>
				<FormControl py='8px'>
					<FormLabel
						htmlFor='password'
						fontFamily='inter'
						fontWeight='semibold'
						color='purple.600'
						fontSize='14px'
					>
						Password
					</FormLabel>
					<Input
						type='password'
						name='password'
						size='lg'
						fontFamily='inter'
						fontWeight='400'
						bg='gray.50'
						w='60%'
						focusBorderColor='purple.500'
						placeholder='Enter new password'
						onChange={onChange}
						value={password}
					/>
					<FormHelperText fontFamily='inter' color='gray.600'>
						* Password must be at least 6 characters, and a combination of
						letters and numbers.
					</FormHelperText>
					<FormHelperText fontFamily='inter' color='gray.600'>
						* Avoid using a password that you use with other websites or that
						might be easy for someone else to guess.
					</FormHelperText>
				</FormControl>
				<FormControl py='8px'>
					<FormLabel
						htmlFor='confirmPassword'
						fontFamily='inter'
						fontWeight='semibold'
						color='purple.600'
						fontSize='14px'
					>
						Confirm password
					</FormLabel>
					<Input
						type='password'
						name='confirmPassword'
						size='lg'
						fontFamily='inter'
						fontWeight='400'
						bg='gray.50'
						w='60%'
						focusBorderColor='purple.500'
						placeholder='Confirm new password'
						onChange={onChange}
						value={confirmPassword}
					/>
				</FormControl>
				<Flex w='full' justifyContent='center' pt='20px'>
					<Button
						variant='outline'
						colorScheme='purple'
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
