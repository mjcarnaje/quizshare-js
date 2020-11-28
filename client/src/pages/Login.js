import { useMutation } from '@apollo/client';
import {
	Alert,
	AlertIcon,
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	useToast,
	Grid,
	Image,
	Input,
	Stack,
	Text,
} from '@chakra-ui/react';
import { Form, Formik, useField } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import signin from '../assets/svg/signin.svg';
import { loginUser } from '../store/authSlice';
import { LOGIN } from '../utils/graphql';

const LoginTextField = ({ customError, ...props }) => {
	const [field, meta] = useField(props);
	const errorText = meta.error && meta.touched ? meta.error : '';
	return (
		<FormControl isInvalid={!!errorText || typeof customError === 'string'}>
			<FormLabel htmlFor={field.name} fontSize={14} fontWeight='medium'>
				{`${field.name.charAt(0).toUpperCase()}${field.name.substr(1)}`}
			</FormLabel>
			<Input {...field} {...props} focusBorderColor='purple.500' />
			{!customError && <FormErrorMessage>{errorText}</FormErrorMessage>}
		</FormControl>
	);
};

const loginValidation = yup.object({
	username: yup.string().required(),
	password: yup.string().required(),
});

const Login = (props) => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const [loginMutation] = useMutation(LOGIN);
	const toast = useToast();

	return (
		<Grid
			templateColumns={{ md: '1fr', lg: 'repeat(2, 1fr)' }}
			gap={4}
			p='20px'
			width={{ md: '50%', lg: '75%' }}
			minH='75%'
			bg='white'
			shadow='md'
			rounded='md'
			justifyItems='center'
			alignItems='center'
		>
			<Box w='full' px='64px'>
				<Text
					fontSize='4xl'
					fontFamily='inter'
					fontWeight='bold'
					textAlign='center'
				>
					Welcome Back!
				</Text>
				<Text fontSize={18} fontFamily='inter' textAlign='center' mb='20px'>
					Sign in to your QuizShare account
				</Text>
				{error && (
					<Box>
						<Alert status='error' rounded='sm'>
							<AlertIcon />
							{`${error}`}
						</Alert>
					</Box>
				)}
				<Stack fontFamily='inter' spacing={2} pt='16px'>
					<Formik
						initialValues={{
							username: '',
							password: '',
						}}
						validationSchema={loginValidation}
						onSubmit={async (values, { setErrors }) => {
							try {
								const { data } = await loginMutation({ variables: values });
								dispatch(loginUser(data.login));
								props.history.push('/home');
							} catch (err) {
								toast({
									title: 'Error',
									description: `${err?.graphQLErrors?.[0]?.message}`,
									status: 'error',
									duration: 3000,
									isClosable: true,
									position: 'bottom',
								});
							}
						}}
					>
						{({ errors, isSubmitting }) => {
							if (typeof errors === 'string') {
								setError(errors);
							} else {
								setError(null);
							}

							return (
								<>
									<Form>
										<LoginTextField
											name='username'
											placeholder='Enter username'
											customError={error}
										/>
										<LoginTextField
											type='password'
											name='password'
											placeholder='Enter password'
											customError={error}
										/>

										<Button
											type='submit'
											isLoading={isSubmitting}
											mt='16px'
											w='100%'
											colorScheme='purple'
											loadingText='Logging in'
										>
											Login
										</Button>
									</Form>
								</>
							);
						}}
					</Formik>
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
			<Box w='100%' display={{ md: 'none', lg: 'block' }}>
				<Image objectFit='cover' src={signin} alt='Sign in Image' />
			</Box>
		</Grid>
	);
};

export default Login;
