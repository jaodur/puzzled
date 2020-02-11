interface InputInterface {
    label: string;
    value?: string;
    disabled?: boolean;
    styleClass?: string;
    onClick?: (event: any) => any;
    type?: string;
}

interface LinearInputInterface extends InputInterface {
    onChange?: (event: any) => any;
}

interface StackedInputInterface extends InputInterface {
    defaultValue?: string;
    errorMsg?: string;
    onChange?: (event: any) => any;
}

export { LinearInputInterface, StackedInputInterface };
