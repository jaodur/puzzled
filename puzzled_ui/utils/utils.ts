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

export { arraySize, checkNull }
