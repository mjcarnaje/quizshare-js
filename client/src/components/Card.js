import React from 'react';
import {
	Avatar,
	Box,
	Divider,
	Flex,
	Heading,
	Icon,
	PseudoBox,
	Stack,
	Text,
} from '@chakra-ui/core';
import moment from 'moment';

const Card = ({
	createdAt,
	avatar,
	username,
	title,
	description,
	likeCount,
}) => {
	return (
		<Box
			w='380px'
			rounded='8px'
			boxShadow='sm'
			backgroundColor='white'
			margin='10px'
			padding='8px'
			display='flex'
			flexDirection='column'
		>
			<Flex align='center' justify='space-between'>
				<Box padding='4px' display='flex' alignItems='center'>
					<Avatar name='Michael James' src={avatar} />
					<Box marginLeft='8px'>
						<Heading as='h2' size='sm' fontFamily='inter' fontWeight='semibold'>
							{username.toUpperCase()}
						</Heading>
						<Text
							fontSize='sm'
							fontFamily='inter'
							color='gray.300'
							lineHeight='1'
						>
							{moment(new Date(parseInt(createdAt)).toISOString()).fromNow(
								true
							)}
						</Text>
					</Box>
				</Box>
				<Heading
					as='h2'
					fontFamily='inter'
					color='gray.700'
					fontSize='20px'
					p='12px'
				>
					{title}
				</Heading>
			</Flex>
			<Box px='12px' py='5px'>
				<Text fontFamily='inter' fontSize='16px'>
					{description}
				</Text>
			</Box>
			<Box marginTop='auto' px='16px' display='flex' alignItems='center'>
				<PseudoBox
					as='div'
					display='flex'
					alignItems='center'
					marginX='16px'
					color='gray.600'
					_hover={{ color: 'red.500' }}
				>
					<PseudoBox
						as='div'
						_hover={{ bg: 'red.100' }}
						display='flex'
						alignItems='center'
						justifyContent='center'
						h={8}
						w={8}
						borderRadius={50}
					>
						<Icon
							name='heart-outline'
							size='18px'
							_hover={{ color: 'inherit' }}
						/>
					</PseudoBox>
					<Text
						fontFamily='inter'
						fontWeight='semibold'
						color='inherit'
						marginLeft='8px'
					>
						{likeCount}
					</Text>
				</PseudoBox>
				<PseudoBox
					as='div'
					display='flex'
					alignItems='center'
					marginX='16px'
					color='gray.600'
					_hover={{ color: 'blue.500' }}
				>
					<PseudoBox
						as='div'
						_hover={{ bg: 'blue.100' }}
						display='flex'
						alignItems='center'
						justifyContent='center'
						h={8}
						w={8}
						borderRadius={50}
					>
						<Icon name='comment' size='18px' _hover={{ color: 'inherit' }} />
					</PseudoBox>
					<Text
						fontFamily='inter'
						fontWeight='semibold'
						color='inherit'
						marginLeft='8px'
					>
						0
					</Text>
				</PseudoBox>
			</Box>
		</Box>
	);
};

export default Card;
