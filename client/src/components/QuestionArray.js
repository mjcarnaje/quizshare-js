import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	IconButton,
	Input,
	ScaleFade,
	Switch,
	Textarea,
	Tooltip,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuid } from 'uuid';
import ChoiceArray from './ChoiceArray';

let renderCount = 0;

const QuestionArray = ({ updateMode, doneFetching, setDoneFetching }) => {
	const { isOpen, onOpen } = useDisclosure();
	const { control, register, errors, watch } = useFormContext();
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'questions',
		keyName: 'defaultID',
	});
	useEffect(() => {
		if (doneFetching) {
			setDoneFetching(false);
		}
		if (!updateMode) {
			append(
				{
					id: uuid(),
					question: '',
					answer: '',
					explanation: '',
					withExplanation: false,
					choices: [],
				},
				false
			);
		}
	}, [updateMode, doneFetching]);

	useEffect(() => {
		onOpen();
	}, []);

	console.log('Rendering....' + renderCount++);

	return (
		<VStack spacing='15px' p={{ md: '10px' }} w='full'>
			{fields.map((question, index) => {
				const explain = watch(`questions[${index}].withExplanation`);
				return (
					<Box key={question.defaultID} w='full'>
						<ScaleFade initialScale={0.95} in={isOpen}>
							<Box
								p='15px'
								rounded='md'
								boxShadow='sm'
								bg='white'
								border='1px'
								borderColor='gray.200'
							>
								<input
									type='hidden'
									ref={register({
										name: `questions[${index}].id`,
										value: question.id,
									})}
								/>
								<FormControl>
									<Flex align='center' justify='space-between'>
										<FormLabel
											fontSize='13px'
											fontWeight='400'
											color='gray.700'
											fontFamily='inter'
											letterSpacing='1px'
										>
											{`QUESTION ${index + 1}`}
										</FormLabel>
										<Flex mt='-15px' mr='-10px'>
											<Tooltip hasArrow label='Add explanation'>
												<FormControl display='flex' alignItems='center'>
													<Controller
														control={control}
														name={`questions[${index}].withExplanation`}
														defaultValue={question.withExplanation}
														render={(props) => {
															return (
																<Switch
																	size='sm'
																	colorScheme='purple'
																	onChange={(e) => {
																		props.onChange(e.target.checked);
																	}}
																	isChecked={props.value}
																/>
															);
														}}
													/>
												</FormControl>
											</Tooltip>
											<Tooltip hasArrow label='Remove question'>
												<IconButton
													size='sm'
													variant='ghost'
													colorScheme='purple'
													fontSize='15px'
													icon={<MdDelete />}
													onClick={() => remove(index)}
													isDisabled={fields.length === 1 ? true : false}
												/>
											</Tooltip>
										</Flex>
									</Flex>
									<FormControl isInvalid={errors.questions?.[index]?.question}>
										<Textarea
											variant='filled'
											as={TextareaAutosize}
											ref={register({ required: true })}
											name={`questions[${index}].question`}
											type='text'
											variant='filled'
											bg='#f7fafc'
											_focus={{ outline: 'none', bg: 'gray.50' }}
											_hover={{ bg: 'gray.50' }}
											fontFamily='inter'
											placeholder='Type the question here..'
											resize='none'
											overflow='hidden'
											py='7px'
											isInvalid={
												errors.questions?.[index]?.question ? true : false
											}
											defaultValue={question.question}
										/>
										<FormErrorMessage m='0' px='5px' pb='5px'>
											{`Question ${index + 1} is required field`}
										</FormErrorMessage>
									</FormControl>
									<ChoiceArray
										questionIndex={index}
										answerValue={question.answer}
										updateMode={updateMode}
										doneFetching={doneFetching}
									/>

									{explain && (
										<FormControl
											isInvalid={errors.questions?.[index]?.explanation}
										>
											<Input
												name={`questions[${index}].explanation`}
												ref={register({ required: explain ? true : false })}
												py='7px'
												as={TextareaAutosize}
												type='text'
												variant='filled'
												defaultValue={question.explanation}
												bg='#f7fafc'
												_focus={{ outline: 'none', bg: 'gray.50' }}
												_hover={{ bg: 'gray.50' }}
												fontFamily='inter'
												placeholder='Type the explanation'
												resize='none'
												overflow='hidden'
											/>
											<FormErrorMessage m='0' px='5px' pb='5px'>
												Type explanation or you can just turn if off the switch
												(Add explanation)
											</FormErrorMessage>
										</FormControl>
									)}
								</FormControl>
							</Box>
						</ScaleFade>
					</Box>
				);
			})}
			<Button
				colorScheme='purple'
				size='lg'
				w='full'
				onClick={() => {
					append({
						id: uuid(),
						question: '',
						answer: '',
						withExplanation: false,
						explanation: '',
						choices: [
							{ id: uuid(), value: '' },
							{ id: uuid(), value: '' },
						],
					});
				}}
			>
				Add Question
			</Button>
		</VStack>
	);
};
export default QuestionArray;
