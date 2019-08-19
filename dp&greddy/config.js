const activities = [
    [1, 4],
    [3, 5],
    [0, 6],
    [5, 7],
    [3, 8],
    [5, 9],
    [6, 10],
    [8, 11],
    [8, 12],
    [2, 13],
    [12, 14],
]

function createTwoDimensionArr(size, init = 0) {

    let arr = []

    for (let i = 0; i < size; i++) {
        arr[i] = []
        for (let j = 0; j < size; j++) {
            arr[i][j] = init
        }
    }
    return arr
}


export {
    activities,
    createTwoDimensionArr
};
