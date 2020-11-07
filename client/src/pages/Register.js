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
} from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/authSlice';

import signup from '../assets/svg/sign_up.svg';

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

const Register = (props) => {
	const dispatch = useDispatch();
	const [secondStep, setsecondStep] = useState(false);
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const [register, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }) {
			props.history.push('/home');
			dispatch(loginUser(userData));
		},
		onError(err) {
			console.log(err.graphQLErrors[0].extensions.errors);
		},
		variables: values,
	});

	const buttonLoginContinue = () => {
		if (secondStep) {
			register();
		} else {
			setsecondStep(true);
		}
	};
	const { username, email, password, confirmPassword } = values;
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
				<Stack spacing={1} paddingBottom='1rem'>
					<Text
						fontSize='4xl'
						fontFamily='inter'
						fontWeight='bold'
						textAlign='center'
					>
						Create Account
					</Text>
					<Text fontSize={18} fontFamily='inter' textAlign='center'>
						Create your QuizShare account
					</Text>
					<div className='container-nextbutton'>
						<span
							className={`${secondStep ? 'bg-left' : 'bg-right'} bg-container`}
						></span>
						<button
							className={`${
								secondStep ? 'text-purple' : 'text-white'
							} button-gradient`}
							onClick={() => setsecondStep(false)}
						>
							First Step
						</button>
						<button
							className={`${
								secondStep ? 'text-white' : 'text-purple'
							} button-gradient `}
							onClick={() => setsecondStep(true)}
						>
							Second Step
						</button>
					</div>
				</Stack>
				<Stack spacing={2} paddingX={4}>
					{secondStep ? (
						<Stack spacing={2}>
							<FormControl>
								<FormLabel
									htmlFor='password'
									fontSize={14}
									fontWeight='medium'
									fontFamily='inter'
								>
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
							<FormControl>
								<FormLabel
									htmlFor='confirmPassword'
									fontSize={14}
									fontWeight='medium'
									fontFamily='inter'
								>
									Confirm Password
								</FormLabel>
								<Input
									type='password'
									name='confirmPassword'
									onChange={onChange}
									value={confirmPassword}
									focusBorderColor='purple.500'
									placeholder='Enter Confirm password'
								/>
							</FormControl>
						</Stack>
					) : (
						<Stack spacing={2}>
							<FormControl>
								<FormLabel
									htmlFor='username'
									fontSize={14}
									fontWeight='medium'
									fontFamily='inter'
								>
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
								<FormLabel
									htmlFor='email'
									fontSize={14}
									fontWeight='medium'
									fontFamily='inter'
								>
									Email
								</FormLabel>
								<Input
									type='text'
									name='email'
									onChange={onChange}
									value={email}
									focusBorderColor='purple.500'
									placeholder='Enter email'
								/>
							</FormControl>
						</Stack>
					)}
					<Button
						mt={4}
						variantColor='purple'
						type='submit'
						loadingText='Registering in'
						isLoading={secondStep && loading ? true : false}
						onClick={buttonLoginContinue}
					>
						{secondStep ? 'Register' : 'Continue'}
					</Button>
					<Flex justifyContent='center' alignItems='center'>
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
							<Link to='/login'>Log In!</Link>
						</Text>
					</Flex>
				</Stack>
			</Box>
			<Box
				display={{ base: 'none', lg: 'block' }}
				width={7 / 12}
				paddingX='2rem'
			>
				<Image size='100%' objectFit='cover' src={signup} alt='Sign in Image' />
			</Box>
		</Box>
	);
};

export default Register;
