import * as React from 'react';

import { MainContentInterface } from '../interfaces/interfaces';

function MainContent({ className, children }: MainContentInterface) {
    return <div className={className || 'main-content'}>{children}</div>;
}

export { MainContent };
