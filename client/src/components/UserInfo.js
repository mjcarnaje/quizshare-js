import {
	Avatar,
	Box,
	Flex,
	Text,
	AspectRatio,
	Image,
	Center,
	Button,
} from '@chakra-ui/react';
import React from 'react';
import { FiUploadCloud } from 'react-icons/fi';

const UserInfo = ({ data: { username, email, avatar, cover }, isEdit }) => {
	return (
		<Box pb='16px'>
			<Box
				role='group'
				px='5px'
				pt='5px'
				boxShadow='sm'
				position='relative'
				cursor='pointer'
			>
				<Box overflow='hidden' position='relative'>
					<Box
						position='absolute'
						top='0'
						left='0'
						w='full'
						h='full'
						transition='ease-in'
						transitionDuration='.2s'
						_groupHover={{ background: 'rgba(0, 0, 0, .3)' }}
						zIndex='10'
					></Box>
					<AspectRatio ratio={16 / 5}>
						<Image
							src={cover ? cover : 'https://bit.ly/naruto-sage'}
							alt='naruto'
							objectFit='cover'
							transform='scale(1.02)'
							transition='ease-in'
							transitionDuration='.2s'
							_groupHover={{ transform: 'scale(1)' }}
						/>
					</AspectRatio>
				</Box>
				<Box
					position='absolute'
					top='50%'
					left='50%'
					transform='translate(-50%, -50%)'
					display='none'
					_groupHover={{ display: 'block' }}
					zIndex='15'
				>
					<Button
						onClick={() => isEdit(true)}
						variant='ghost'
						colorScheme='purple'
						variant='solid'
						leftIcon={<FiUploadCloud />}
					>
						Cover photo
					</Button>
				</Box>
			</Box>
			<Box px='32px' pt='16px'>
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
		</Box>
	);
};

export default UserInfo;
