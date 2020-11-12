import React from 'react';
import {
	Avatar,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuGroup,
	MenuDivider,
} from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { Link } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

const UserDropDown = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const client = useApolloClient();

	return (
		<>
			<Menu>
				<MenuButton>
					<Avatar
						size='sm'
						name={user.username}
						src={user.avatar ? user.avatar : ''}
					/>
				</MenuButton>
				<MenuList>
					<MenuGroup>
						<MenuItem as={Link} to='/dashboard/profile'>
							Profile
						</MenuItem>
						<MenuItem as={Link} to='/dashboard/quizzes'>
							Quizzes
						</MenuItem>
					</MenuGroup>
					<MenuDivider />
					<MenuItem
						as='button'
						onClick={() => {
							client.clearStore();
							dispatch(logoutUser());
						}}
					>
						Logout
					</MenuItem>
				</MenuList>
			</Menu>
		</>
	);
};

export default UserDropDown;
