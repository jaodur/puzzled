import { ChatAction } from '../../chat/types';

/** A union type of every action that may be dispatched to the app's Redux store */
type AppAction = ChatAction;

/** A reducer that manages a slice of state given any AppAction */
type AppReducer<S, A extends AppAction = AppAction> = (state: S | undefined, action: A) => S;

interface AppState {}

export { AppAction, AppReducer, AppState };
