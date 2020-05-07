import * as React from 'react';
import ReactDraggable from 'react-draggable';

import { DEFAULT_DRAGGABLE_CLASSNAME, DEFAULT_DRAGGABLE_HANDLE } from '../../constants/draggable';
import DraggableInterface from '../interfaces/draggable';

function Draggable({ children, ...draggableProps }: DraggableInterface) {
    if (!draggableProps.defaultClassName) {
        draggableProps.defaultClassName = DEFAULT_DRAGGABLE_CLASSNAME;
    }
    draggableProps.handle = !!draggableProps.handle ? draggableProps.handle : DEFAULT_DRAGGABLE_HANDLE.IDENTIFIER;

    return draggableProps.show ? (
        <ReactDraggable {...draggableProps}>
            <div style={{ display: 'inline-block', width: 'auto' }}>{children}</div>
        </ReactDraggable>
    ) : (
        <></>
    );
}

export { Draggable };
