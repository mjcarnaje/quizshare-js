import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from '@chakra-ui/react';

const pixelRatio = window.devicePixelRatio || 1;

const Testing = () => {
	const [originalPic, setUpOriginalPic] = useState(null);
	const [upImg, setUpImg] = useState();

	const imgRef = useRef(null);
	const previewCanvasRef = useRef(null);

	const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
	const [completedCrop, setCompletedCrop] = useState(null);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const onSelectFile = (e) => {
		const oneIsSelected = e.target.files && e.target.files.length > 0;
		if (oneIsSelected) {
			const reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onloadend = () => {
				setUpImg(reader.result);
				setUpOriginalPic(reader.result);
				onOpen();
			};
		}
	};

	const onLoad = useCallback((img) => {
		imgRef.current = img;
	}, []);

	useEffect(() => {
		if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
			return;
		}

		const image = imgRef.current;
		const canvas = previewCanvasRef.current;
		const crop = completedCrop;

		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		const ctx = canvas.getContext('2d');

		canvas.width = crop.width * pixelRatio;
		canvas.height = crop.height * pixelRatio;

		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		ctx.imageSmoothingQuality = 'high';

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		);
		const base64Image = canvas.toDataURL('image/jpeg');
	}, [completedCrop]);

	return (
		<div className='App'>
			<div>
				<input type='file' accept='image/*' onChange={onSelectFile} />
			</div>
			<Modal
				isCentered
				onClose={onClose}
				isOpen={isOpen}
				motionPreset='slideInBottom'
				size='xl'
			>
				<ModalOverlay />
				<ModalContent>
					<ModalBody p='12px'>
						<ReactCrop
							src={upImg}
							onImageLoaded={onLoad}
							crop={crop}
							onChange={(c) => setCrop(c)}
							onComplete={(c) => setCompletedCrop(c)}
						/>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='purple' mr={3} onClick={onClose}>
							Close
						</Button>
						<Button
							variant='ghost'
							onClick={() => {
								console.log(previewCanvasRef);
								setUpImg(null);
								onClose();
							}}
						>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<button
				onClick={() => {
					setUpImg(originalPic);
					onOpen();
				}}
			>
				edit
			</button>
			<div>
				<canvas
					ref={previewCanvasRef}
					// Rounding is important so the canvas width and height matches/is a multiple for sharpness.
					style={{
						width: Math.round(completedCrop?.width ?? 0),
						height: Math.round(completedCrop?.height ?? 0),
					}}
				/>
			</div>
		</div>
	);
};

export default Testing;
