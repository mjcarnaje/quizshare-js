import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalOverlay,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const CropperModal = ({
	onClose,
	isOpen,
	previewPic,
	setPreviewPic,
	setCroppedPic,
	aspectRatio,
}) => {
	const [crop, setCrop] = useState({
		unit: '%',
		width: 100,
		aspect: aspectRatio,
	});

	const [completedCrop, setCompletedCrop] = useState(null);
	const imgRef = useRef(null);
	const onLoad = useCallback((img) => {
		imgRef.current = img;
	}, []);

	useEffect(() => {
		if (!completedCrop || !imgRef.current) {
			return;
		}
		const image = imgRef.current;
		const crop = completedCrop;
		const canvas = document.createElement('canvas');

		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		canvas.width = Math.ceil(crop.width * scaleX);
		canvas.height = Math.ceil(crop.height * scaleY);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width * scaleX,
			crop.height * scaleY
		);

		const base64Image = canvas.toDataURL('image/jpeg');
		setCroppedPic(base64Image);
	}, [completedCrop, previewPic]);
	return (
		<Modal
			isCentered
			onClose={() => {
				onClose();
				setPreviewPic(null);
				setCrop({ unit: '%', width: 100, aspect: aspectRatio });
			}}
			isOpen={isOpen}
			motionPreset='slideInBottom'
			size='xl'
		>
			<ModalOverlay />
			<ModalContent>
				<ModalBody p='12px' maxHeight='80vh' overflowY='auto'>
					<ReactCrop
						src={previewPic}
						onImageLoaded={onLoad}
						crop={crop}
						onChange={(c) => setCrop(c)}
						onComplete={(c) => setCompletedCrop(c)}
					/>
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme='purple'
						mr={3}
						onClick={() => {
							onClose();
							setPreviewPic(null);
							setCrop({ unit: '%', width: 100, aspect: aspectRatio });
						}}
					>
						Close
					</Button>
					<Button
						variant='ghost'
						onClick={() => {
							onClose();
							setPreviewPic(null);
							setCrop({ unit: '%', width: 100, aspect: aspectRatio });
						}}
					>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CropperModal;
