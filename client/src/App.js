import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { Box } from '@chakra-ui/core';

function App() {
	return (
		<Router>
			<Header />
			<Box bg='blue.50' minHeight='100vh' pt='4rem' paddingX='4rem'>
				<Switch>
					<Route exact path='/home' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
				</Switch>
			</Box>
		</Router>
	);
}

export default App;
