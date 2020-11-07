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

function App() {
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
					<PrivateRoute exact path='/quiz/:id' component={SingleQuiz} />
					<PublicRoute exact path='/login' component={Login} />
					<PublicRoute exact path='/register' component={Register} />
				</Switch>
			</Box>
		</Router>
	);
}

export default App;
