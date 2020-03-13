import * as React from 'react';

import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';

import { TemporaryDrawer } from '../commons/drawer';

const defaultDrawerStyle = 'default-drawer';
const defaultDrawerOpenStyle = 'default-drawer-open';

function DrawerContainer() {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDrawer = (isOpen: boolean) => (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsOpen(isOpen);
    };
    return (
        <>
            <div className={isOpen ? defaultDrawerOpenStyle : defaultDrawerStyle} onClick={toggleDrawer(!isOpen)}>
                {isOpen ? <ArrowRight /> : <ArrowLeft />}
            </div>
            <TemporaryDrawer elements={[]} side={'right'} open={isOpen} toggleDrawer={toggleDrawer} />
        </>
    );
}

export { DrawerContainer };
