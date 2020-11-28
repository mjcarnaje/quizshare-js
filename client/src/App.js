import { useQuery } from '@apollo/client';
import { Container, Grid } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import './App.css';
import { loadCurrentUser } from './store/authSlice';

import Header from './components/Header';
import CreateUpdateQuiz from './pages/CreateUpdateQuiz';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleQuiz from './pages/SingleQuiz';
import TakeQuiz from './pages/TakeQuiz';
import ProfileUser from './pages/ProfileUser';

import { GET_USER } from './utils/graphql';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import NotFound from './pages/NotFound';
import Users from './pages/Users';

function App() {
	const dispatch = useDispatch();

	const { data: { currentUser } = {} } = useQuery(GET_USER);

	useEffect(() => {
		dispatch(loadCurrentUser(currentUser));
	}, [currentUser, dispatch]);

	return (
		<Router>
			<Header />
			<Grid placeItems='center' minH='100vh' bg='custombg' pt='64px'>
				<Switch>
					<Route exact path='/'>
						<Redirect to='/home' />
					</Route>
					<Route exact path='/home' component={Home} />
					<Route exact path='/users' component={Users} />
					<Route exact path='/quiz/:id' component={SingleQuiz} />
					<PrivateRoute
						exact
						path='/create-quiz'
						component={CreateUpdateQuiz}
					/>
					<PrivateRoute
						exact
						path='/quiz/edit/:id'
						component={CreateUpdateQuiz}
					/>
					<PrivateRoute exact path='/quiz/take/:id' component={TakeQuiz} />
					<Route exact path='/user/:id' component={ProfileUser} />
					<PrivateRoute path='/dashboard' component={Dashboard} />
					<PublicRoute exact path='/login' component={Login} />
					<PublicRoute exact path='/register' component={Register} />
					<Route component={NotFound} />
				</Switch>
			</Grid>
		</Router>
	);
}

export default App;
