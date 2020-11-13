import React from 'react';
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
	Grid,
	Flex,
	Radio,
	Divider,
	FormErrorMessage,
	IconButton,
	Icon,
} from '@chakra-ui/core';
import { Field, FieldArray, Form, Formik, useField } from 'formik';
import TextareaAutosize from 'react-textarea-autosize';
import * as yup from 'yup';

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

const MyChoiceField = ({ nameForRadio, remove, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<FormControl>
			<Flex bg='#f7fafc' rounded='md' h='full' direction='column'>
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
				<Flex
					bg='gray.100'
					rounded='md'
					justifyContent='space-between'
					mt='auto'
				>
					<Radio
						{...field}
						name={nameForRadio}
						size='sm'
						variantColor='green'
						p='3px'
						ml='3px'
						fontFamily='inter'
					>
						correct answer
					</Radio>
					<IconButton
						icon='delete'
						size='sm'
						color='red.300'
						_focus={{ outline: 'none' }}
						onClick={remove}
					/>
				</Flex>
			</Flex>
		</FormControl>
	);
};

const quizValidationSchema = yup.object({
	title: yup.string().required(),
	description: yup.string().required(),
	questions: yup.array().of(
		yup.object({
			question: yup.string().required(),
			choices: yup.array().of(yup.string()),
			answer: yup.string().required(),
		})
	),
});

const CreateQuiz = () => {
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
							question: '',
							choices: ['', ''],
							answer: null,
						},
					],
				}}
				onSubmit={(values) => {
					alert(JSON.stringify(values, null, 2));
				}}
				validationSchema={quizValidationSchema}
				validateOnBlur={false}
				validateOnChange={false}
			>
				{({ values }) => {
					return (
						<>
							<Form>
								<Stack
									bg='gray.50'
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
																<Field name={`${arrayHelpers.name}.${i}`}>
																	{(fieldProps) => (
																		<Box
																			p='10px'
																			rounded='md'
																			boxShadow='sm'
																			my='16px'
																			bg='white'
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
																					variantColor='purple'
																					fontSize='18px'
																					icon='delete'
																					onClick={() => arrayHelpers.remove(i)}
																				/>
																			</Flex>
																			<Box>
																				<MyTextField
																					name={`${arrayHelpers.name}.${i}.question`}
																					placeholder='Type your Question here...'
																					fontSize='18px'
																					resize='none'
																					minH='40px'
																					overflow='hidden'
																					textarea
																					nolabel
																				/>
																			</Box>

																			<Grid
																				templateColumns='repeat(2, 1fr)'
																				gap={4}
																				mt={8}
																			>
																				<FieldArray
																					name={`${arrayHelpers.name}.${i}.choices`}
																					validateOnChange={false}
																				>
																					{({ push, remove }) => {
																						return (
																							<>
																								{fieldProps.field.value.choices.map(
																									(c, i) => (
																										<MyChoiceField
																											name={`${fieldProps.field.name}.choices.${i}`}
																											nameForRadio={`${fieldProps.field.name}.answer`}
																											remove={() => remove(i)}
																										/>
																									)
																								)}
																								<Box
																									w='full'
																									textAlign='center'
																								>
																									<Button
																										variantColor='purple'
																										variant='ghost'
																										fontFamily='inter'
																										onClick={() => push('')}
																									>
																										Add choice
																									</Button>
																								</Box>
																							</>
																						);
																					}}
																				</FieldArray>
																			</Grid>
																		</Box>
																	)}
																</Field>
															);
														})}
														<Button
															variantColor='purple'
															size='lg'
															w='full'
															onClick={() =>
																arrayHelpers.push({
																	question: '',
																	choices: ['', ''],
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
									<Box ml='auto'>
										<Button
											variant='outline'
											variantColor='purple'
											type='submit'
											px='20px'
										>
											Cancel
										</Button>
										<Button
											variantColor='purple'
											type='submit'
											px='20px'
											ml='10px'
										>
											Save
										</Button>
									</Box>
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
