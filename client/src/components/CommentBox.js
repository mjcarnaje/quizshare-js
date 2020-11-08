import React from 'react';
import { Box, Avatar, Text, SlideIn } from '@chakra-ui/core';
import moment from 'moment';
import MenuButtons from './MenuButtons';
import { useSelector } from 'react-redux';

const CommentBox = ({
	commentData: {
		id,
		createdAt,
		body,
		author: { username, avatar, email },
	},
	quizId,
}) => {
	const user = useSelector((state) => state.auth.user);

	return (
		<>
			<SlideIn in={true}>
				{(styles) => (
					<Box
						my='10px'
						bg='white'
						borderRadius='8px'
						p='15px'
						display='flex'
						opacity={styles.opacity}
						boxShadow='sm'
						position='relative'
					>
						<Avatar name='Dan Abrahmov' src={`${avatar}`} />
						<Box ml='10px'>
							<Box display='flex' alignItems='center'>
								<Text fontFamily='inter' fontSize='17px' fontWeight='semibold'>
									{username}
								</Text>
								<Text
									ml='5px'
									fontFamily='inter'
									fontSize='14px'
									color='gray.600'
								>
									{email}
								</Text>
								<Text ml='5px' fontWeight='bold' color='gray.600'>
									&#183;
								</Text>
								<Text
									ml='5px'
									fontFamily='inter'
									fontSize='14px'
									color='gray.600'
								>
									{moment(createdAt).fromNow(true)}
								</Text>
							</Box>

							<Text fontFamily='inter' fontSize='18px'>
								{body}
							</Text>
						</Box>
						{user.username === username && (
							<Box ml='auto' position='absolute' right='4px' top='4px'>
								<MenuButtons deleteOnly commentId={id} quizId={quizId} />
							</Box>
						)}
					</Box>
				)}
			</SlideIn>
		</>
	);
};

export default CommentBox;
