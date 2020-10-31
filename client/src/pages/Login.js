import React from 'react';
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
import { Link, Redirect } from 'react-router-dom';

import signin from '../assets/svg/sign_in.svg';

const Login = () => {
	return (
		<Flex
			bg='white'
			width='75%'
			marginX='auto'
			justifyContent='center'
			alignItems='center'
			paddingX={12}
			paddingY='3rem'
			marginY='1rem'
			rounded='md'
			shadow='md'
		>
			<Box width={5 / 12} height='100%'>
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
					<FormControl>
						<FormLabel htmlFor='username' fontSize={14} fontWeight='medium'>
							Username
						</FormLabel>
						<Input
							type='text'
							id='username'
							focusBorderColor='purple.500'
							placeholder='Enter password'
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor='password' fontSize={14} fontWeight='medium'>
							Password
						</FormLabel>
						<Input
							type='password'
							id='password'
							focusBorderColor='purple.500'
							placeholder='Enter password'
						/>
					</FormControl>
					<Button
						mt={4}
						variantColor='purple'
						type='submit'
						loadingText='Logging in'
					>
						Login
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
							<Link to='/register'>Sign Up!</Link>
						</Text>
					</Flex>
				</Stack>
			</Box>
			<Box width={7 / 12} paddingX='2rem'>
				<Image size='100%' objectFit='cover' src={signin} alt='Sign in Image' />
			</Box>
		</Flex>
	);
};

export default Login;
