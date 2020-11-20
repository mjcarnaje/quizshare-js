import React from 'react';
import { Button, Center, Flex, Grid, IconButton, Text } from '@chakra-ui/react';
import { Field, FieldArray } from 'formik';
import { CheckIcon } from '@chakra-ui/icons';
import { MdDelete } from 'react-icons/md';
import { uuid } from 'uuidv4';
import { MyChoiceField } from './CustomField';

const Choices = ({
	nameOfQuestion,
	choicesOfQuestionValue,
	answerOfQuestionValue,
}) => {
	return (
		<>
			<Grid templateColumns='repeat(2, 1fr)' gap={4} mt={8}>
				<FieldArray name={`${nameOfQuestion}.choices`} validateOnChange={false}>
					{({ push, remove }) => {
						return (
							<>
								{choicesOfQuestionValue.map((choice, i) => {
									return (
										<>
											<Flex
												key={choice.id}
												bg='#f7fafc'
												rounded='md'
												h='full'
												direction='column'
											>
												<MyChoiceField
													name={`${nameOfQuestion}.choices.${i}.value`}
												/>
												<Flex
													bg='gray.100'
													rounded='md'
													justifyContent='space-between'
													mt='auto'
													alignItems='center'
													px='5px'
												>
													<Flex align='center'>
														<Field
															type='radio'
															name={`${nameOfQuestion}.answer`}
															value={choice.id}
															id={choice.id}
															style={{ display: 'none' }}
														/>
														<Flex
															align='center'
															as='label'
															htmlFor={choice.id}
															cursor='pointer'
														>
															<Center
																cursor='pointer'
																borderWidth='1px'
																borderRadius='sm'
																bg={
																	answerOfQuestionValue === choice.id
																		? 'green.600'
																		: ''
																}
																color={
																	answerOfQuestionValue === choice.id
																		? 'white'
																		: 'gray.300'
																}
																boxSize='18px'
															>
																<CheckIcon fontSize='12px' />
															</Center>
															<Text
																fontFamily='inter'
																fontSize='14px'
																ml='5px'
																color={
																	answerOfQuestionValue === choice.id
																		? 'green.600'
																		: ''
																}
																fontWeight={
																	answerOfQuestionValue === choice.id
																		? '600'
																		: '400'
																}
															>
																correct answer
															</Text>
														</Flex>
													</Flex>
													<IconButton
														icon={<MdDelete />}
														size='sm'
														color='red.300'
														_focus={{
															outline: 'none',
														}}
														onClick={remove}
													/>
												</Flex>
											</Flex>
										</>
									);
								})}
								<Center w='full'>
									<Button
										colorScheme='purple'
										variant='ghost'
										fontFamily='inter'
										onClick={() => push({ id: uuid(), value: '' })}
									>
										Add choice
									</Button>
								</Center>
							</>
						);
					}}
				</FieldArray>
			</Grid>
		</>
	);
};

export default Choices;
