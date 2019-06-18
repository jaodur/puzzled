import * as React from "react";

export interface HelloProps {
    // appName: string;
    // frameworkName: string;
    // numberOfComponent: number;
}

export interface HelloState {
}

//'HelloProps' describes the shape of props.
//'HelloState' describes the shape of state.
export class Hello extends React.Component<HelloProps, HelloState> {
    render(): Array<JSX.Element> {
        return [
            <h1>React TypeScript!</h1>
        ]
    }
}
