import { useApolloClient } from '@apollo/client';
import {
	Avatar,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../store/authSlice';

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
