interface DropdownInterface {
    show?: boolean;
    toggleDropdown: any;
}

interface ProfileDropdownInterface extends DropdownInterface {
    value: string;
    setDropdownHeader: (value: string) => () => void;
}

export { DropdownInterface, ProfileDropdownInterface };
