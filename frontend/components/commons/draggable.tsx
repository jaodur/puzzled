import * as React from 'react';
import ReactDraggable from 'react-draggable';

import DraggableInterface from '../interfaces/draggable';

function Draggable({ render, ...draggableProps }: DraggableInterface) {
    return <ReactDraggable {...draggableProps}>{render}</ReactDraggable>;
}

export { Draggable };
