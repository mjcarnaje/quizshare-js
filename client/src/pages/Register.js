import React, { useState } from 'react';
import {
	Grid,
	Box,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Image,
	Text,
	FormControl,
	FormLabel,
	Input,
	Stack,
	FormErrorMessage,
	Button,
	FormHelperText,
	AlertIcon,
	Alert,
	Flex,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/authSlice';
import { Field, Form, Formik, useField } from 'formik';
import * as yup from 'yup';

import signup from '../assets/svg/signup.svg';
import { REGISTER } from '../utils/graphql';

const RegisterTextField = ({ label, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<FormControl isInvalid={meta.error && meta.touched ? true : false} my='4px'>
			<FormLabel
				htmlFor={field.name}
				fontSize={14}
				fontWeight='medium'
				fontFamily='inter'
			>
				{label ||
					`${field.name.charAt(0).toUpperCase()}${field.name.substr(1)}`}
			</FormLabel>
			<Input {...field} {...props} focusBorderColor='purple.500' />
			<FormErrorMessage>
				{meta.error && meta.touched ? meta.error : ''}
			</FormErrorMessage>
		</FormControl>
	);
};

const signUpValidation = yup.object({
	username: yup.string().required().min(6).max(12),
	email: yup.string().required().email(),
	password: yup.string().required().min(6),
	confirmPassword: yup.string().required(),
});

const Register = (props) => {
	const [tabIndex, setTabIndex] = useState(0);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const [registerMutation] = useMutation(REGISTER);
	return (
		<Grid
			templateColumns={{ md: '1fr', lg: 'repeat(2, 1fr)' }}
			gap={4}
			bg='green.300'
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
					Create Account
				</Text>
				<Text fontSize={18} fontFamily='inter' textAlign='center'>
					Create your QuizShare account
				</Text>
				<Stack fontFamily='inter' spacing={2} pt='16px'>
					<Tabs
						isFitted
						variant='soft-rounded'
						index={tabIndex}
						onChange={(index) => setTabIndex(index)}
					>
						<TabList h='30px' boxShadow='sm' rounded='20px' mb='20px'>
							<Tab
								fontFamily='inter'
								_selected={{
									color: 'white',
									background: 'linear-gradient(to right, #f687b3, #9f7aea)',
								}}
								_focus={{ outline: 'none' }}
							>
								First Step
							</Tab>
							<Tab
								fontFamily='inter'
								_selected={{
									color: 'white',
									background: 'linear-gradient(to left, #f687b3, #9f7aea)',
								}}
								_focus={{ outline: 'none' }}
							>
								Second Step
							</Tab>
						</TabList>
						{error && (
							<Box>
								<Alert status='error' rounded='sm'>
									<AlertIcon />
									{error}
								</Alert>
							</Box>
						)}
						<Formik
							initialValues={{
								username: '',
								email: '',
								password: '',
								confirmPassword: '',
							}}
							validationSchema={signUpValidation}
							onSubmit={async (values, { setErrors }) => {
								try {
									const { data } = await registerMutation({
										variables: values,
									});
									props.history.push('/home');
									dispatch(loginUser(data.register));
								} catch (err) {
									if (
										err.graphQLErrors[0].message &&
										err.graphQLErrors[0].message !== 'Errors'
									) {
										setError(err.graphQLErrors[0].message);
									}
									if (err.graphQLErrors[0].extensions.errors) {
										setErrors(err.graphQLErrors[0].extensions.errors);
									}
								}
							}}
						>
							{({ errors, isSubmitting }) => {
								if (errors.email || errors.username) {
									setTabIndex(0);
								}
								return (
									<Form>
										<TabPanels>
											<TabPanel>
												<RegisterTextField
													name='username'
													placeholder='Enter username'
												/>
												<RegisterTextField
													type='email'
													name='email'
													placeholder='Enter email'
												/>
												<Button
													w='full'
													mt='16px'
													colorScheme='purple'
													onClick={() => setTabIndex(1)}
												>
													Next
												</Button>
											</TabPanel>
											<TabPanel>
												<RegisterTextField
													type='password'
													name='password'
													placeholder='Enter password'
												/>
												<RegisterTextField
													type='password'
													name='confirmPassword'
													placeholder='Enter confirm password'
													label='Confirm Password'
												/>
												<Button
													w='full'
													mt='16px'
													colorScheme='purple'
													type='sumbit'
													isLoading={isSubmitting}
													loadingText='Registering in'
												>
													Register
												</Button>
											</TabPanel>
										</TabPanels>
									</Form>
								);
							}}
						</Formik>
					</Tabs>
					<Flex justifyContent='center' alignItems='center'>
						<Text fontFamily='inter' fontSize='sm'>
							Already have an account?
						</Text>
						<Text
							fontFamily='inter'
							color='purple.500'
							fontSize='sm'
							fontWeight='bold'
							paddingX={2}
						>
							<Link to='/login'>Sign In!</Link>
						</Text>
					</Flex>
				</Stack>
			</Box>
			<Box w='100%' display={{ md: 'none', lg: 'block' }}>
				<Image objectFit='cover' src={signup} alt='Sign up Image' />
			</Box>
		</Grid>
	);
};

export default Register;
