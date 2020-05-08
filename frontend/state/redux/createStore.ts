import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import initialState from './initialState';
import rootReducer from './reducers';
import rootSaga from './sagas';

export default function configureReduxStore() {
    const sagaMiddleware = createSagaMiddleware();
    const middleware: any[] = [sagaMiddleware, thunk];

    // Be sure to ONLY add these middlewares in development!
    if (process.env.NODE_ENV !== 'production') {
        middleware.unshift(reduxImmutableStateInvariant());
    }

    const middlewareEnhancer = applyMiddleware(...middleware);
    const storeEnhancer = composeWithDevTools(middlewareEnhancer);
    const store = createStore(rootReducer, initialState, storeEnhancer);

    sagaMiddleware.run(rootSaga);

    return store;
}
