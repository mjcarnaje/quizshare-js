import { gql, useMutation } from '@apollo/client';
import {
	AspectRatio,
	Avatar,
	Box,
	Button,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Image,
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
import { FiUploadCloud } from 'react-icons/fi';
import { GET_USER } from '../utils/graphql';

const UPDATE_ACCOUNT_INFO = gql`
	mutation updateAccount(
		$avatar: String
		$cover: String
		$username: String
		$email: String
		$password: String
		$confirmPassword: String
	) {
		updateAccount(
			updateAccountInput: {
				avatar: $avatar
				cover: $cover
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
	userInfo: {
		username: authUsername,
		email: authEmail,
		avatar: authAvatar,
		cover: authCover,
	},
}) => {
	const dispatch = useDispatch();
	const [values, setValues] = useState({
		avatar: '',
		cover: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const toast = useToast();

	const [aspectRatio, setAspectRatio] = useState(1);
	const [isCover, setIsCover] = useState(false);

	const [originalPic, setOriginalPic] = useState();
	const [croppedPic, setCroppedPic] = useState();
	const [previewPic, setPreviewPic] = useState();

	const [originalPicCover, setOriginalPicCover] = useState();
	const [croppedPicCover, setCroppedPicCover] = useState();
	const [previewPicCover, setPreviewPicCover] = useState();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const selectPicture = (e, s) => {
		if (s === 'avatar') setIsCover(false);
		if (s === 'cover') setIsCover(true);

		const selected = e.target.files?.[0];
		if (selected) {
			const picture = validateImg(selected);
			if (!picture) return;

			openImageCropper(picture, s);
		}
	};

	const editSelectedPic = () => {
		setPreviewPic(originalPic);
		onOpen();
	};

	const openImageCropper = (picture, s) => {
		const reader = new FileReader();
		reader.readAsDataURL(picture);
		reader.onloadend = () => {
			if (s === 'avatar') {
				setOriginalPic(reader.result);
				setPreviewPic(reader.result);
			}
			if (s === 'cover') {
				setOriginalPicCover(reader.result);
				setPreviewPicCover(reader.result);
			}
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
			cover: croppedPicCover
				? croppedPicCover
				: values?.cover?.includes('cloudinary')
				? ''
				: values?.cover,
		},
		update(cache, { data: { updateAccount } = {} }) {
			isEdit(false);
			const data = cache.readQuery({
				query: GET_USER,
			});
			cache.writeQuery({
				query: GET_USER,
				data: {
					currentUser: { ...data?.currentUser, cover: croppedPicCover },
				},
			});

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
			cover: authCover,
			username: authUsername,
			email: authEmail,
		});
	}, []);

	const { username, email, password, confirmPassword, cover } = values;

	return (
		<Box pb='16px'>
			<Box
				role='group'
				px='5px'
				pt='5px'
				boxShadow='sm'
				position='relative'
				cursor='pointer'
			>
				<Box overflow='hidden' position='relative'>
					<Box
						position='absolute'
						top='0'
						left='0'
						w='full'
						h='full'
						transition='ease-in'
						transitionDuration='.2s'
						_groupHover={{ background: 'rgba(0, 0, 0, .3)' }}
						zIndex='10'
					></Box>
					<AspectRatio ratio={16 / 5}>
						<Image
							src={
								croppedPicCover
									? croppedPicCover
									: cover
									? cover
									: 'https://bit.ly/naruto-sage'
							}
							objectFit='cover'
							transform='scale(1.02)'
							transition='ease-in'
							transitionDuration='.2s'
							_groupHover={{ transform: 'scale(1)' }}
						/>
					</AspectRatio>
				</Box>
				<Box
					position='absolute'
					top='50%'
					left='50%'
					transform='translate(-50%, -50%)'
					display='none'
					_groupHover={{ display: 'block' }}
					zIndex='15'
				>
					<input
						id='coverUploadButton'
						type='file'
						name='image'
						onChange={(e) => selectPicture(e, 'cover')}
						hidden
					/>

					<Button
						as='label'
						htmlFor='coverUploadButton'
						variant='ghost'
						colorScheme='purple'
						variant='solid'
						leftIcon={<FiUploadCloud />}
					>
						Cover photo
					</Button>
				</Box>
			</Box>
			<Box pt='16px' px='32px'>
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
							id='avatarUploadButton'
							type='file'
							name='image'
							onChange={(e) => selectPicture(e, 'avatar')}
							hidden
						/>
						<Button
							as='label'
							htmlFor='avatarUploadButton'
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
							previewPic={previewPic || previewPicCover}
							setPreviewPic={
								isCover === false ? setPreviewPic : setPreviewPicCover
							}
							setCroppedPic={
								isCover === false ? setCroppedPic : setCroppedPicCover
							}
							aspectRatio={isCover ? 1 : 16 / 5}
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
		</Box>
	);
};

export default UserInfoEdit;
