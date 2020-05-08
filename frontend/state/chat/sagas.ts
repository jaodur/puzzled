import { call, takeEvery } from 'redux-saga/effects';

import { ChatChannelInterface } from '../../components/interfaces/chat';
import { CHAT_CHANNEL_SUBSCRIPTION } from '../../graphql/subscriptions/chat';
import { graphqlSubscribe } from '../../lib/api/graphqlHttp';
import { SET_CURRENT_CHANNEL_SUCCESS } from './actions';

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

function* chatSaga() {
    yield takeEvery(SET_CURRENT_CHANNEL_SUCCESS, subscribeToChannel);
}

export { chatSaga as default };
