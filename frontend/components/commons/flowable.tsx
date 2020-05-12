import * as React from 'react';

import { OVERFLOW_CONTAINER, OVERFLOW_CONTENT, OVERFLOW_CONTENT_WRAPPER } from '../../constants/flowable';
import { FlowableInterface } from '../interfaces/flowable';

function Flowable({ children, styleClass, scrollContainerId }: FlowableInterface) {
    return (
        <div className={OVERFLOW_CONTENT_WRAPPER}>
            <div className={OVERFLOW_CONTAINER} id={scrollContainerId}>
                <div className={`${OVERFLOW_CONTENT} ${styleClass || ''}`}>{children}</div>
            </div>
        </div>
    );
}

export { Flowable };
