import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './store/store';
import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloProvider,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import theme from './theme';

const httpLink = createHttpLink({
	uri: 'https://quizshare-server.herokuapp.com/',
});

const setAutherizationLink = setContext(() => {
	const token = localStorage.getItem('token');
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: setAutherizationLink.concat(httpLink),
	cache: new InMemoryCache(),
	connectToDevTools: true,
});

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<ApolloProvider client={client}>
				<Provider store={store}>
					<App />
				</Provider>
			</ApolloProvider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
