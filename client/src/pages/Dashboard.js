import React from 'react';
import MyProfile from './MyProfile';
import MyQuizzes from './MyQuizzes';
import { Box } from '@chakra-ui/core';
import SettingNavigation from '../components/SettingNavigation';
import ProfileBanner from '../components/ProfileBanner';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useRouteMatch,
} from 'react-router-dom';
import EditProfile from '../components/AccountInfoEdit';

const Dashboard = () => {
	let { path, url } = useRouteMatch();

	return (
		<Box w='full' h='full'>
			<Box w='full' bg='white'>
				<ProfileBanner />
			</Box>
			<Box w='full'>
				<Box
					w='95%'
					m='auto'
					py='24px'
					px='10px'
					display='grid'
					gridTemplateColumns='1fr 3fr'
				>
					<SettingNavigation url={url} />
					<Box>
						<Switch>
							<Route exact path='/me/profile' component={MyProfile} />
							<Route exact path='/me/profile/edit' component={EditProfile} />
							<Route exact path='/me/quizzes' component={MyQuizzes} />
						</Switch>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
