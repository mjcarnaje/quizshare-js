import { Box, Button, Center, Container, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
import NotFoundSVG from '../assets/svg/404.svg';

const NotFound = () => {
	return (
		<Container maxW='6xl' p='30px'>
			<Center flexDirection={['column', 'row']}>
				<Box textAlign={{ base: 'center', md: 'left' }}>
					<Text
						fontFamily='inter'
						fontWeight='800'
						fontSize={{ base: '56px', lg: '78px' }}
						color='gray.700'
						lineHeight='1.1'
					>
						Sorry, this page isn't available
					</Text>
					<Text
						fontFamily='inter'
						fontWeight='600'
						fontSize={{ base: '16px', lg: '18px' }}
						color='gray.700'
						mt='20px'
					>
						The page you were looking for coudn't be found.
					</Text>

					<Button
						variant='ghost'
						colorScheme='purple'
						as={Link}
						to='/home'
						mt='10px'
					>
						Go back to home page
					</Button>
				</Box>
				<Box p={{ base: '30px', md: '10px' }}>
					<Image maxW='full' src={NotFoundSVG} objectFit='cover' />
				</Box>
			</Center>
		</Container>
	);
};

export default NotFound;
