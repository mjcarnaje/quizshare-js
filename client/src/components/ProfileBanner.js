import React from 'react';
import { Avatar, Box, Text, Button } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileBanner = () => {
	const { avatar, username, email } = useSelector((state) => state.auth.user);

	return (
		<Box
			w='95%'
			m='auto'
			display='flex'
			alignItems='center'
			justifyContent='space-between'
			py='24px'
			px='10px'
		>
			<Box display='flex' alignItems='center'>
				<Avatar name={username && username} src={avatar && avatar} />
				<Box ml='15px'>
					<Text
						fontFamily='inter'
						fontWeight='bold'
						fontSize='20px'
						color='blue.900'
					>
						{username && username}
					</Text>
					<Text
						fontFamily='inter'
						fontSize='14px'
						fontWeight='300'
						color='gray.700'
						lineHeight='1'
					>
						{email && email}
					</Text>
				</Box>
			</Box>
		</Box>
	);
};

export default ProfileBanner;
