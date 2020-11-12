import React from 'react';
import MyProfile from './MyProfile';
import MyQuizzes from './MyQuizzes';
import { Box, Grid } from '@chakra-ui/core';
import DashboardNavigation from '../components/DashboardNavigation';
import DashboardHeader from '../components/DashboardHeader';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useRouteMatch,
	Redirect,
} from 'react-router-dom';
import EditProfile from '../components/UserInfoEdit';
import { useSelector } from 'react-redux';

const Dashboard = () => {
	let { url } = useRouteMatch();

	return (
		<Box w='full' h='full'>
			<Box w='full' bg='white' py='24px' px='10px'>
				<DashboardHeader />
			</Box>
			<Grid w='full' py='24px' px='32px' templateColumns='1fr 3fr'>
				<DashboardNavigation url={url} />
				<Switch>
					<Route exact path='/dashboard/profile' component={MyProfile} />
					<Route exact path='/dashboard/quizzes' component={MyQuizzes} />
				</Switch>
			</Grid>
		</Box>
	);
};

export default Dashboard;
