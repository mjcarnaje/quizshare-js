import React, { useState } from 'react';
import {
	Box,
	FormLabel,
	Heading,
	Stack,
	Input,
	FormControl,
	Text,
	Textarea,
	Button,
	Flex,
	Radio,
	FormErrorMessage,
	IconButton,
	Icon,
	Spacer,
} from '@chakra-ui/react';

import { uuid } from 'uuidv4';

import { Field, FieldArray, Form, Formik, useField } from 'formik';
import TextareaAutosize from 'react-textarea-autosize';
import * as yup from 'yup';
import { MdDelete } from 'react-icons/md';
import CreateChoices from '../components/CreateChoices';
import { Link } from 'react-router-dom';
import { CREATE_QUIZ, GET_ALL_QUIZZES } from '../utils/graphql';
import { useMutation } from '@apollo/client';

const MyTextField = ({ input, textarea, nolabel, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<FormControl isInvalid={meta.error && meta.touched}>
			{!nolabel && (
				<FormLabel
					fontSize='13px'
					color='gray.700'
					py='3px'
					fontFamily='inter'
					fontWeight='semibold'
					letterSpacing='1px'
					textTransform='uppercase'
				>
					{field.name}
				</FormLabel>
			)}

			{input && (
				<Input
					{...field}
					{...props}
					type='text'
					variant='filled'
					bg='gray.50'
					_focus={{ outline: 'none', bg: 'gray.50' }}
					_hover={{ bg: 'gray.50' }}
					fontFamily='inter'
				/>
			)}
			{textarea && (
				<Textarea
					{...field}
					{...props}
					type='text'
					variant='filled'
					bg='gray.50'
					_focus={{ outline: 'none', bg: 'gray.50' }}
					_hover={{ bg: 'gray.50' }}
					fontFamily='inter'
					as={TextareaAutosize}
				/>
			)}

			<FormErrorMessage fontFamily='inter'>{meta.error}</FormErrorMessage>
		</FormControl>
	);
};

const MyChoiceField = ({ remove, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<FormControl>
			<Textarea
				{...field}
				{...props}
				type='text'
				variant='filled'
				bg='#f7fafc'
				_focus={{ outline: 'none', bg: 'gray.50' }}
				_hover={{ bg: 'gray.50' }}
				fontFamily='inter'
				as={TextareaAutosize}
				placeholder='Type your answer here...'
				resize='none'
				minH='27px'
				overflow='hidden'
			/>
		</FormControl>
	);
};

const quizValidationSchema = yup.object({
	title: yup.string().required(),
	description: yup.string().required(),
	questions: yup.array().of(
		yup.object({
			id: yup.string(),
			question: yup.string().required(),
			choices: yup
				.array()
				.of(yup.object({ id: yup.string(), value: yup.string().required() })),
			answer: yup.string().required(),
		})
	),
});

const CreateQuiz = (props) => {
	const [createQuizMutation] = useMutation(CREATE_QUIZ);
	return (
		<Box w='full' minH='full'>
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
				initialValues={{
					title: '',
					description: '',
					questions: [
						{
							id: uuid(),
							question: '',
							choices: [
								{ id: uuid(), value: '' },
								{ id: uuid(), value: '' },
							],
							answer: null,
						},
					],
				}}
				onSubmit={async (values, { setErrors }) => {
					try {
						const { data } = await createQuizMutation({
							variables: values,
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
							},
						});

						props.history.push('/home');
					} catch (err) {
						console.log(err);
					}
				}}
				validationSchema={quizValidationSchema}
				validateOnBlur={false}
				validateOnChange={false}
			>
				{({ values, isSubmitting }) => {
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
									<Box>
										<MyTextField
											name='title'
											placeholder='Type the Quiz title here...'
											fontSize='20px'
											size='lg'
											fontWeight='600'
											input
										/>
									</Box>
									<Box>
										<MyTextField
											name='description'
											placeholder='Type the description or the instructions of the quiz here..'
											fontSize='18px'
											resize='none'
											overflow='hidden'
											textarea
										/>
									</Box>
									<Box>
										<Text
											fontSize='13px'
											color='gray.700'
											fontFamily='inter'
											fontWeight='semibold'
											py='5px'
											letterSpacing='1px'
										>
											QUESTIONS
										</Text>
										<FieldArray name='questions' validateOnChange={false}>
											{(arrayHelpers) => {
												return (
													<>
														{values.questions.map((q, i) => {
															return (
																<Field name={`questions.${i}`}>
																	{(fieldProps) => (
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
																					onClick={() =>
																						arrayHelpers.remove(q.id)
																					}
																				/>
																			</Flex>
																			<Box>
																				<MyTextField
																					name={`questions.${i}.question`}
																					placeholder='Type your Question here...'
																					fontSize='18px'
																					resize='none'
																					minH='40px'
																					overflow='hidden'
																					textarea
																					nolabel
																				/>
																			</Box>

																			<CreateChoices
																				name={`questions.${i}`}
																				option={fieldProps.field.value.choices}
																				ans={fieldProps.field.value.answer}
																			/>
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
																arrayHelpers.push({
																	id: uuid(),
																	question: '',
																	choices: [
																		{ id: uuid(), value: '' },
																		{ id: uuid(), value: '' },
																	],
																	answer: null,
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
