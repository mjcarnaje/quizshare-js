import React from 'react';
import { Avatar, Box, Heading } from '@chakra-ui/core';
import moment from 'moment';

const Card = () => {
	return (
		<Box w='400px' rounded='20px' boxShadow='sm' backgroundColor='white'>
			<Box padding='4px' display='flex' alignItems='start'>
				<Avatar
					size='sm'
					name='Michael James'
					src='https://bit.ly/kent-c-dodds'
				/>
				<Box>
					<Heading
						as='h3'
						size='xs'
						fontFamily='inter'
						marginLeft='6px'
						fontWeight='semibold'
						paddingY='2px'
					>
						Michael James
					</Heading>
					<Heading as='h6' size='4px' fontFamily='inter' color='gray.300'>
						{moment('2020-10-31T04:40:35.889+00:00').fromNow(true)}
					</Heading>
				</Box>
			</Box>
		</Box>
	);
};

export default Card;
