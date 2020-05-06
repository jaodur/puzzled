import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

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

/** The dependencies object that will be provided to redux-thunk */
interface AppDependencies {}

/** A dispatch function that accepts regular app actions as well as thunk actions */
type AppThunkDispatch = ThunkDispatch<AppState, AppDependencies, AppAction>;

interface AppState {
    userProfiles: ProfileInterface[];
    chat: ChatStateInterface;
}

type getAppStateInterface = () => AppState;

export { AppAction, AppReducer, AppState, AppThunkDispatch, getAppStateInterface, ReducerHandler, ReducerHandlers };
