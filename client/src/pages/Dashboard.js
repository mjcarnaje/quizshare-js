import { Box, Grid } from '@chakra-ui/react';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import DashboardNavigation from '../components/DashboardNavigation';
import MyProfile from './MyProfile';
import MyQuizzes from './MyQuizzes';

const Dashboard = () => {
	let { url } = useRouteMatch();

	return (
		<Box w='full' h='full'>
			<Box w='full' bg='white' py='24px' px='10px'>
				<DashboardHeader />
			</Box>
			<Grid w='full' py='24px' px='44px' templateColumns='1fr 3fr'>
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
