import {
	Box,
	Button,
	Center,
	Flex,
	Grid,
	Icon,
	SimpleGrid,
	Stack,
	Text,
} from '@chakra-ui/react';
import React from 'react';

const ProfileInfo = ({
	data: {
		firstName,
		lastName,
		bio,
		birthday,
		country,
		social: { facebook, twitter, instagram, youtube },
	},
	isEdit,
}) => {
	return (
		<Box px={{ base: '16px', md: '32px' }} pt={{ base: '8px', md: '16px' }}>
			<Grid templateColumns='1fr 3fr' gap={2} py='16px'>
				<Text fontFamily='inter' fontWeight='semibold' color='purple.600'>
					Name
				</Text>
				<Text fontFamily='inter' color='purple.600' fontSize='15px'>
					{!firstName && !lastName ? (
						<Button
							variant='ghost'
							onClick={() => isEdit(true)}
							colorScheme='purple'
							size='sm'
						>
							Add name
						</Button>
					) : (
						`${firstName || ''} ${lastName || ''}`
					)}
				</Text>
			</Grid>
			<Grid templateColumns='1fr 3fr' gap={2} py='16px'>
				<Text fontFamily='inter' fontWeight='semibold' color='purple.600'>
					Name
				</Text>
				<Text fontFamily='inter' color='purple.600' fontSize='15px'>
					{!firstName && !lastName ? (
						<Button
							variant='ghost'
							onClick={() => isEdit(true)}
							colorScheme='purple'
							size='sm'
						>
							Add name
						</Button>
					) : (
						`${firstName || ''} ${lastName || ''}`
					)}
				</Text>
			</Grid>
			<Grid templateColumns='1fr 3fr' gap={2} py='16px'>
				<Text fontFamily='inter' fontWeight='semibold' color='purple.600'>
					Bio
				</Text>
				<Text fontFamily='inter' color='purple.600' fontSize='15px'>
					{bio ? bio : ''}
				</Text>
			</Grid>
			<Grid templateColumns='1fr 3fr' gap={2} py='16px'>
				<Text fontFamily='inter' fontWeight='semibold' color='purple.600'>
					Birthday
				</Text>
				<Text fontFamily='inter' color='purple.600' fontSize='15px'>
					{!birthday ? (
						<Button
							variant='ghost'
							onClick={() => isEdit(true)}
							colorScheme='purple'
							size='sm'
						>
							Add birthday
						</Button>
					) : (
						birthday
					)}
				</Text>
			</Grid>
			<Grid templateColumns='1fr 3fr' gap={2} py='16px'>
				<Text fontFamily='inter' fontWeight='semibold' color='purple.600'>
					Country
				</Text>
				<Text fontFamily='inter' color='purple.600' fontSize='15px'>
					{country ? country : 'Philippines'}
				</Text>
			</Grid>
			<Grid templateColumns='1fr 3fr' gap={2} py='16px'>
				<Text fontFamily='inter' fontWeight='semibold' color='purple.600'>
					Social Media
				</Text>
				<Stack spacing={4}>
					<Stack isInline spacing={6} alignItems='center'>
						<Icon
							viewBox='0 0 32 32'
							boxSize={{ base: '28px', md: '36px' }}
							color='#3b5999'
						>
							<path
								fill='currentColor'
								d='M29 0h-26c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h13v-14h-4v-4h4v-2c0-3.306 2.694-6 6-6h4v4h-4c-1.1 0-2 0.9-2 2v2h6l-1 4h-5v14h9c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3z'
							/>
						</Icon>
						{facebook ? (
							<Text
								fontFamily='inter'
								fontFamily={{ base: '14px', md: '16px' }}
							>
								{facebook}
							</Text>
						) : (
							<Button
								variant='ghost'
								onClick={() => isEdit(true)}
								colorScheme='purple'
								size='sm'
							>
								Add facebook information
							</Button>
						)}
					</Stack>
					<Stack isInline spacing={6} alignItems='center'>
						<Icon
							viewBox='0 0 32 32'
							boxSize={{ base: '28px', md: '36px' }}
							color='#55acee'
						>
							<path
								fill='currentColor'
								d='M32 7.075c-1.175 0.525-2.444 0.875-3.769 1.031 1.356-0.813 2.394-2.1 2.887-3.631-1.269 0.75-2.675 1.3-4.169 1.594-1.2-1.275-2.906-2.069-4.794-2.069-3.625 0-6.563 2.938-6.563 6.563 0 0.512 0.056 1.012 0.169 1.494-5.456-0.275-10.294-2.888-13.531-6.862-0.563 0.969-0.887 2.1-0.887 3.3 0 2.275 1.156 4.287 2.919 5.463-1.075-0.031-2.087-0.331-2.975-0.819 0 0.025 0 0.056 0 0.081 0 3.181 2.263 5.838 5.269 6.437-0.55 0.15-1.131 0.231-1.731 0.231-0.425 0-0.831-0.044-1.237-0.119 0.838 2.606 3.263 4.506 6.131 4.563-2.25 1.762-5.075 2.813-8.156 2.813-0.531 0-1.050-0.031-1.569-0.094 2.913 1.869 6.362 2.95 10.069 2.95 12.075 0 18.681-10.006 18.681-18.681 0-0.287-0.006-0.569-0.019-0.85 1.281-0.919 2.394-2.075 3.275-3.394z'
							/>
						</Icon>
						{twitter ? (
							<Text
								fontFamily='inter'
								fontFamily={{ base: '14px', md: '16px' }}
							>
								{twitter}
							</Text>
						) : (
							<Button
								variant='ghost'
								onClick={() => isEdit(true)}
								colorScheme='purple'
								size='sm'
							>
								Add twitter information
							</Button>
						)}
					</Stack>
					<Stack isInline spacing={6} alignItems='center'>
						<Center
							p='5px'
							borderRadius='10px'
							background='linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'
						>
							<Icon
								viewBox='0 0 32 32'
								boxSize={{ base: '18px', md: '26px' }}
								color='#fff'
							>
								<>
									<path
										fill='currentColor'
										d='M16 2.881c4.275 0 4.781 0.019 6.462 0.094 1.563 0.069 2.406 0.331 2.969 0.55 0.744 0.288 1.281 0.638 1.837 1.194 0.563 0.563 0.906 1.094 1.2 1.838 0.219 0.563 0.481 1.412 0.55 2.969 0.075 1.688 0.094 2.194 0.094 6.463s-0.019 4.781-0.094 6.463c-0.069 1.563-0.331 2.406-0.55 2.969-0.288 0.744-0.637 1.281-1.194 1.837-0.563 0.563-1.094 0.906-1.837 1.2-0.563 0.219-1.413 0.481-2.969 0.55-1.688 0.075-2.194 0.094-6.463 0.094s-4.781-0.019-6.463-0.094c-1.563-0.069-2.406-0.331-2.969-0.55-0.744-0.288-1.281-0.637-1.838-1.194-0.563-0.563-0.906-1.094-1.2-1.837-0.219-0.563-0.481-1.413-0.55-2.969-0.075-1.688-0.094-2.194-0.094-6.463s0.019-4.781 0.094-6.463c0.069-1.563 0.331-2.406 0.55-2.969 0.288-0.744 0.638-1.281 1.194-1.838 0.563-0.563 1.094-0.906 1.838-1.2 0.563-0.219 1.412-0.481 2.969-0.55 1.681-0.075 2.188-0.094 6.463-0.094zM16 0c-4.344 0-4.887 0.019-6.594 0.094-1.7 0.075-2.869 0.35-3.881 0.744-1.056 0.412-1.95 0.956-2.837 1.85-0.894 0.888-1.438 1.781-1.85 2.831-0.394 1.019-0.669 2.181-0.744 3.881-0.075 1.713-0.094 2.256-0.094 6.6s0.019 4.887 0.094 6.594c0.075 1.7 0.35 2.869 0.744 3.881 0.413 1.056 0.956 1.95 1.85 2.837 0.887 0.887 1.781 1.438 2.831 1.844 1.019 0.394 2.181 0.669 3.881 0.744 1.706 0.075 2.25 0.094 6.594 0.094s4.888-0.019 6.594-0.094c1.7-0.075 2.869-0.35 3.881-0.744 1.050-0.406 1.944-0.956 2.831-1.844s1.438-1.781 1.844-2.831c0.394-1.019 0.669-2.181 0.744-3.881 0.075-1.706 0.094-2.25 0.094-6.594s-0.019-4.887-0.094-6.594c-0.075-1.7-0.35-2.869-0.744-3.881-0.394-1.063-0.938-1.956-1.831-2.844-0.887-0.887-1.781-1.438-2.831-1.844-1.019-0.394-2.181-0.669-3.881-0.744-1.712-0.081-2.256-0.1-6.6-0.1v0z'
									></path>
									<path
										fill='currentColor'
										d='M16 7.781c-4.537 0-8.219 3.681-8.219 8.219s3.681 8.219 8.219 8.219 8.219-3.681 8.219-8.219c0-4.537-3.681-8.219-8.219-8.219zM16 21.331c-2.944 0-5.331-2.387-5.331-5.331s2.387-5.331 5.331-5.331c2.944 0 5.331 2.387 5.331 5.331s-2.387 5.331-5.331 5.331z'
									></path>
									<path
										fill='currentColor'
										d='M26.462 7.456c0 1.060-0.859 1.919-1.919 1.919s-1.919-0.859-1.919-1.919c0-1.060 0.859-1.919 1.919-1.919s1.919 0.859 1.919 1.919z'
									></path>
								</>
							</Icon>
						</Center>
						{instagram ? (
							<Text
								fontFamily='inter'
								fontFamily={{ base: '14px', md: '16px' }}
							>
								{instagram}
							</Text>
						) : (
							<Button
								variant='ghost'
								onClick={() => isEdit(true)}
								colorScheme='purple'
								size='sm'
							>
								Add instagram information
							</Button>
						)}
					</Stack>
					<Stack isInline spacing={6} alignItems='center'>
						<Icon
							viewBox='0 0 32 32'
							boxSize={{ base: '28px', md: '36px' }}
							color='#cd201f'
						>
							<path
								fill='currentColor'
								d='M31.681 9.6c0 0-0.313-2.206-1.275-3.175-1.219-1.275-2.581-1.281-3.206-1.356-4.475-0.325-11.194-0.325-11.194-0.325h-0.012c0 0-6.719 0-11.194 0.325-0.625 0.075-1.987 0.081-3.206 1.356-0.963 0.969-1.269 3.175-1.269 3.175s-0.319 2.588-0.319 5.181v2.425c0 2.587 0.319 5.181 0.319 5.181s0.313 2.206 1.269 3.175c1.219 1.275 2.819 1.231 3.531 1.369 2.563 0.244 10.881 0.319 10.881 0.319s6.725-0.012 11.2-0.331c0.625-0.075 1.988-0.081 3.206-1.356 0.962-0.969 1.275-3.175 1.275-3.175s0.319-2.587 0.319-5.181v-2.425c-0.006-2.588-0.325-5.181-0.325-5.181zM12.694 20.15v-8.994l8.644 4.513-8.644 4.481z'
							></path>
						</Icon>
						{youtube ? (
							<Text
								fontFamily='inter'
								fontFamily={{ base: '14px', md: '16px' }}
							>
								{youtube}
							</Text>
						) : (
							<Button
								variant='ghost'
								onClick={() => isEdit(true)}
								colorScheme='purple'
								size='sm'
							>
								Add youtube information
							</Button>
						)}
					</Stack>
				</Stack>
			</Grid>
		</Box>
	);
};

export default ProfileInfo;
