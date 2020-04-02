import * as React from 'react';
import ReactDraggable from 'react-draggable';

import DraggableInterface from '../interfaces/draggable';

const defaultDraggableClassName = 'default-react-draggable';

function Draggable({ children, ...draggableProps }: DraggableInterface) {
    if (!draggableProps.defaultClassName) {
        draggableProps.defaultClassName = defaultDraggableClassName;
    }

    return (
        <ReactDraggable {...draggableProps}>
            <div style={{ display: 'inline-block', width: 'auto' }}>{children}</div>
        </ReactDraggable>
    );
}

export { Draggable };
