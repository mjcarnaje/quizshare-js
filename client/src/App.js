import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import { Box } from '@chakra-ui/core';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleQuiz from './pages/SingleQuiz';

import PublicRoute from './utils/PublicRoute';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './pages/Dashboard';

import { useQuery } from '@apollo/client';
import { GET_USER } from './utils/graphql';
import { loadCurrentUser } from './store/authSlice';
import { useDispatch } from 'react-redux';
import CreateQuiz from './pages/CreateQuiz';

function App() {
	const dispatch = useDispatch();

	const { data: { currentUser } = {} } = useQuery(GET_USER);

	useEffect(() => {
		dispatch(loadCurrentUser(currentUser));
	}, [currentUser, dispatch]);

	return (
		<Router>
			<Header />
			<Box
				gridAutoColumns
				gridAutoRows
				display='grid'
				justifyItems='center'
				alignItems='center'
				minH='100vh'
				pt='4rem'
				bg='custombg'
			>
				<Switch>
					<Route exact path='/home' component={Home} />
					<Route exact path='/quiz/:id' component={SingleQuiz} />
					<Route exact path='/create-quiz' component={CreateQuiz} />
					<PrivateRoute path='/dashboard' component={Dashboard} />
					<PublicRoute exact path='/login' component={Login} />
					<PublicRoute exact path='/register' component={Register} />
				</Switch>
			</Box>
		</Router>
	);
}

export default App;
