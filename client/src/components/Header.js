import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Spacer,
	Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GoHome } from 'react-icons/go';
import { MdCreateNewFolder } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import UserDropDown from './UserDropDown';

const MenuItems = ({ children, to, icon }) => (
	<Box
		as={NavLink}
		to={to}
		activeClassName='isActive'
		className='headerLinks'
		mr='30px'
		_hover={{ bg: 'gray.100' }}
		px='10px'
		borderRadius='30px'
	>
		<Center>
			<Box mr='8px'>{icon}</Box>
			<Text display='block' fontFamily='inter'>
				{children}
			</Text>
		</Center>
	</Box>
);

const Header = (props) => {
	const isAuth = useSelector((state) => state.auth.user);
	const [show, setShow] = useState(false);

	return (
		<Flex
			as='nav'
			align='center'
			justify='space-between'
			wrap='wrap'
			height='4rem'
			paddingY='.75rem'
			paddingX='2rem'
			width='100%'
			shadow='sm'
			color='purple.500'
			position='fixed'
			top='0'
			bg='white'
			zIndex='1000'
		>
			<Link to='/home'>
				<Heading as='h1' size='lg' fontWeight='sm' fontFamily='berkshire'>
					QuizShare
				</Heading>
			</Link>
			<Spacer />
			<MenuItems to='/home' icon={<GoHome />}>
				Home
			</MenuItems>
			<MenuItems to='/create-quiz' icon={<MdCreateNewFolder />}>
				Create Quiz
			</MenuItems>

			<Box display='block' width='auto' fontFamily='inter'>
				{isAuth ? (
					<UserDropDown />
				) : (
					<>
						<Link to='/register'>
							<Button
								bg='transparent'
								border='1px'
								fontSize='15px'
								mt={{ base: 4, md: 0 }}
								mr={6}
								padding='1rem'
								size='sm'
							>
								Sign Up
							</Button>
						</Link>
						<Link to='/login'>
							<Button
								bg='transparent'
								border='1px'
								fontSize='15px'
								mt={{ base: 4, md: 0 }}
								mr={6}
								padding='1rem'
								size='sm'
							>
								Log in
							</Button>
						</Link>
					</>
				)}
			</Box>
		</Flex>
	);
};

export default Header;
