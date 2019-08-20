import * as _ from "lodash";

function arraySize(ar: any[]){
    var row_count = ar.length;
    var row_sizes = [];
    for(var i=0;i<row_count;i++){
        row_sizes.push(ar[i].length)
    }
    return [row_count, Math.min.apply(null, row_sizes)]
}

function checkNull(value: any){
    if(isNaN(value)){
        return 0
    }
    return value
}

function uniqueArray(arr: Array<Array<number>>) {
    function uniqueOnly([row, col]: Array<number>){
        return `${row}${col}`;
    }
    return _.uniqBy(arr, uniqueOnly)
}

function removeFromArray(arr: Array<Array<number>>, item: Array<number>){
    let [row, col] = item;
    _.remove(arr, ([x, y]) => x === row && y === col);
}

function getGridCoords(row: number, col: number, refNumber: number){
    let rowStart: number = Math.floor(row / refNumber) * refNumber;
    let colStart: number = Math.floor(col / refNumber) * refNumber;
    
    return [rowStart, colStart]
}

function removeFromGrid(coords: number[], refNumber: number, innerGrid: number[][], rowArr: number[], colArr: any){
    let [ row, col ] = coords;
    let [ rowStart, colStart ] = getGridCoords(row, col, refNumber);
    let [ rowGrid, colGrid ] = [checkNull(row % rowStart), checkNull(col % colStart)];
    innerGrid = Array.from(innerGrid);
    rowArr = Array.from(rowArr);
    colArr = Array.from(colArr);

    innerGrid[rowGrid][colGrid] = 100;
    rowArr[col] = 100;
    colArr[row] = 100;

    return _.concat(
        _.flattenDeep(innerGrid),
        rowArr,
        colArr
    );

}

export { arraySize, checkNull, uniqueArray, removeFromArray, getGridCoords, removeFromGrid }
