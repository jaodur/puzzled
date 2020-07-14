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
    return (
        <>
            <symbol id={'JC6'} preserveAspectRatio="none" viewBox="0 0 1300 2000">
                <path
                    stroke="#44F"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    fill="none"
                    d="M524.94219,513.71628 570,540 696.32944,478.87285M61.131504,535.03979C54.178982,543.56322 55,548.2266 59.572437,555.45395M57.436923,562.74915c-6.952522,8.52343 -6.131504,13.18681 -1.559067,20.41416M54.358105,590.66376c-6.952522,8.52343 -6.131504,13.18681 -1.559067,20.41416M61.336759,615.49956c-6.952522,8.52343 -6.131504,13.18681 -1.559067,20.41416M35,540c-3.989188,5.32793 -1.136095,7.23471 0,10M34.178982,567.91461c-3.989188,5.32793 -1.136095,7.23471 0,10M31.510673,596.03448c-3.989188,5.32793 -1.136095,7.23471 0,10M31.305418,620.66502c-3.989188,5.32793 -1.136095,7.23471 0,10M60,505c5,5 -5,25 -5,25M395,250c15,-20 25,-20 40,-20 15,0 40,20 40,20M535,255c15,-20 27.85465,-25.69394 45,-25 12.00867,0.48604 30,15 30,15M430.14851,245.27223C433.13092,248.92766 435,254.1728 435,260c0,11.04569 -6.71573,20 -15,20 -8.28427,0 -15,-8.95431 -15,-20 0,-6.19035 2.1093,-11.72383 5.42187,-15.39242M573.02246,250.0676C574.28068,252.994 575,256.385 575,260c0,11.04569 -6.71572,20 -14.99999,20 -8.28426,0 -15.87081,-6.05157 -15.87081,-17.09726 0,-6.37213 2.235,-12.04825 5.71679,-15.71076M610,510l78.91137,-37.13476M615,500l69.81856,-32.85579M480,460c10.05839,-6.04941 25,0 35,5"
                />
                <use
                    xlinkHref={`#S${value}`}
                    height="75"
                    transform="translate(504,728)scale(1,0.963)rotate(0)translate(-37,-37)"
                />
                <use
                    xlinkHref={`#S${value}`}
                    height="75"
                    transform="translate(504,844)scale(1,0.963)rotate(0)translate(-37,-37)"
                />
                <use
                    xlinkHref={`#S${value}`}
                    height="75"
                    transform="translate(826,643)scale(1,0.963)rotate(0)translate(-37,-37)"
                />
            </symbol>
            {/*<symbol id="JD6" preserveAspectRatio="none" viewBox="0 0 1300 2000">*/}
            {/*    <path stroke="#44F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" fill="none"*/}
            {/*          d="M85,590c-4.700789,8.72507 -5.186787,17.0989 0,25M88.710078,621.88418c-4.700789,8.72507 -5.186787,17.0989 0,25M88.710078,656.88418c-4.700789,8.72507 -5.186787,17.0989 0,25M88.710078,686.88418c-4.700789,8.72507 -5.186787,17.0989 0,25M130,510c0,25 10,30 10,30M50.927687,597.4996c-1.13052,2.57966 -1.33893,5.77405 0,10M50.927687,630.52364c-1.13052,2.57966 -1.33893,5.77405 0,10M50.927687,664.9996c-1.13052,2.57966 -1.33893,5.77405 0,10M50.927687,700c-1.13052,2.57966 -1.33893,5.77405 0,10M50.927687,696.15932c-1.13052,2.57966 -1.33893,5.77405 0,10M725,500c25,-10 40,-10 50,-5M705,255c-30,-20 -60.95115,-7.27972 -90,15M785,275c24.49605,-30.28885 50.8757,-35.96138 70,-25M692.54026,258.60402c5.79878,4.0092 9.63542,10.97454 9.63542,18.89598 0,12.42641 -9.44135,22.5 -21.08785,22.5 -11.6465,0 -21.08785,-10.07359 -21.08785,-22.5 0,-3.28538 0.65995,-6.40629 1.84613,-9.22005M853.12381,261.7389c6.97583,3.39911 11.87622,11.41458 11.87622,20.7611 0,12.42641 -8.66208,22.5 -19.34729,22.5 -10.68521,0 -19.34729,-10.07359 -19.34729,-22.5 0,-3.81643 0.81704,-7.41094 2.25881,-10.55985M835,317.32348c11.29232,3.96884 26.09989,-0.36152 27.06897,-2.32348M517.96925,509.82169C557.53794,533.35836 604.4889,555.09153 650,555M525.36882,498.26604C565.47164,522.39165 613.48777,545.09355 660,545" />*/}
            {/*    <use xlinkHref={`#S${value}`} height="200"*/}
            {/*         transform="translate(650,1000)scale(1,0.963)rotate(0)translate(-100,-100)" stroke="#44F"*/}
            {/*         strokeWidth="36" strokeLinejoin="round" strokeLinecap="round" />*/}
            {/*    <use xlinkHref={`#S${value}`} height="50"*/}
            {/*         transform="translate(894,598)scale(1,0.963)rotate(-26)translate(-25,-25)" />*/}
            {/*    <use xlinkHref={`#S${value}`} height="50"*/}
            {/*         transform="translate(852,623)scale(1,0.963)rotate(-22)translate(-25,-25)" />*/}
            {/*    <use xlinkHref={`#S${value}`} height="50"*/}
            {/*         transform="translate(806,639)scale(1,0.963)rotate(-14)translate(-25,-25)" />*/}
            {/*    <use xlinkHref={`#S${value}`} height="50"*/}
            {/*         transform="translate(757,650)scale(1,0.963)rotate(-6)translate(-25,-25)" />*/}
            {/*    <use xlinkHref={`#S${value}`} height="50"*/}
            {/*         transform="translate(706,655)scale(1,0.963)rotate(0)translate(-25,-25)" />*/}
            {/*    <use xlinkHref={`#S${value}`}*/}
            {/*         transform="translate(656,653)scale(1,0.963)rotate(5)translate(-25,-25)" />*/}
            {/*    <use xlinkHref={`#S${value}`}*/}
            {/*         transform="translate(607,647)scale(1,0.963)rotate(10)translate(-25,-25)" />*/}
            {/*    <use xlinkHref={`#S${value}`}*/}
            {/*         transform="translate(560,637)scale(1,0.963)rotate(15)translate(-25,-25)" />*/}
            {/*</symbol>*/}

            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}1`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}1`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}2`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}2`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}3`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}3`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}4`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}5`} />
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
