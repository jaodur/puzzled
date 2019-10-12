import * as React from 'react';
import { LogoInterface } from '../interfaces';
import { TextLink } from './links';

function Logo({ primaryLabel, secLabel }: LogoInterface) {
    return (
        <div className="logo">
            <TextLink text={primaryLabel.text} link={primaryLabel.href} styleClass={primaryLabel.style} />
            <span>
                <TextLink text={secLabel.text} link={secLabel.href} styleClass={secLabel.style} />
            </span>
        </div>
    );
}

export { Logo };
