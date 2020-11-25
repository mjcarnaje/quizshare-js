import { useMutation } from '@apollo/client';
import {
	Alert,
	AlertIcon,
	Box,
	Button,
	Container,
	Flex,
	Heading,
	HStack,
	IconButton,
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Spacer,
	Stack,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { Field, FieldArray, Form, Formik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Link } from 'react-router-dom';
import { uuid } from 'uuidv4';
import CreateChoices from '../components/CreateChoices';
import { MyTextAreaField, MyTextField } from '../components/CustomField';
import { CREATE_QUIZ, GET_ALL_QUIZZES } from '../utils/graphql';
import { quizValidationSchema, validateImg } from '../utils/validators';

const INITIAL_QUESTION = {
	id: uuid(),
	question: '',
	choices: [
		{ id: uuid(), value: '' },
		{ id: uuid(), value: '' },
	],
	answer: null,
	explanation: null,
};

const INITIAL_VALUES = {
	title: '',
	description: '',
	image: '',
	questions: [INITIAL_QUESTION],
};

const CreateQuiz = (props) => {
	const toast = useToast();
	const [createQuizMutation] = useMutation(CREATE_QUIZ);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [originalPic, setUpOriginalPic] = useState(null);
	const [previewSource, setPreviewSource] = useState();
	const [finalImage, setFinalImage] = useState(null);
	const imgRef = useRef(null);
	const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 16 / 9 });
	const [completedCrop, setCompletedCrop] = useState(null);

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
		console.log(base64Image);
	}, [completedCrop, previewSource]);

	return (
		<Box w='full' minH='full' mb='30px'>
			<Heading
				as='h1'
				fontFamily='montserrat'
				fontWeight='800'
				color='gray.700'
				fontSize='44px'
				py='30px'
				textAlign='center'
			>
				Create an interactive quiz
			</Heading>
			<Formik
				initialValues={INITIAL_VALUES}
				onSubmit={async (values, { setErrors }) => {
					try {
						await createQuizMutation({
							variables: { ...values, image: finalImage },
							update(cache) {
								const data = cache.readQuery({
									query: GET_ALL_QUIZZES,
								});
								cache.writeQuery({
									query: GET_ALL_QUIZZES,
									data: {
										getQuizzes: [values, ...data.getQuizzes],
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

						props.history.push('/home');
					} catch (err) {
						console.log(err.graphQLErrors[0].message);
					}
				}}
				validationSchema={quizValidationSchema}
				validateOnBlur={false}
				validateOnChange={false}
			>
				{({ values, isSubmitting, errors }) => {
					return (
						<>
							<Form>
								<Stack
									bg='white'
									m='auto'
									w='60%'
									boxShadow='sm'
									rounded='md'
									p='24px'
									spacing='20px'
								>
									<Flex direction='column' justify='center' align='center'>
										<Container
											bg='white'
											border={finalImage ? '' : '2px'}
											borderColor='gray.200'
											borderStyle={finalImage ? '' : 'dashed'}
											minW='full'
											centerContent
											px='0'
											rounded='8px'
										>
											{finalImage ? (
												<Image
													src={finalImage}
													objectFit='cover'
													w='full'
													borderRadius='8px'
												/>
											) : (
												<HStack py='50px' color='gray.300'>
													<BiImageAdd fontSize='45px' />
													<Text>PNG, JPG up to 5MB</Text>
												</HStack>
											)}
										</Container>
										<Container centerContent py='10px'>
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
											<HStack>
												<Button
													as='label'
													htmlFor='image-button'
													colorScheme='gray'
													color='gray.600'
													variant='ghost'
												>
													Upload an image
												</Button>
												{finalImage && (
													<Button
														colorScheme='gray'
														color='gray.600'
														variant='ghost'
														onClick={() => {
															setPreviewSource(originalPic);
															onOpen();
														}}
													>
														Edit
													</Button>
												)}
											</HStack>
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
															onClick={onClose}
														>
															Close
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
										</Container>
									</Flex>
									<Box>
										<MyTextField
											name='title'
											placeholder='Type the Quiz title here...'
											fontSize='20px'
											size='lg'
											fontWeight='600'
										/>
									</Box>
									<Box>
										<MyTextAreaField
											name='description'
											placeholder='Type the description or the instructions of the quiz here..'
											fontSize='18px'
											resize='none'
											overflow='hidden'
										/>
									</Box>
									<Box>
										<Text
											fontSize='13px'
											color='gray.700'
											fontFamily='inter'
											fontWeight='400'
											py='5px'
											letterSpacing='1px'
										>
											QUESTIONS
										</Text>
										<FieldArray name='questions' validateOnChange={false}>
											{({ push, remove }) => {
												return (
													<>
														{values.questions.map((q, i) => {
															return (
																<Field name={`questions.${i}`} key={q.id}>
																	{({ field: { name, value }, form, meta }) => (
																		<Box
																			p='10px'
																			rounded='md'
																			boxShadow='sm'
																			my='16px'
																			bg='white'
																			border='1px'
																			borderColor='gray.200'
																		>
																			<Flex
																				pb='10px'
																				alignItems='center'
																				justifyContent='space-between'
																			>
																				<Text
																					fontSize='12px'
																					color='gray.700'
																					fontFamily='inter'
																					fontWeight='semibold'
																				>
																					{`QUESTION ${i + 1}`}
																				</Text>

																				<IconButton
																					variant='ghost'
																					colorScheme='purple'
																					fontSize='18px'
																					icon={<MdDelete />}
																					onClick={() => remove(i)}
																				/>
																			</Flex>
																			<Box>
																				<MyTextAreaField
																					name={`questions.${i}.question`}
																					placeholder='Type the Question here...'
																					fontSize='16px'
																					resize='none'
																					minH='40px'
																					overflow='hidden'
																					nolabel
																				/>
																			</Box>
																			<CreateChoices
																				nameOfQuestion={`questions.${i}`}
																				choicesOfQuestionValue={value.choices}
																				answerOfQuestionValue={value.answer}
																			/>
																			<Box w='70%' m='auto'>
																				<MyTextAreaField
																					name={`questions.${i}.explanation`}
																					placeholder='Type the explanation (optional)'
																					fontSize='14px'
																					resize='none'
																					minH='40px'
																					overflow='hidden'
																					mt='20px'
																					nolabel
																				/>
																			</Box>
																		</Box>
																	)}
																</Field>
															);
														})}
														<Button
															colorScheme='purple'
															size='lg'
															w='full'
															onClick={() =>
																push({
																	id: uuid(),
																	question: '',
																	choices: [
																		{ id: uuid(), value: '' },
																		{ id: uuid(), value: '' },
																	],
																	answer: null,
																	explanation: null,
																})
															}
														>
															Add Question
														</Button>
													</>
												);
											}}
										</FieldArray>
									</Box>
									{Object.keys(errors).length > 1 && (
										<Alert status='error'>
											<AlertIcon />
											Please complete all the fields
										</Alert>
									)}
									<Flex>
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
											isLoading={isSubmitting}
											ml='10px'
										>
											Save
										</Button>
									</Flex>
								</Stack>
							</Form>
						</>
					);
				}}
			</Formik>
		</Box>
	);
};

export default CreateQuiz;
