import React from 'react';
import { useField } from 'formik';
import TextareaAutosize from 'react-textarea-autosize';
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Textarea,
} from '@chakra-ui/react';

export const MyTextField = ({ nolabel, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<FormControl isInvalid={meta.error && meta.touched}>
			{!nolabel && (
				<FormLabel
					fontSize='13px'
					fontWeight='400'
					color='gray.700'
					fontFamily='inter'
					letterSpacing='1px'
					textTransform='uppercase'
				>
					{field.name}
				</FormLabel>
			)}
			<Input
				{...field}
				{...props}
				type='text'
				variant='flushed'
				fontFamily='inter'
				px='5px'
				autoFocus
				focusBorderColor='purple.400'
			/>
			<FormErrorMessage fontFamily='inter'>{meta.error}</FormErrorMessage>
		</FormControl>
	);
};

export const MyTextAreaField = ({ nolabel, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<FormControl isInvalid={meta.error && meta.touched}>
			{!nolabel && (
				<FormLabel
					fontSize='13px'
					fontWeight='400'
					color='gray.700'
					fontFamily='inter'
					letterSpacing='1px'
					textTransform='uppercase'
				>
					{field.name}
				</FormLabel>
			)}
			<Textarea
				{...field}
				{...props}
				type='text'
				variant='flushed'
				px='5px'
				fontFamily='inter'
				as={TextareaAutosize}
				focusBorderColor='purple.400'
			/>
			<FormErrorMessage fontFamily='inter'>{meta.error}</FormErrorMessage>
		</FormControl>
	);
};

export const MyChoiceField = ({ ...props }) => {
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
