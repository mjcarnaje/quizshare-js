import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack } from '@chakra-ui/react';

const DashboardNavigation = ({ url }) => {
	const pathname = window.location.pathname;
	const path = pathname.substr(4);

	const [isActive, setIsActive] = useState(path);

	useEffect(() => {
		setIsActive(path);
	}, [path]);

	return (
		<Box px='10px'>
			<Stack spacing={0} rounded='md'>
				{['Profile', 'Quizzes'].map((item) => (
					<Box
						key={item}
						as={Link}
						px='10px'
						py='20px'
						fontFamily='inter'
						fontSize='17px'
						color='purple.600'
						fontWeight={
							isActive === item.toLowerCase() ||
							isActive.includes(item.toLowerCase())
								? 'semibold'
								: '300'
						}
						to={`${url}/${item.toLowerCase()}`}
						borderTopWidth='1px'
						borderRadius='8px'
						bg={
							isActive === item.toLowerCase() ||
							isActive.includes(item.toLowerCase())
								? 'white'
								: ''
						}
						_first={{ borderTopWidth: 0 }}
					>
						{item}
					</Box>
				))}
			</Stack>
		</Box>
	);
};

export default DashboardNavigation;
