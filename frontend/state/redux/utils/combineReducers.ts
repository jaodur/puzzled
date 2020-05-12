import { AppReducer } from '../types';

export type ReducerMap<S extends {}> = { [K in keyof S]: AppReducer<S[K]> };

// See: https://github.com/reduxjs/redux/issues/2750
const combineReducers = <S extends {}>(reducers: ReducerMap<S>): AppReducer<S> => {
    const reducerKeys = Object.keys(reducers) as Array<keyof S>;

    return (state = {} as S, action) => {
        let hasChanged = false;
        const nextState = {} as S;
        for (const key of reducerKeys) {
            const reducer = reducers[key as keyof typeof reducers];
            const prevStateForKey = state[key];
            const nextStateForKey = reducer(prevStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== prevStateForKey;
        }
        return hasChanged ? nextState : state;
    };
};
export { combineReducers as default };
