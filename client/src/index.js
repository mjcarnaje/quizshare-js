import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import customTheme from './theme';

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={customTheme}>
			<CSSReset />
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
