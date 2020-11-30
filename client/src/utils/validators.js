import { createStandaloneToast } from '@chakra-ui/react';

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
