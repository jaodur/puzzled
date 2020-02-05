import * as React from 'react';
import { createContext, ReactElement, ReactNode, useContext } from 'react';

const PuzzledContext = createContext(null);

interface PuzzledProviderInterface {
    readonly children?: ReactNode;
    readonly checkLogin: any;
}

function PuzzledProvider({ checkLogin, children }: PuzzledProviderInterface): ReactElement {
    const contextValue = { checkLogin };

    return <PuzzledContext.Provider value={contextValue}>{children}</PuzzledContext.Provider>;
}

function useCheckLogin() {
    const { checkLogin } = useContext(PuzzledContext);

    if (!checkLogin) {
        throw new Error('Could not find "checkLogin" in the context. Wrap the root component in a <PuzzledProvider>');
    }

    return checkLogin;
}

export { PuzzledContext, PuzzledProvider, useCheckLogin };
