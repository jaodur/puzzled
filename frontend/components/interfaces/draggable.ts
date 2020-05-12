import * as React from 'react';

type AxisType = 'both' | 'x' | 'y' | 'none';

type BoundsType = { left: number; top: number; right: number; bottom: number } | string;

interface PositionType {
    x: number;
    y: number;
}

export type DraggableEvent =
    | React.MouseEvent<HTMLElement | SVGElement>
    | React.TouchEvent<HTMLElement | SVGElement>
    | MouseEvent
    | TouchEvent;

export type DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => void | false;

export interface DraggableData {
    node: HTMLElement;
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
    lastX: number;
    lastY: number;
}

interface DraggableCoreInterface {
    allowAnyClick?: boolean;
    axis?: AxisType;
    bounds?: BoundsType;
    cancel?: string;
    defaultClassName?: string;
    defaultClassNameDragging?: string;
    defaultClassNameDragged?: string;
    defaultPosition?: PositionType;
    disabled?: boolean;
    grid?: [number, number];
    handle?: string;
    offsetParent?: HTMLElement;
    onMouseDown?: (event: MouseEvent) => void;
    onStart?: DraggableEventHandler;
    onDrag?: DraggableEventHandler;
    onStop?: DraggableEventHandler;
    position?: PositionType;
    positionOffset?: { x: number | string; y: number | string };
    scale?: number;
}

interface DraggableInterface extends DraggableCoreInterface {
    children: React.ReactElement;
    show: boolean;
}

export { DraggableInterface as default, DraggableCoreInterface };
