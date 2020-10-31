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
import { Link, Redirect } from 'react-router-dom';

import signup from '../assets/svg/sign_up.svg';

const Register = () => {
	const [secondStep, setsecondStep] = useState(false);

	const buttonLoginContinue = () => {
		if (secondStep) {
			console.log('login');
		} else {
			setsecondStep(true);
		}
	};

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
									id='password'
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
									id='confirmPassword'
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
									id='username'
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
									id='email'
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
						loadingText='Logging in'
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
			<Box width={7 / 12} paddingX='2rem'>
				<Image size='100%' objectFit='cover' src={signup} alt='Sign in Image' />
			</Box>
		</Flex>
	);
};

export default Register;
