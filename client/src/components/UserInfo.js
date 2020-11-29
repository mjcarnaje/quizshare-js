import {
	AspectRatio,
	Avatar,
	Box,
	Button,
	Center,
	Flex,
	Grid,
	Image,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import { FiUploadCloud } from 'react-icons/fi';

const UserInfo = ({ data: { username, email, avatar, cover }, isEdit }) => {
	return (
		<Box pb='16px'>
			<Box p='5px'>
				<AspectRatio ratio={16 / 5}>
					{cover ? (
						<Image src={cover} objectFit='cover' />
					) : (
						<Center w='full' h='full' bg='gray.100'>
							<Text
								fontFamily='inter'
								fontWeight='800'
								fontSize='30px'
								color='gray.700'
							>
								No cover photo yet.
							</Text>
						</Center>
					)}
				</AspectRatio>
			</Box>
			<Box px={{ base: '16px', md: '32px' }} pt={{ base: '8px', md: '16px' }}>
				<Grid templateColumns='1fr 3fr' gap={2} py='16px'>
					<Text fontFamily='inter' fontWeight='semibold' color='purple.600'>
						Profile Image
					</Text>
					<Box>
						<Avatar name={username} size='xl' src={avatar && avatar} />
					</Box>
				</Grid>
				<Grid templateColumns='1fr 3fr' gap={2} py='16px'>
					<Text fontFamily='inter' fontWeight='semibold' color='purple.600'>
						Username
					</Text>
					<Text fontFamily='inter' color='purple.600' fontSize='15px'>
						{username}
					</Text>
				</Grid>
				<Grid templateColumns='1fr 3fr' gap={2} py='16px'>
					<Text fontFamily='inter' fontWeight='semibold' color='purple.600'>
						Email
					</Text>
					<Text fontFamily='inter' color='purple.600' fontSize='15px'>
						{email}
					</Text>
				</Grid>
				<Grid templateColumns='1fr 3fr' gap={2} py='16px'>
					<Text fontFamily='inter' fontWeight='semibold' color='purple.600'>
						Password
					</Text>
					<Text fontFamily='inter' color='purple.600' fontSize='15px'>
						********
					</Text>
				</Grid>
			</Box>
		</Box>
	);
};

export default UserInfo;
