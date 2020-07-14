import * as React from 'react';

import { CardInterface } from '../../../interfaces/card';

function Ace({ value }: CardInterface) {
    return (
        <>
            <use xlinkHref={`#S${value}`} height="65" x="-32.5" y="-32.5" />
            <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
            <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            <g transform="rotate(180)">
                <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
                <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            </g>
        </>
    );
}

function Two({ value }: CardInterface) {
    return (
        <>
            <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
            <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            <use xlinkHref={`#S${value}`} height="65" x="-32.5" y="-133.084" />
            <g transform="rotate(180)">
                <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
                <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
                <use xlinkHref={`#S${value}`} height="65" x="-32.5" y="-133.084" />
            </g>
        </>
    );
}

function Three({ value }: CardInterface) {
    return (
        <>
            <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
            <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            <use xlinkHref={`#S${value}`} height="65" x="-32.5" y="-133.084" />
            <use xlinkHref={`#S${value}`} height="65" x="-32.5" y="-32.5" />
            <g transform="rotate(180)">
                <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
                <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
                <use xlinkHref={`#S${value}`} height="65" x="-32.5" y="-133.084" />
            </g>
        </>
    );
}

function Four({ value }: CardInterface) {
    return (
        <>
            <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
            <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-133.084" />
            <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-133.084" />
            <g transform="rotate(180)">
                <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
                <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
                <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-133.084" />
                <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-133.084" />
            </g>
        </>
    );
}

function Five({ value }: CardInterface) {
    return (
        <>
            <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
            <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-133.165" />
            <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-133.165" />
            <use xlinkHref={`#S${value}`} height="65" x="-32.5" y="-32.5" />
            <g transform="rotate(180)">
                <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
                <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
                <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-133.165" />
                <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-133.165" />
            </g>
        </>
    );
}

function Six({ value }: CardInterface) {
    return (
        <>
            <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
            <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-133.084" />
            <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-133.084" />
            <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-32.5" />
            <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-32.5" />
            <g transform="rotate(180)">
                <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
                <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
                <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-133.084" />
                <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-133.084" />
            </g>
        </>
    );
}

function Seven({ value }: CardInterface) {
    return (
        <>
            <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
            <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-133.165" />
            <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-133.165" />
            <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-32.5" />
            <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-32.5" />
            <use xlinkHref={`#S${value}`} height="65" x="-32.5" y="-82.832" />
            <g transform="rotate(180)">
                <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154">
                    {' '}
                    /
                </use>
                <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
                <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-133.165" />
                <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-133.165" />
            </g>
        </>
    );
}

function Eight({ value }: CardInterface) {
    return (
        <>
            <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
            <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-133.165" />
            <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-133.165" />
            <use xlinkHref={`#S${value}`} height="65" x="-32.5" y="-82.832" />
            <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-32.5" />
            <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-32.5" />
            <g transform="rotate(180)">
                <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
                <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
                <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-133.165" />
                <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-133.165" />
                <use xlinkHref={`#S${value}`} height="65" x="-32.5" y="-82.832" />
            </g>
        </>
    );
}

function Nine({ value }: CardInterface) {
    return (
        <>
            <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
            <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-133.165" />
            <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-133.165" />
            <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-66.055" />
            <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-66.055" />
            <use xlinkHref={`#S${value}`} height="65" x="-32.5" y="-39" />
            <g transform="rotate(180)">
                <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
                <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
                <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-133.165" />
                <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-133.165" />
                <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-66.055" />
                <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-66.055" />
            </g>
        </>
    );
}

function Ten({ value }: CardInterface) {
    return (
        <>
            <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
            <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-133.165" />
            <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-133.165" />
            <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-66.055" />
            <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-66.055" />
            <use xlinkHref={`#S${value}`} height="65" x="-32.5" y="-99.61" />
            <g transform="rotate(180)">
                <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
                <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
                <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-133.165" />
                <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-133.165" />
                <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-66.055" />
                <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-66.055" />
                <use xlinkHref={`#S${value}`} height="65" x="-32.5" y="-99.61" />
            </g>
        </>
    );
}

function Jack({ value }: CardInterface) {
    return value === 'JS' ? (
        <>
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}1`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}1`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}2`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}2`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}3`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}3`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}4`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}4`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}5`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}5`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}6`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}6`} />
            <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
            <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            <use xlinkHref={`#S${value}`} height="54.28" x="-89.483" y="-129.86" />
            <g transform="rotate(180)">
                <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
                <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
                <use xlinkHref={`#S${value}`} height="54.28" x="-89.483" y="-129.86" />
            </g>
            <use xlinkHref={`#X${value}`} stroke="#44F" fill="none" />
        </>
    ) : (
        <>
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}1`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}1`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}2`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}2`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}3`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}3`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}4`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}4`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}5`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}5`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}6`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}6`} />
            <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
            <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            <use xlinkHref={`#S${value}`} height="54.28" x="30.159" y="-129.86" />
            <g transform="rotate(180)">
                <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
                <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
                <use xlinkHref={`#S${value}`} height="54.28" x="30.159" y="-129.86" />
            </g>
            <use xlinkHref={`#X${value}`} stroke="#44F" fill="none" />
        </>
    );
}

function Queen({ value }: CardInterface) {
    return (
        <>
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}1`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}1`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}2`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}1`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}3`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}3`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}4`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}4`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}5`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}5`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}6`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}6`} />
            <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
            <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            <use xlinkHref={`#S${value}`} height="54.28" x="35.203" y="-129.86" />
            <g transform="rotate(180)">
                <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
                <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
                <use xlinkHref={`#S${value}`} height="54.28" x="35.203" y="-129.86" />
            </g>
            <use xlinkHref={`#X${value}`} stroke="#44F" fill="none" />
        </>
    );
}

function King({ value }: CardInterface) {
    return (
        <>
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}1`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}1`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}2`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}2`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}3`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}3`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}4`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}4`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}5`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}5`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}6`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}6`} />
            <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
            <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            <use xlinkHref={`#S${value}`} height="54.28" x="-84.439" y="-129.86" />
            <g transform="rotate(180)">
                <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
                <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
                <use xlinkHref={`#S${value}`} height="54.28" x="-84.439" y="-129.86" />
            </g>
            <use xlinkHref={`#X${value}`} stroke="#44F" fill="none" />
        </>
    );
}

const contentMapper: any = {
    A: (value: string) => <Ace value={value} />,
    2: (value: string) => <Two value={value} />,
    3: (value: string) => <Three value={value} />,
    4: (value: string) => <Four value={value} />,
    5: (value: string) => <Five value={value} />,
    6: (value: string) => <Six value={value} />,
    7: (value: string) => <Seven value={value} />,
    8: (value: string) => <Eight value={value} />,
    9: (value: string) => <Nine value={value} />,
    T: (value: string) => <Ten value={value} />,
    J: (value: string) => <Jack value={value} />,
    Q: (value: string) => <Queen value={value} />,
    K: (value: string) => <King value={value} />,
};

function cardContent(value: string) {
    value = value.toUpperCase();
    return contentMapper[value[0]](value);
}

export { cardContent };
