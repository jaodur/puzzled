type SideTypes = 'left' | 'right' | 'top' | 'bottom';

interface TemporaryDrawerInterface {
    elements: Element[];
    side: SideTypes;
    open: boolean;
    toggleDrawer: (isOpen: boolean) => any;
}

export { TemporaryDrawerInterface };
