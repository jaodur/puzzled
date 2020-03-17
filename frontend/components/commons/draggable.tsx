import * as React from 'react';
import ReactDraggable from 'react-draggable';

import DraggableInterface from '../interfaces/draggable';

function Draggable({ render, ...draggableProps }: DraggableInterface) {
    return (
        <ReactDraggable {...draggableProps}>
            <div style={{ display: 'inline-block', width: 'auto' }}>{render()}</div>
        </ReactDraggable>
    );
}

export { Draggable };
