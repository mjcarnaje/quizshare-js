import { createStandaloneToast } from '@chakra-ui/react';
import * as yup from 'yup';

const imageType = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

const toast = createStandaloneToast();

export const validateImg = (imageFile) => {
	const notAnImage = !imageType.test(imageFile.name);
	if (notAnImage) {
		toast({
			title: 'An error occurred.',
			description: 'Please upload a valid image file.',
			status: 'error',
			duration: 5000,
			isClosable: true,
		});
		return;
	} else {
		return imageFile;
	}
};

export const quizValidationSchema = yup.object({
	title: yup.string().required(),
	description: yup.string().required(),
	questions: yup
		.array()
		.of(
			yup.object({
				id: yup.string(),
				question: yup.string().required(),
				choices: yup
					.array()
					.of(yup.object({ id: yup.string(), value: yup.string().required() })),
				answer: yup.string().required(),
			})
		)
		.required(),
});
