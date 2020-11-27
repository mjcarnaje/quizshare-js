import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { CgFileDocument } from 'react-icons/cg';
import { Link, NavLink } from 'react-router-dom';

const DashboardNavigation = ({ url }) => {
	return (
		<Box px='10px'>
			<Stack spacing={0} rounded='md'>
				{[
					['Profile', <BsFillPersonLinesFill />],
					['Quizzes', <CgFileDocument />],
				].map((item) => (
					<Box
						as={NavLink}
						key={item[0]}
						to={`${url}/${item[0].toLowerCase()}`}
						activeClassName='isActiveDashboard'
						px='10px'
						py='20px'
						fontFamily='inter'
						fontSize='17px'
						color='purple.600'
						borderTopWidth='1px'
						borderRadius='8px'
						_first={{ borderTopWidth: 0 }}
					>
						<Flex align='center'>
							{item[1]} <Text ml='10px'>{item[0]}</Text>
						</Flex>
					</Box>
				))}
			</Stack>
		</Box>
	);
};

export default DashboardNavigation;
