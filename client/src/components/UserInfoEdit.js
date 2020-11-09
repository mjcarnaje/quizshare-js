import React from 'react';
import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Icon,
	Input,
	Select,
	Stack,
	Text,
} from '@chakra-ui/core';
import { useSelector } from 'react-redux';

const UserInfo = () => {
	const { avatar, username, email } = useSelector((state) => state.auth.user);

	return (
		<>
			<Box py='16px' px='32px'>
				<Flex w='60%'>
					<FormControl py='8px' mr='1'>
						<FormLabel
							htmlFor='firstName'
							fontFamily='inter'
							fontWeight='semibold'
							color='purple.600'
							fontSize='14px'
						>
							First name
						</FormLabel>
						<Input
							type='text'
							id='firstName'
							size='lg'
							fontFamily='inter'
							fontWeight='400'
							bg='gray.50'
							focusBorderColor='purple.500'
							placeholder='Enter first name'
						/>
					</FormControl>
					<FormControl py='8px' ml='1'>
						<FormLabel
							htmlFor='lastName'
							fontFamily='inter'
							fontWeight='semibold'
							color='purple.600'
							fontSize='14px'
						>
							Last name
						</FormLabel>
						<Input
							type='text'
							id='lastName'
							size='lg'
							fontFamily='inter'
							fontWeight='400'
							bg='gray.50'
							focusBorderColor='purple.500'
							placeholder='Enter last Name'
						/>
					</FormControl>
				</Flex>
				<FormControl py='8px'>
					<FormLabel
						htmlFor='birthday'
						fontFamily='inter'
						fontWeight='semibold'
						color='purple.600'
						fontSize='14px'
					>
						Birthday
					</FormLabel>
					<Input
						type='date'
						id='birthday'
						size='lg'
						fontFamily='inter'
						fontWeight='400'
						bg='gray.50'
						w='60%'
						focusBorderColor='purple.500'
						placeholder='Enter birthday'
					/>
				</FormControl>
				<FormControl py='8px'>
					<FormLabel
						htmlFor='country'
						fontFamily='inter'
						fontWeight='semibold'
						color='purple.600'
						fontSize='14px'
					>
						Country
					</FormLabel>
					<Select
						placeholder='Select country'
						w='60%'
						size='lg'
						fontFamily='inter'
						fontWeight='400'
						bg='gray.50'
						w='60%'
						focusBorderColor='purple.500'
					>
						<option value='Philippines'>Philippines</option>
						<option value='South Korea'>South Korea</option>
						<option value='Japan'>Japan</option>
					</Select>
				</FormControl>
				<Flex alignItems='flex-start' py='16px' w='60%'>
					<Stack spacing={4} w='full'>
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
						<Stack isInline spacing={6} alignItems='center'>
							<Icon name='facebook' size='36px' color='#3b5999' />
							<Input
								type='text'
								size='lg'
								fontFamily='inter'
								fontWeight='400'
								bg='gray.50'
								focusBorderColor='purple.500'
								placeholder='Enter facebook information'
							/>
						</Stack>
						<Stack isInline spacing={6} alignItems='center'>
							<Icon name='twitter' size='36px' color='#55acee' />
							<Input
								type='text'
								size='lg'
								fontFamily='inter'
								fontWeight='400'
								bg='gray.50'
								focusBorderColor='purple.500'
								placeholder='Enter twitter information'
							/>
						</Stack>
						<Stack isInline spacing={6} alignItems='center'>
							<Box
								p='5px'
								borderRadius='10px'
								background='linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'
							>
								<Icon name='instagram' size='26px' color='#fff' />
							</Box>
							<Input
								type='text'
								size='lg'
								fontFamily='inter'
								fontWeight='400'
								bg='gray.50'
								focusBorderColor='purple.500'
								placeholder='Enter instagram information'
							/>
						</Stack>
						<Stack isInline spacing={6} alignItems='center'>
							<Icon name='youtube' size='36px' color='#cd201f' />
							<Input
								type='text'
								size='lg'
								fontFamily='inter'
								fontWeight='400'
								bg='gray.50'
								focusBorderColor='purple.500'
								placeholder='Enter youtube information'
							/>
						</Stack>
					</Stack>
				</Flex>
				<Flex w='full' justifyContent='center' pt='20px'>
					<Button
						variant='outline'
						variantColor='purple'
						textAlign='center'
						my='auto'
						w='224px'
						h='54px'
					>
						Save
					</Button>
				</Flex>
			</Box>
		</>
	);
};

export default UserInfo;
