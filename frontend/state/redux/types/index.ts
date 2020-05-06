import { Action } from 'redux';

import { ProfileInterface } from '../../../components/interfaces/profile';
import { ChatAction, ChatStateInterface } from '../../chat';
import { UserProfilesAction } from '../../userProfile';

/** A union type of every action that may be dispatched to the app's Redux store */
type AppAction = UserProfilesAction | ChatAction;

/** A reducer that manages a slice of state given any AppAction */
type AppReducer<S, A extends Action = AppAction> = (state: S | undefined, action: A) => S;

type ReducerHandler<S, A extends Action = AppAction> = (state: S | undefined, action: A) => S;

interface ReducerHandlers<S, A extends Action = AppAction> {
    [key: string]: ReducerHandler<S, A>;
}

interface AppState {
    userProfiles: ProfileInterface[];
    chat: ChatStateInterface;
}

type getAppStateInterface = () => AppState;

export { AppAction, AppReducer, AppState, getAppStateInterface, ReducerHandler, ReducerHandlers };
