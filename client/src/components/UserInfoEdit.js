import { gql, useMutation } from '@apollo/client';
import {
	Avatar,
	Box,
	Button,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useDispatch } from 'react-redux';
import { loadCurrentUser } from '../store/authSlice';
import { validateImg } from '../utils/validators';
import CropperModal from '../components/CropperModal';

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

	const [originalPic, setOriginalPic] = useState();
	const [previewPic, setPreviewPic] = useState();
	const [croppedPic, setCroppedPic] = useState();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const selectPicture = (e) => {
		const selected = e.target.files?.[0];
		if (selected) {
			const picture = validateImg(selected);
			if (!picture) return;
			openImageCropper(picture);
		}
	};

	const editSelectedPic = () => {
		setPreviewPic(originalPic);
		onOpen();
	};

	const openImageCropper = (picture) => {
		const reader = new FileReader();
		reader.readAsDataURL(picture);
		reader.onloadend = () => {
			setOriginalPic(reader.result);
			setPreviewPic(reader.result);
			onOpen();
		};
	};

	const [updateProfile, { loading }] = useMutation(UPDATE_ACCOUNT_INFO, {
		variables: {
			...values,
			avatar: croppedPic
				? croppedPic
				: values?.avatar?.includes('cloudinary')
				? ''
				: values?.avatar,
		},
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
	}, []);

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
							src={croppedPic ? croppedPic : authAvatar ? authAvatar : ''}
							size='xl'
						/>

						<input
							id='image-button'
							type='file'
							name='image'
							onChange={(e) => selectPicture(e)}
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
						<CropperModal
							onClose={onClose}
							isOpen={isOpen}
							previewPic={previewPic}
							setPreviewPic={setPreviewPic}
							setCroppedPic={setCroppedPic}
							aspectRatio={1 / 1}
						/>
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
