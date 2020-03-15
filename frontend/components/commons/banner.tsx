import * as React from 'react';

import { BannerInterface } from '../interfaces/banner';

const smallBannerStyleClass = 'banner-sm';

function Banner({ small }: BannerInterface) {
    return <div className={small ? smallBannerStyleClass : ''}>puzzled</div>;
}

export { Banner };
