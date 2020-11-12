import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
	Box,
	Button,
	Divider,
	FormControl,
	FormHelperText,
	FormLabel,
	Grid,
	Input,
	PseudoBox,
	Radio,
	Stack,
	Text,
	Textarea,
} from '@chakra-ui/core';

const CreateQuiz = () => {
	return (
		<Box w='full' minH='full'>
			<Text
				textAlign='center'
				fontFamily='montserrat'
				fontWeight='800'
				color='gray.700'
				fontSize='44px'
				py='30px'
			>
				Create an interactive quiz
			</Text>
			<Box m='auto' bg='white' w='60%' boxShadow='sm' p='24px' rounded='md'>
				<FormControl>
					<FormLabel
						htmlFor='title'
						fontFamily='inter'
						fontSize='15px'
						fontWeight='semibold'
						color='gray.700'
					>
						Title
					</FormLabel>
					<Input
						type='text'
						id='title'
						placeholder='Type your Quiz Title'
						focusBorderColor='purple.500'
						fontWeight='semi-bold'
						fontFamily='inter'
						fontSize='24px'
						size='lg'
					/>
				</FormControl>
				<Divider my='15px' />
				<FormControl>
					<FormLabel
						htmlFor='description'
						fontFamily='poppins'
						fontSize='15px'
						fontWeight='semibold'
						color='gray.700'
					>
						Description
					</FormLabel>
					<Textarea
						id='description'
						placeholder='Type your Quiz Description'
						focusBorderColor='purple.500'
						fontFamily='inter'
						fontSize='18px'
						size='lg'
					/>
				</FormControl>
				<Divider my='15px' />
				<Text
					fontFamily='poppins'
					fontSize='15px'
					fontWeight='semibold'
					color='gray.700'
					my='8px'
				>
					Questions
				</Text>
				<Stack spacing={4}>
					<Box p='10px' rounded='md' border='1px' borderColor='gray.200'>
						<Box>
							<FormControl>
								<Input
									type='text'
									placeholder='Type your Question'
									focusBorderColor='purple.500'
									fontFamily='inter'
								/>
							</FormControl>
						</Box>
						<Grid templateColumns='repeat(2, 1fr)' gap={4} mt={3}>
							<FormControl>
								<Input
									type='text'
									placeholder='Type your answer'
									focusBorderColor='purple.500'
									fontFamily='inter'
								/>
								<PseudoBox display='flex' pt='7px'>
									<Text ml='auto' mr='5px' fontFamily='inter' fontSize='14px'>
										correct answer
									</Text>
									<Radio name='1' variantColor='green' />
								</PseudoBox>
							</FormControl>
							<FormControl>
								<Input
									type='text'
									placeholder='new answer'
									focusBorderColor='purple.500'
									fontFamily='inter'
								/>
								<PseudoBox display='flex' pt='7px'>
									<Text ml='auto' mr='5px' fontFamily='inter' fontSize='14px'>
										correct answer
									</Text>
									<Radio name='1' variantColor='green' />
								</PseudoBox>
							</FormControl>
						</Grid>
					</Box>
				</Stack>
				<Button variantColor='purple' size='lg' w='full' my='10px'>
					Add Question
				</Button>
			</Box>
		</Box>
	);
};

export default CreateQuiz;
