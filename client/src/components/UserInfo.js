import React from 'react';
import { Box, Flex, Text, Avatar } from '@chakra-ui/react';

const UserInfo = ({ data: { username, email, avatar } }) => {
	return (
		<Box py='16px' px='32px'>
			<Flex alignItems='center'>
				<Text
					w='190px'
					py='16px'
					pr='12px'
					fontFamily='inter'
					fontWeight='semibold'
					color='purple.600'
				>
					Profile Image
				</Text>
				<Box py='16px'>
					<Avatar
						name={username && username}
						size='xl'
						src={avatar && avatar}
					/>
				</Box>
			</Flex>
			<Flex alignItems='center'>
				<Text
					w='190px'
					y='16px'
					pr='12px'
					fontFamily='inter'
					fontWeight='semibold'
					color='purple.600'
				>
					Username
				</Text>
				<Text py='16px' fontFamily='inter' color='purple.600' fontSize='15px'>
					{username && username}
				</Text>
			</Flex>
			<Flex alignItems='center'>
				<Text
					w='190px'
					y='16px'
					pr='12px'
					fontFamily='inter'
					fontWeight='semibold'
					color='purple.600'
				>
					Email
				</Text>
				<Text py='16px' fontFamily='inter' color='purple.600' fontSize='15px'>
					{email && email}
				</Text>
			</Flex>
			<Flex alignItems='center'>
				<Text
					w='190px'
					y='16px'
					pr='12px'
					fontFamily='inter'
					fontWeight='semibold'
					color='purple.600'
				>
					Password
				</Text>
				<Text py='16px' fontFamily='inter' color='purple.600' fontSize='15px'>
					********
				</Text>
			</Flex>
		</Box>
	);
};

export default UserInfo;
