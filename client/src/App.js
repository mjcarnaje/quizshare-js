import { useQuery } from '@apollo/client';
import { Grid } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CreateUpdateQuiz from './pages/CreateUpdateQuiz';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleQuiz from './pages/SingleQuiz';
import TakeQuiz from './pages/TakeQuiz';
import { loadCurrentUser } from './store/authSlice';
import { GET_USER } from './utils/graphql';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

function App() {
	const dispatch = useDispatch();

	const { data: { currentUser } = {} } = useQuery(GET_USER);

	useEffect(() => {
		dispatch(loadCurrentUser(currentUser));
	}, [currentUser, dispatch]);

	return (
		<Router>
			<Header />
			<Grid placeItems='center' minH='100vh' bg='custombg' pt='4rem'>
				<Switch>
					<Route exact path='/home' component={Home} />
					<Route exact path='/create-quiz' component={CreateUpdateQuiz} />
					<Route exact path='/quiz/edit/:id' component={CreateUpdateQuiz} />
					<Route exact path='/quiz/:id' component={SingleQuiz} />
					<Route exact path='/quiz/take/:id' component={TakeQuiz} />
					<PrivateRoute path='/dashboard' component={Dashboard} />
					<PublicRoute exact path='/login' component={Login} />
					<PublicRoute exact path='/register' component={Register} />
				</Switch>
			</Grid>
		</Router>
	);
}

export default App;
