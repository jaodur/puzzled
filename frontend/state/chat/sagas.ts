import { call, takeEvery } from 'redux-saga/effects';

import { ADD_MESSAGE_MUTATION } from '../../graphql/mutations/chat';
import { graphqlMutate } from '../../lib/api/graphqlHttp';
import { ADD_CHAT_MESSAGE_SUCCESS } from './actions';
import { ChatAction } from './types';

function* addMessage({ payload: { channelId, message: msg } }: ChatAction) {
    const { message } = msg;
    yield call(graphqlMutate, ADD_MESSAGE_MUTATION, { channelId, message });
}

function* chatSaga() {
    yield takeEvery(ADD_CHAT_MESSAGE_SUCCESS, addMessage);
}

export { chatSaga as default };
