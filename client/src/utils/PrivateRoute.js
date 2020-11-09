import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { user, isLoading } = useSelector((state) => state.auth);
	return (
		<Route
			{...rest}
			render={(props) =>
				!isLoading && !user ? (
					<Redirect to='/login' />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PrivateRoute;
