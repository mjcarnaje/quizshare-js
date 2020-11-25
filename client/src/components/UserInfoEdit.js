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
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [originalPic, setUpOriginalPic] = useState(null);
	const [previewSource, setPreviewSource] = useState();
	const [finalImage, setFinalImage] = useState(null);
	const imgRef = useRef(null);
	const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 1 / 1 });
	const [completedCrop, setCompletedCrop] = useState(null);

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const [updateProfile, { loading }] = useMutation(UPDATE_ACCOUNT_INFO, {
		variables: {
			...values,
			avatar: values.avatar
				? finalImage
					? finalImage
					: ''
				: values.avatar.includes('cloudinary')
				? ''
				: '',
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

	const onLoad = useCallback((img) => {
		imgRef.current = img;
	}, []);

	useEffect(() => {
		if (!completedCrop || !imgRef.current) {
			return;
		}
		const image = imgRef.current;
		const crop = completedCrop;
		const canvas = document.createElement('canvas');

		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		canvas.width = crop.width;
		canvas.height = crop.height;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		);

		const base64Image = canvas.toDataURL('image/jpeg');
		setFinalImage(base64Image);
	}, [completedCrop, previewSource]);

	useEffect(() => {
		setValues({
			...values,
			avatar: authAvatar,
			username: authUsername,
			email: authEmail,
		});
	}, [values, authAvatar, authUsername, authEmail]);

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
							src={finalImage ? finalImage : authAvatar ? authAvatar : ''}
							size='xl'
						/>
						<input
							id='image-button'
							type='file'
							name='image'
							onChange={(e) => {
								const oneIsSelected =
									e.target.files && e.target.files.length > 0;
								if (oneIsSelected) {
									const file = e.target.files[0];
									const imageFile = validateImg(file);
									if (!imageFile) return;

									const reader = new FileReader();
									reader.readAsDataURL(imageFile);
									reader.onloadend = () => {
										setUpOriginalPic(reader.result);
										setPreviewSource(reader.result);
										onOpen();
									};
								}
							}}
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
						<Modal
							isCentered
							onClose={onClose}
							isOpen={isOpen}
							motionPreset='slideInBottom'
							size='xl'
						>
							<ModalOverlay />
							<ModalContent>
								<ModalBody p='12px'>
									<ReactCrop
										src={previewSource}
										onImageLoaded={onLoad}
										crop={crop}
										onChange={(c) => setCrop(c)}
										onComplete={(c) => setCompletedCrop(c)}
									/>
								</ModalBody>
								<ModalFooter>
									<Button
										colorScheme='purple'
										mr={3}
										onClick={() => {
											setFinalImage(null);
											onClose();
										}}
									>
										Cancel
									</Button>
									<Button
										variant='ghost'
										onClick={() => {
											onClose();
											setPreviewSource(null);
										}}
									>
										Save
									</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>
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
