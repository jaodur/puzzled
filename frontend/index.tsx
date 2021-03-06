import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import './styles/index';

import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import App from './app';
import { CustomSnackbarContentWrapper } from './components/commons/customSnackbar';
import { PuzzledProvider } from './components/commons/puzzleContext';
import graphqlClient from './lib/graphqlClient';
import checkLogin, { asyncSetLoginInfo, asyncUpdateLoginInfo } from './lib/session/checkLogin';
import { createReduxStore } from './state/redux';
import { materialUITheme } from './styles/themes/materialUI';

const checkloginInitalState = {
    checkLogin,
    asyncUpdateLoginInfo: asyncUpdateLoginInfo(checkLogin),
    asyncSetLoginInfo: asyncSetLoginInfo(checkLogin),
};

const store = createReduxStore();

ReactDOM.render(
    <ApolloProvider client={graphqlClient}>
        <ApolloHooksProvider client={graphqlClient}>
            <ReduxProvider store={store}>
                <ThemeProvider theme={materialUITheme}>
                    <PuzzledProvider checkLogin={checkloginInitalState}>
                        <SnackbarProvider
                            maxSnack={3}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            content={(key, message) => <CustomSnackbarContentWrapper id={key} message={message} />}>
                            <App />
                        </SnackbarProvider>
                    </PuzzledProvider>
                </ThemeProvider>
            </ReduxProvider>
        </ApolloHooksProvider>
    </ApolloProvider>,
    document.getElementById('react')
);
