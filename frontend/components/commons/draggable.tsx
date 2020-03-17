import * as React from 'react';
import ReactDraggable from 'react-draggable';

import DraggableInterface from '../interfaces/draggable';

const defaultDraggableClassName = 'default-react-draggable';

function Draggable({ render, ...draggableProps }: DraggableInterface) {
    if (!draggableProps.defaultClassName) {
        draggableProps.defaultClassName = defaultDraggableClassName;
    }

    return (
        <ReactDraggable {...draggableProps}>
            <div style={{ display: 'inline-block', width: 'auto' }}>{render()}</div>
        </ReactDraggable>
    );
}

export { Draggable };
