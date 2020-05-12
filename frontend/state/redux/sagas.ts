import { spawn } from 'redux-saga/effects';

import { chatSaga } from '../chat';

function* rootSaga() {
    yield spawn(chatSaga);
}

export { rootSaga as default };
