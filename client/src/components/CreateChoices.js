import { CheckIcon } from '@chakra-ui/icons';
import { MdDelete } from 'react-icons/md';
import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	Grid,
	IconButton,
	Textarea,
	Text,
	Checkbox,
	Radio,
	FormErrorMessage,
} from '@chakra-ui/react';
import { Field, FieldArray, useField } from 'formik';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { uuid } from 'uuidv4';

const MyChoiceField = ({ ...props }) => {
	const [field, meta] = useField(props);
	return (
		<FormControl isInvalid={meta.error && meta.touched}>
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
				x
			/>
			<FormErrorMessage fontFamily='inter'>{meta.error}</FormErrorMessage>
		</FormControl>
	);
};

const Choices = ({ name, option, ans }) => {
	return (
		<>
			<Grid templateColumns='repeat(2, 1fr)' gap={4} mt={8}>
				<FieldArray name={`${name}.choices`} validateOnChange={false}>
					{({ push, remove }) => {
						return (
							<>
								{option.map((val, index) => {
									return (
										<>
											<Flex
												key={val.id}
												bg='#f7fafc'
												rounded='md'
												h='full'
												direction='column'
											>
												<MyChoiceField
													name={`${name}.choices.${index}.value`}
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
															name={`${name}.answer`}
															value={val.id}
															id={val.id}
															style={{ display: 'none' }}
														/>
														<Flex align='center' as='label' htmlFor={val.id}>
															<Center
																cursor='pointer'
																borderWidth='1px'
																borderRadius='sm'
																bg={ans === val.id ? 'green.600' : ''}
																color={ans === val.id ? 'white' : 'gray.300'}
																boxSize='18px'
															>
																<CheckIcon fontSize='12px' />
															</Center>
															<Text
																fontFamily='inter'
																fontSize='14px'
																ml='5px'
																color={ans === val.id ? 'green.600' : ''}
																fontWeight={ans === val.id ? '600' : '400'}
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
