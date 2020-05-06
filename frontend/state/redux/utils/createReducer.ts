import produce, { Draft } from 'immer';
import { Action } from 'redux';

import { AppAction, AppReducer, ReducerHandler, ReducerHandlers } from '../types';

const createReducer = <S, A extends Action = AppAction>(
    getDefaultState: () => S,
    handlers: ReducerHandlers<Draft<S>, A>
): AppReducer<S, A> => {
    return (state: S = getDefaultState(), action: A) => {
        // See if a handler for this action type was provided
        const handler = (handlers as any)[action.type] as ReducerHandler<Draft<S>, A> | undefined;

        if (handler) {
            return produce<S>(state, draftSate => {
                return handler(draftSate, action);
            });
        }
        return state;
    };
};

export { createReducer as default };
