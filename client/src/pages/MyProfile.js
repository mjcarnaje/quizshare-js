import React from 'react';
import { Avatar, Box, Divider, Flex, Icon, Stack, Text } from '@chakra-ui/core';
import { useSelector } from 'react-redux';

const MyProfile = () => {
	const { avatar, username, email } = useSelector((state) => state.auth.user);

	return (
		<>
			<Stack spacing={4}>
				<Box bg='white' borderRadius='8px' boxShadow='sm'>
					<Box py='16px' px='24px'>
						<Text
							fontFamily='inter'
							fontWeight='bold'
							fontSize='18px'
							color='purple.600'
						>
							Account
						</Text>
					</Box>
					<Divider my='0px' />
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
								<Avatar name={username && username} src={avatar && avatar} />
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
							<Text
								py='16px'
								fontFamily='inter'
								color='purple.600'
								fontSize='15px'
							>
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
							<Text
								py='16px'
								fontFamily='inter'
								color='purple.600'
								fontSize='15px'
							>
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
							<Text
								py='16px'
								fontFamily='inter'
								color='purple.600'
								fontSize='15px'
							>
								********
							</Text>
						</Flex>
					</Box>
				</Box>
				<Box bg='white' borderRadius='8px' boxShadow='sm'>
					<Box py='16px' px='24px'>
						<Text
							fontFamily='inter'
							fontWeight='bold'
							fontSize='18px'
							color='purple.600'
						>
							User Information
						</Text>
					</Box>
					<Divider my='0px' />
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
								Name
							</Text>
							<Text
								py='16px'
								fontFamily='inter'
								color='purple.600'
								fontSize='15px'
							>
								Michael James Carnaje
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
								Birthday
							</Text>
							<Text
								py='16px'
								fontFamily='inter'
								color='purple.600'
								fontSize='15px'
							>
								June 1, 2003
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
								Country
							</Text>
							<Text
								py='16px'
								fontFamily='inter'
								color='purple.600'
								fontSize='15px'
							>
								Philippines
							</Text>
						</Flex>
						<Flex alignItems='flex-start' py='16px'>
							<Text
								w='190px'
								y='16px'
								pr='12px'
								fontFamily='inter'
								fontWeight='semibold'
								color='purple.600'
							>
								Social Media
							</Text>
							<Stack spacing={4}>
								<Stack isInline spacing={6} alignItems='center'>
									<Icon name='facebook' size='36px' color='#3b5999' />
									<Text fontFamily='inter'>facebook.com/mj.carnaje</Text>
								</Stack>
								<Stack isInline spacing={6} alignItems='center'>
									<Icon name='twitter' size='36px' color='#55acee' />
									<Text fontFamily='inter'>twitter.com/carnajeeed</Text>
								</Stack>
								<Stack isInline spacing={6} alignItems='center'>
									<Box
										p='5px'
										borderRadius='10px'
										background='linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'
									>
										<Icon name='instagram' size='26px' color='#fff' />
									</Box>
									<Text fontFamily='inter'>instagram.com/mj.carnaje</Text>
								</Stack>
								<Stack isInline spacing={6} alignItems='center'>
									<Icon name='youtube' size='36px' color='#cd201f' />
									<Text fontFamily='inter'>youtube.com/mjcarnaje</Text>
								</Stack>
							</Stack>
						</Flex>
					</Box>
				</Box>
			</Stack>
		</>
	);
};

export default MyProfile;
