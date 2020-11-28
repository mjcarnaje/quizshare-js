import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				localStorage.getItem('token') ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	);
};

export default PrivateRoute;
