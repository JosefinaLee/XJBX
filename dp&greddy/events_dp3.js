// const activities = [
//     [0, 0],
//     [1, 4],
//     [3, 5],
//     [0, 6],
//     [5, 7],
//     [3, 9],
//     [5, 9],
//     [6, 10],
//     [8, 11],
//     [8, 12],
//     [2, 14],
//     [12, 16],
//     [Number.MAX_VALUE, 1]
// ]

/**
 * //算法导论中活动选择问题动态规划求解
 * @param s 活动的开始时间
 * @param f 活动的结束时间
 * @param n 活动数目
 * @return 最大兼容的活动个数
 */
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


function createTwoDimensionArr(size = arrSize, init = 0) {

    let arr = []

    for (let i = 0; i < size; i++) {
        arr[i] = []
        for (let j = 0; j < size; j++) {
            arr[i][j] = init
        }
    }
    return arr
}

function convert(activities) {
    return [
        [0, 0],
        ...activities,
        [Number.MAX_VALUE, 1]
    ]
}


let arrSize = activities.length
let c = createTwoDimensionArr(arrSize + 2)


function maxCompatiableActivity(activities, n) {

    activities = convert(activities)

    for (let j = 0; j <= n + 1; j++)
        for (let i = n + 1; i >= j; i--)
            c[i][j] = 0;//if i>=j S(i,j)是空集合

    let maxTemp = 0;
    for (let j = 1; j <= n + 1; j++) {
        for (let i = 0; i < j; i++) {//i < j
            for (let k = i + 1; k < j; k++) {// i< k <j
                if (activities[k][0] >= activities[i][1] && activities[k][1] <= activities[j][0]) {//S(i,j)不空

                    if (c[i][k] + c[k][j] + 1 > maxTemp) {
                        maxTemp = c[i][k] + c[k][j] + 1;
                    }
                }
            }
            c[i][j] = maxTemp;
            maxTemp = 0;
        }
    }
    return c[0][n + 1];
}

maxCompatiableActivity(activities, arrSize)

















