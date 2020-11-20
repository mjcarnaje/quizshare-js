import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { CgFileDocument } from 'react-icons/cg';

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
				{[
					['Profile', <BsFillPersonLinesFill />],
					['Quizzes', <CgFileDocument />],
				].map((item) => (
					<Flex
						align='center'
						key={item[0]}
						as={Link}
						px='10px'
						py='20px'
						fontFamily='inter'
						fontSize='17px'
						color='purple.600'
						fontWeight={
							isActive === item[0].toLowerCase() ||
							isActive.includes(item[0].toLowerCase())
								? 'semibold'
								: '300'
						}
						to={`${url}/${item[0].toLowerCase()}`}
						borderTopWidth='1px'
						borderRadius='8px'
						bg={
							isActive === item[0].toLowerCase() ||
							isActive.includes(item[0].toLowerCase())
								? 'white'
								: ''
						}
						_first={{ borderTopWidth: 0 }}
					>
						{item[1]} <Text ml='10px'>{item[0]}</Text>
					</Flex>
				))}
			</Stack>
		</Box>
	);
};

export default DashboardNavigation;
