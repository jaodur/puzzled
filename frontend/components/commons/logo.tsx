import * as React from 'react';
import { TextLink } from './links';
import { links } from './linkUrls';

function Logo() {
    return (
        <div className="logo">
            <TextLink text={'Puzzled'} link={links.HOME} styleClass={'link__no-style'} />
        </div>
    );
}

export { Logo };
