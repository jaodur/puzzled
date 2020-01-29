interface ButtonInterface {
    label: string;
    onBtnClick?: (event: any) => any;
    disabled?: boolean;
    styleClass?: string;
}

interface LinkButtonInterface extends ButtonInterface {
    href: string;
}

export { ButtonInterface, LinkButtonInterface };
