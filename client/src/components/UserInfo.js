import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Stack, Icon, Button } from '@chakra-ui/core';

const UserInfo = ({ profileData, setIsEditUserInfo }) => {
	const [values, setValues] = useState({
		firstName: null,
		lastName: null,
		birthday: null,
		country: null,
		facebook: null,
		twitter: null,
		instagram: null,
		youtube: null,
	});

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (profileData) {
			const profileInputs = { ...values };

			for (const i in profileData) {
				if (i in profileInputs) profileInputs[i] = profileData[i];
			}

			for (const i in profileData.social) {
				if (i in profileInputs) profileInputs[i] = profileData.social[i];
			}

			setValues(profileInputs);
		}
	}, [profileData]);

	const {
		firstName,
		lastName,
		birthday,
		country,
		facebook,
		twitter,
		instagram,
		youtube,
	} = values;
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
					{!firstName && !lastName ? (
						<Button
							variant='ghost'
							onClick={() => setIsEditUserInfo(true)}
							variantColor='purple'
							size='sm'
						>
							Add name
						</Button>
					) : (
						`${firstName || ''} ${lastName || ''}`
					)}
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
					{!birthday ? (
						<Button
							variant='ghost'
							onClick={() => setIsEditUserInfo(true)}
							variantColor='purple'
							size='sm'
						>
							Add birthday
						</Button>
					) : (
						birthday
					)}
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
					{country ? country : 'Philippines'}
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

						{facebook ? (
							<Text fontFamily='inter'>{facebook}</Text>
						) : (
							<Button
								variant='ghost'
								onClick={() => setIsEditUserInfo(true)}
								variantColor='purple'
								size='sm'
							>
								Add facebook information
							</Button>
						)}
					</Stack>
					<Stack isInline spacing={6} alignItems='center'>
						<Icon name='twitter' size='36px' color='#55acee' />
						{twitter ? (
							<Text fontFamily='inter'>{twitter}</Text>
						) : (
							<Button
								variant='ghost'
								onClick={() => setIsEditUserInfo(true)}
								variantColor='purple'
								size='sm'
							>
								Add twitter information
							</Button>
						)}
					</Stack>
					<Stack isInline spacing={6} alignItems='center'>
						<Box
							p='5px'
							borderRadius='10px'
							background='linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'
						>
							<Icon name='instagram' size='26px' color='#fff' />
						</Box>
						{instagram ? (
							<Text fontFamily='inter'>{instagram}</Text>
						) : (
							<Button
								variant='ghost'
								onClick={() => setIsEditUserInfo(true)}
								variantColor='purple'
								size='sm'
							>
								Add instagram information
							</Button>
						)}
					</Stack>
					<Stack isInline spacing={6} alignItems='center'>
						<Icon name='youtube' size='36px' color='#cd201f' />
						{youtube ? (
							<Text fontFamily='inter'>{youtube}</Text>
						) : (
							<Button
								variant='ghost'
								onClick={() => setIsEditUserInfo(true)}
								variantColor='purple'
								size='sm'
							>
								Add youtube information
							</Button>
						)}
					</Stack>
				</Stack>
			</Flex>
		</Box>
	);
};

export default UserInfo;
