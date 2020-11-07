import React, { useState } from 'react';
import {
	FormControl,
	FormLabel,
	Flex,
	Input,
	Box,
	Image,
	Text,
	Stack,
	Button,
	useToast,
} from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { loginUser } from '../store/authSlice';

import signin from '../assets/svg/sign_in.svg';

const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			email
			token
			username
			avatar
			createdAt
		}
	}
`;

const Login = (props) => {
	const [values, setValues] = useState({
		username: '',
		password: '',
	});

	const dispatch = useDispatch();
	const toast = useToast();

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const [login, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }) {
			dispatch(loginUser(userData));

			props.history.push('/home');
		},
		onError(err) {
			const errors = Object.values(err.graphQLErrors[0].extensions.errors);
			errors.forEach((error) =>
				toast({
					position: 'bottom-right',
					description: `${error}`,
					status: 'error',
					isClosable: true,
				})
			);
		},
		variables: values,
	});

	const onSubmit = (e) => {
		e.preventDefault();
		login();
	};

	const { username, password } = values;

	return (
		<Box
			display='flex'
			bg='white'
			width={{ md: '50%', lg: '75%' }}
			marginX='auto'
			justifyContent='center'
			alignItems='center'
			paddingX={12}
			paddingY='3rem'
			marginY='1rem'
			rounded='md'
			shadow='md'
		>
			<Box width={{ md: '100%', lg: 5 / 12 }} height='100%'>
				<Stack spacing={1} paddingBottom='2rem'>
					<Text
						fontSize='4xl'
						fontFamily='inter'
						fontWeight='bold'
						textAlign='center'
					>
						Welcome Back!
					</Text>
					<Text fontSize={18} fontFamily='inter' textAlign='center'>
						Sign in to your QuizShare account
					</Text>
				</Stack>

				<Stack fontFamily='inter' spacing={2} paddingX={4}>
					<form onSubmit={(e) => onSubmit(e)}>
						<FormControl>
							<FormLabel htmlFor='username' fontSize={14} fontWeight='medium'>
								Username
							</FormLabel>
							<Input
								type='text'
								name='username'
								onChange={onChange}
								value={username}
								focusBorderColor='purple.500'
								placeholder='Enter username'
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor='password' fontSize={14} fontWeight='medium'>
								Password
							</FormLabel>
							<Input
								type='password'
								name='password'
								onChange={onChange}
								value={password}
								focusBorderColor='purple.500'
								placeholder='Enter password'
							/>
						</FormControl>
						<Button
							type='submit'
							mt={4}
							w='100%'
							variantColor='purple'
							isLoading={loading ? true : false}
							loadingText='Logging in'
						>
							Login
						</Button>
					</form>
					<Flex justifyContent='center' alignItems='center' mt={2}>
						<Text fontFamily='inter' fontSize='sm'>
							Don't have an account?
						</Text>
						<Text
							fontFamily='inter'
							color='purple.500'
							fontSize='sm'
							fontWeight='bold'
							paddingX={2}
						>
							<Link to='/register'>Sign Up!</Link>
						</Text>
					</Flex>
				</Stack>
			</Box>
			<Box
				display={{ base: 'none', lg: 'block' }}
				width={7 / 12}
				paddingX='2rem'
			>
				<Image size='100%' objectFit='cover' src={signin} alt='Sign in Image' />
			</Box>
		</Box>
	);
};

export default Login;
