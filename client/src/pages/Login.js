import { useMutation } from '@apollo/client';
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	Image,
	Input,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import signin from '../assets/svg/signin.svg';
import { LOGIN } from '../utils/graphql';
import { loginUser } from '../store/authSlice';
import { useForm } from 'react-hook-form';

// const LoginTextField = ({ customError, ...props }) => {
// 	const [field, meta] = useField(props);
// 	const errorText = meta.error && meta.touched ? meta.error : '';
// 	return (
// 		<FormControl isInvalid={!!errorText || typeof customError === 'string'}>
// 			<FormLabel htmlFor={field.name} fontSize={14} fontWeight='medium'>
// 				{`${field.name.charAt(0).toUpperCase()}${field.name.substr(1)}`}
// 			</FormLabel>
// 			<Input {...field} {...props} focusBorderColor='purple.500' />
// 			{!customError && <FormErrorMessage>{errorText}</FormErrorMessage>}
// 		</FormControl>
// 	);
// };

const Login = (props) => {
	const dispatch = useDispatch();

	const [loginMutation] = useMutation(LOGIN);
	const toast = useToast();

	const { register, errors, handleSubmit } = useForm({
		mode: 'onChange',
	});

	const onSubmit = async (values) => {
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
	};

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

				<Stack fontFamily='inter' spacing={2} pt='16px'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={3}>
							<FormControl isInvalid={errors.username}>
								<FormLabel htmlFor='username'>Username</FormLabel>
								<Input
									id='username'
									name='username'
									focusBorderColor='purple.500'
									placeholder='Enter username'
									ref={register({ required: 'username is a required field' })}
									isInvalid={errors.username}
								/>
								<FormErrorMessage>{errors.username?.message}</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={errors.password}>
								<FormLabel htmlFor='password'>Password</FormLabel>
								<Input
									id='password'
									type='password'
									name='password'
									focusBorderColor='purple.500'
									placeholder='Enter password'
									ref={register({ required: 'password is a required field' })}
									isInvalid={errors.password}
								/>
								<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
							</FormControl>

							<Button type='submit' colorScheme='purple' w='full'>
								Login
							</Button>
						</Stack>
					</form>
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
