type SideTypes = 'left' | 'right' | 'top' | 'bottom';

interface TemporaryDrawerInterface {
    side: SideTypes;
    open: boolean;
    toggleDrawer: (isOpen: boolean) => any;
}

export { TemporaryDrawerInterface };
