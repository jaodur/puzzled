import * as _ from 'lodash';

function arraySize(ar: any[]) {
    const rowCount = ar.length;
    const rowSizes = [];
    for (let i = 0; i < rowCount; i++) {
        rowSizes.push(ar[i].length);
    }
    return [rowCount, Math.min.apply(null, rowSizes)];
}

function uniqueArray(arr: number[][]) {
    function uniqueOnly([row, col]: number[]) {
        return `${row}${col}`;
    }
    return _.uniqBy(arr, uniqueOnly);
}

function removeFromArray(arr: number[][], item: number[]) {
    const [row, col] = item;
    _.remove(arr, ([x, y]) => x === row && y === col);
}

function getGridCoords(row: number, col: number, refNumber: number) {
    const rowStart: number = Math.floor(row / refNumber) * refNumber;
    const colStart: number = Math.floor(col / refNumber) * refNumber;

    return [rowStart, colStart];
}

function modulus(numerator: number, denominator: number) {
    const mod = numerator % denominator;
    if (isNaN(mod)) {
        return numerator;
    }

    return mod;
}

function removeFromGrid(coords: number[], refNumber: number, innerGrid: number[][], rowArr: number[], colArr: any) {
    const [row, col] = coords;
    const [rowStart, colStart] = getGridCoords(row, col, refNumber);
    const [rowGrid, colGrid] = [modulus(row, rowStart), modulus(col, colStart)];
    innerGrid = Array.from(innerGrid);
    rowArr = Array.from(rowArr);
    colArr = Array.from(colArr);

    innerGrid[rowGrid][colGrid] = 0;
    rowArr[col] = 0;
    colArr[row] = 0;

    return _.concat(_.flattenDeep(innerGrid), rowArr, colArr);
}

function noop() {}

function renderElement(element: JSX.Element): any {
    return () => element;
}

function deepCopy(object: any) {
    const output: any = Array.isArray(object) ? [] : object === null ? null : {};
    let v: any;
    let key: any;

    for (key in object) {
        v = object[key];
        output[key] = typeof v === 'object' ? deepCopy(v) : v;
    }
    return output;
}

function pad(input: any, length: number, padChar: string = '0', padLeft: boolean = true) {
    if (padLeft) {
        return `${input}`.padStart(length, padChar);
    }
    return `${input}`.padEnd(length, padChar);
}

function between(value: number, min: number, max: number) {
    return value >= min && value < max;
}

function checkEmpty(value: string) {
    return !!value ? value[0] : '';
}

function isCleanForm(initialState: object, state: object) {
    return _.isEqual(initialState, state);
}

function stripTrailingSlash(url: string) {
    return url.replace(/\/$/, '');
}

export {
    noop,
    arraySize,
    modulus,
    uniqueArray,
    removeFromArray,
    getGridCoords,
    removeFromGrid,
    renderElement,
    deepCopy,
    pad,
    between,
    checkEmpty,
    isCleanForm,
    stripTrailingSlash,
};
