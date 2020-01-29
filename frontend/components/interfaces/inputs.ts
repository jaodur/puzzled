interface InputInterface {
    label: string;
    value: string;
    disabled?: boolean;
    styleClass?: string;
}

interface LinearInputInterface extends InputInterface {
    onChange?: (event: any) => any;
}

interface StackedInputInterface extends InputInterface {
    onChange?: (event: any) => any;
}

export { LinearInputInterface, StackedInputInterface };
