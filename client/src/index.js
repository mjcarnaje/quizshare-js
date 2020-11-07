import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import customTheme from './theme';
import { Provider } from 'react-redux';
import store from './store/store';
import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloProvider,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
	uri: 'http://localhost:4000',
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
		<ThemeProvider theme={customTheme}>
			<CSSReset />
			<ApolloProvider client={client}>
				<Provider store={store}>
					<App />
				</Provider>
			</ApolloProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
