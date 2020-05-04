import { ActionType } from 'typesafe-actions';

import * as actions from './actions';

type ChatAction = ActionType<typeof actions>;

interface ChatState {}

export { ChatAction, ChatState };
