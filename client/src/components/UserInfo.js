import React from 'react';
import { Box, Flex, Text, Stack, Icon } from '@chakra-ui/core';

const UserInfo = () => {
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
					Name
				</Text>
				<Text py='16px' fontFamily='inter' color='purple.600' fontSize='15px'>
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
				<Text py='16px' fontFamily='inter' color='purple.600' fontSize='15px'>
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
				<Text py='16px' fontFamily='inter' color='purple.600' fontSize='15px'>
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
	);
};

export default UserInfo;
