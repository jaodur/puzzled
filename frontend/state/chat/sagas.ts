import { call, takeEvery } from 'redux-saga/effects';

import { ADD_MESSAGE_MUTATION } from '../../graphql/mutations/chat';
import { CHAT_CHANNEL_SUBSCRIPTION } from '../../graphql/subscriptions/chat';
import { graphqlMutate, graphqlSubscribe } from '../../lib/api/graphqlHttp';
import { ADD_CHAT_MESSAGE_SUCCESS, SET_CURRENT_CHANNEL_SUCCESS } from './actions';
import { ChatAction } from './types';

function* subscribeToChannel(action: any) {
    console.log(action);
    const channelObservable = yield call(graphqlSubscribe, CHAT_CHANNEL_SUBSCRIPTION, { chatChannelId });
    yield call(channelObservable.subscribe, {
        next(data: any) {
            console.log('data', data);
        },
        error(err: any) {
            console.error('err', err);
        },
    });
}

function* addMessage({ payload: { channelId, message: msg } }: ChatAction) {
    const { message } = msg;
    yield call(graphqlMutate, ADD_MESSAGE_MUTATION, { channelId, message });
}

function* chatSaga() {
    yield takeEvery(SET_CURRENT_CHANNEL_SUCCESS, subscribeToChannel);
    yield takeEvery(ADD_CHAT_MESSAGE_SUCCESS, addMessage);
}

export { chatSaga as default };
