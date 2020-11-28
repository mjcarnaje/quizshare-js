import { Box, Button, Center, Container, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
import NotFoundSVG from '../assets/svg/404.svg';

const NotFound = () => {
	return (
		<Container maxW='6xl'>
			<Center>
				<Box>
					<Text
						fontFamily='inter'
						fontWeight='800'
						fontSize='78px'
						color='gray.700'
						mt='20px'
						lineHeight='1.1'
					>
						Sorry, this page isn't available
					</Text>
					<Text
						fontFamily='inter'
						fontWeight='600'
						fontSize='18px'
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

				<Image h='300px' src={NotFoundSVG} objectFit='cover' />
			</Center>
		</Container>
	);
};

export default NotFound;
