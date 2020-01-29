interface ButtonInterface {
    label: string;
    onBtnClick?: (event: any) => any;
    disabled?: boolean;
    styleClass?: string;
}

export { ButtonInterface }