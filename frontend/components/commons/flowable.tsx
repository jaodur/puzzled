import * as React from 'react';

import { OVERFLOW_CONTAINER, OVERFLOW_CONTENT, OVERFLOW_CONTENT_WRAPPER } from '../../constants/flowable';
import { FlowableInterface } from '../interfaces/flowable';

function Flowable({ children, styleClass }: FlowableInterface) {
    return (
        <div className={OVERFLOW_CONTENT_WRAPPER}>
            <div className={OVERFLOW_CONTAINER}>
                <div className={OVERFLOW_CONTENT}>{children}</div>
            </div>
        </div>
    );
}

export { Flowable };
