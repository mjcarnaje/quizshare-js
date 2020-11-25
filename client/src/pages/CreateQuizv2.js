import {
	Box,
	Button,
	Container,
	Flex,
	Grid,
	IconButton,
	Input,
	Radio,
	RadioGroup,
	Stack,
	Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';

const ChoiceArray = ({
	questionIndex,
	answerValue,
	control,
	register,
	getValues,
	errors,
}) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `questions[${questionIndex}].choices`,
		keyName: answerValue ? 'defaultID' : 'id',
	});

	return (
		<Box>
			<Controller
				as={<RadioGroup />}
				name={`questions[${questionIndex}].answer`}
				control={control}
				rules={{ required: true }}
				defaultValue={answerValue}
			>
				<Grid my='10px' templateColumns='repeat(2, 1fr)' gap='5px'>
					{fields.map((choice, index) => {
						let ID;
						if (choice?.id) {
							ID = choice.id;
						} else {
							ID = choice.defaultID;
						}
						return (
							<Box key={ID}>
								<input
									type='hidden'
									ref={register({
										name: `questions[${questionIndex}].choices[${index}].id`,
										value: ID,
									})}
								/>
								<Input
									ref={register({ required: true })}
									name={`questions[${questionIndex}].choices[${index}].value`}
									type='text'
									defaultValue={choice.value}
									placeholder='type the choice here'
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
										<Radio
											value={ID}
											colorScheme='green'
											isInvalid={
												errors.questions?.[questionIndex]?.answer ? true : false
											}
										>
											correct answer
										</Radio>
									</Flex>
									<IconButton
										icon={<MdDelete />}
										size='sm'
										color='red.300'
										onClick={() => remove(index)}
									/>
								</Flex>
							</Box>
						);
					})}
				</Grid>
			</Controller>
			{errors.questions?.[questionIndex]?.answer && (
				<Text>Please include the answer</Text>
			)}
			<Button size='xs' onClick={() => append({ value: '' })}>
				add choice
			</Button>
		</Box>
	);
};

const QuestionArray = ({ control, register, getValues, errors }) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'questions',
	});

	return (
		<Stack spacing={10}>
			{fields.map((question, index) => {
				return (
					<Flex bg='white' key={question.id} p='10px'>
						<Box w='full'>
							<input
								type='hidden'
								ref={register({
									name: `questions[${index}].id`,
									value: question.id,
								})}
							/>
							<Input
								ref={register({ required: true })}
								name={`questions[${index}].question`}
								type='text'
								placeholder='type the question here'
								defaultValue={question.question}
							/>
							<ChoiceArray
								questionIndex={index}
								answerValue={question.answer}
								{...{ control, register, getValues, errors }}
							/>
							<Input
								ref={register()}
								name={`questions[${index}].explanation`}
								type='text'
								placeholder='type the explanation here'
								defaultValue={question.explanation}
							/>
						</Box>
						<Button size='xs' onClick={() => remove(index)}>
							x
						</Button>
					</Flex>
				);
			})}
			<Button
				size='xs'
				onClick={() =>
					append({
						question: '',
						answer: '',
						explanation: '',
						choices: [],
					})
				}
			>
				add question
			</Button>
		</Stack>
	);
};

const defaultValues = {
	questions: [
		{
			id: '',
			question: '',
			explanation: '',
			answer: '',
			choices: [],
		},
	],
	title: '',
	description: '',
};

const CreateQuizv2 = () => {
	const { register, handleSubmit, getValues, control, errors } = useForm({
		defaultValues,
	});
	const [values, setValues] = useState();
	const onSubmit = (data) => setValues(data);

	return (
		<Container>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					ref={register({ required: true })}
					name='title'
					type='text'
					placeholder='Type the Quiz title here...'
				/>
				<Input
					ref={register({ required: true })}
					name='description'
					type='text'
					placeholder='Type the description or the instructions of the quiz here..'
				/>
				<QuestionArray
					{...{
						control,
						register,
						defaultValues,
						getValues,
						errors,
					}}
				/>
				<Button type='submit'>submit</Button>
			</form>
			<pre>{JSON.stringify(values, null, 2)}</pre>
		</Container>
	);
};

export default CreateQuizv2;
