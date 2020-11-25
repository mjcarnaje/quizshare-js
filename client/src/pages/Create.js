import { useMutation } from '@apollo/client';
import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	HStack,
	Image,
	Input,
	Spacer,
	Textarea,
	useDisclosure,
	useToast,
	VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ImFilePicture } from 'react-icons/im';
import { Link, useHistory } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { uuid } from 'uuidv4';
import CropperModal from '../components/CropperModal';
import QuestionArray from '../components/QuestionArray';
import { CREATE_QUIZ, GET_ALL_QUIZZES } from '../utils/graphql';
import { validateImg } from '../utils/validators';

const Create = () => {
	const history = useHistory();
	const toast = useToast();

	const [originalPic, setOriginalPic] = useState();
	const [previewPic, setPreviewPic] = useState();
	const [croppedPic, setCroppedPic] = useState();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const methods = useForm();

	const [createQuizMutation, { loading: createLoading }] = useMutation(
		CREATE_QUIZ
	);

	const onSubmit = async (data) => {
		const value = { ...data, image: croppedPic || '' };
		try {
			await createQuizMutation({
				variables: value,
				update(cache) {
					const data = cache.readQuery({
						query: GET_ALL_QUIZZES,
					});
					cache.writeQuery({
						query: GET_ALL_QUIZZES,
						data: {
							getQuizzes: [value, ...data.getQuizzes],
						},
					});
					toast({
						title: 'Quiz created.',
						description: "You've created a quiz.",
						status: 'success',
						duration: 3000,
						isClosable: true,
					});
				},
			});
			history.push('/home');
		} catch (err) {
			console.error(err);
		}
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

	const { errors, register } = methods;

	return (
		<Box w='full' minH='full' my='40px'>
			<Heading
				as='h1'
				fontFamily='inter'
				fontWeight='800'
				color='gray.700'
				fontSize='56px'
				py='50px'
				textAlign='center'
			>
				Create an interactive quiz
			</Heading>
			<Box w='60%' m='auto' bg='white' boxShadow='sm' rounded='md' p='24px'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)}>
						<VStack spacing='20px'>
							<input
								hidden
								id='picUploader'
								type='file'
								name='image'
								onChange={(e) => selectPicture(e)}
							/>
							{croppedPic ? (
								<Flex direction='column' align='center' w='full'>
									<Image
										src={croppedPic}
										objectFit='cover'
										w='full'
										rounded='md'
									/>
									<HStack spacing='20px' mt='15px'>
										<Button
											as='label'
											htmlFor='picUploader'
											onClick={(e) => selectPicture(e)}
										>
											Upload image
										</Button>
										<Button onClick={editSelectedPic}>Edit image</Button>
									</HStack>
								</Flex>
							) : (
								<Center bg='gray.100' w='full' h='200px' rounded='md'>
									<Button
										as='label'
										htmlFor='picUploader'
										leftIcon={<ImFilePicture fontSize='30px' />}
										color='gray.400'
										fontFamily='inter'
										size='lg'
										_hover={{ bg: 'gray.200' }}
									>
										Upload image (optional)
									</Button>
								</Center>
							)}

							<CropperModal
								onClose={onClose}
								isOpen={isOpen}
								previewPic={previewPic}
								setPreviewPic={setPreviewPic}
								setCroppedPic={setCroppedPic}
								aspectRatio={16 / 9}
							/>
							<FormControl isInvalid={errors.title}>
								<FormLabel
									fontSize='14px'
									fontWeight='400'
									color='gray.700'
									fontFamily='inter'
									letterSpacing='1px'
								>
									TITLE
								</FormLabel>
								<Input
									variant='filled'
									ref={register({ required: true })}
									name='title'
									type='text'
									variant='filled'
									bg='#f7fafc'
									_focus={{ outline: 'none', bg: 'gray.50' }}
									_hover={{ bg: 'gray.50' }}
									fontFamily='inter'
									size='lg'
									fontSize='20px'
									placeholder='Type the title here...'
									isInvalid={errors.title ? true : false}
								/>
								<FormErrorMessage>Title is required field</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={errors.description}>
								<FormLabel
									fontSize='14px'
									fontWeight='400'
									color='gray.700'
									fontFamily='inter'
									letterSpacing='1px'
								>
									DESCRIPTION
								</FormLabel>
								<Textarea
									variant='filled'
									as={TextareaAutosize}
									ref={register({ required: true })}
									name='description'
									type='text'
									variant='filled'
									bg='#f7fafc'
									_focus={{ outline: 'none', bg: 'gray.50' }}
									_hover={{ bg: 'gray.50' }}
									fontFamily='inter'
									placeholder='Type the description here...'
									resize='none'
									overflow='hidden'
									py='5px'
									isInvalid={errors.description ? true : false}
								/>
								<FormErrorMessage>
									Description is required field
								</FormErrorMessage>
							</FormControl>
							<QuestionArray />
							<Flex w='full'>
								<Spacer />
								<Button
									as={Link}
									to='/home'
									variant='outline'
									colorScheme='purple'
									px='20px'
								>
									Cancel
								</Button>
								<Button
									colorScheme='purple'
									type='submit'
									px='20px'
									ml='10px'
									isLoading={createLoading}
								>
									Save
								</Button>
							</Flex>
						</VStack>
					</form>
				</FormProvider>
			</Box>
		</Box>
	);
};

export default Create;
