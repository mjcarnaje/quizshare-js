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

const UserDropDown = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	return (
		<>
			<Menu>
				<MenuButton>
					<Avatar
						size='sm'
						name={user.username}
						src={user.avatar ? user.avatar : 'https://bit.ly/broken-link'}
					/>
				</MenuButton>
				<MenuList>
					<MenuGroup>
						<MenuItem> Profile</MenuItem>
					</MenuGroup>
					<MenuDivider />
					<MenuItem as='button' onClick={() => dispatch(logoutUser())}>
						Logout
					</MenuItem>
				</MenuList>
			</Menu>
		</>
	);
};

export default UserDropDown;
