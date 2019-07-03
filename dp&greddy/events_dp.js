const activities = [
    [1, 4],
    [3, 5],
    [0, 6],
    [5, 7],
    [3, 9],
    [5, 9],
    [6, 10],
    [8, 11],
    [8, 12],
    [2, 14],
    [12, 16],
]

// const activities = [
//     [1, 4],
//     [3, 5],
//     [0, 6],
//     [5, 7],
//     [3, 8],
//     [5, 9],
//     [6, 10],
//     [8, 11],
//     [8, 12],
//     [2, 13],
//     [12, 14],
// ]

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


/** 最大活动的数目 */
let arrSize = activities.length
let great = createTwoDimensionArr()
let solution = createTwoDimensionArr()
let border = createTwoDimensionArr()

// size_t dealGreatActivitySelector(std::vector<pair<int , int> > & activities , int left , int right);
// size_t great[MAX_ACTIVITY_NUM][MAX_ACTIVITY_NUM];//用来存储i到j的最大子集数目
// size_t solution[MAX_ACTIVITY_NUM][MAX_ACTIVITY_NUM];//用来存储选择
// pair<int , int> border[MAX_ACTIVITY_NUM][MAX_ACTIVITY_NUM];//用来存储边界值


/**
 * 最大的兼容子集
 * @param  activities 活动的链表，已经按照结束时间的先后顺序拍好了
 * @return            返回最大兼容的数量
 */
function greateActivitySelector(activities) {
    if (!arrSize) return 0;
    dealGreatActivitySelector(activities, 0, arrSize - 1);
    return great[0][arrSize - 1];
}

/**
 * 实际处理最大兼容子集的函数
 * @param  activities 活动
 * @param  left       左边界
 * @param  right      右边界
 * @return            left到right的最大兼容子集数
 */
function dealGreatActivitySelector(activities, left, right) {
    // console.log("left")
    // console.log(left)
    // console.log('right')
    // console.log(right)

    // debugger
    if (left > right)
        return 0;




    // 只有一个活动
    if (left == right) {
        great[left][right] = 1;
        solution[left][right] = left;
        return 1;
    }
    if (great[left][right] != 0)
        return great[left][right];// 之前已经算过
    //求解过程
    let max = 0;
    let pos = left;
    let borderTemp = []
    // pair<int , int> borderTemp;

    for (let i = left; i <= right; ++i) {
        // console.log("index")
        // console.log(i)
        ////////////////////////////
        //以i为基准，向两边找到不与i活动相交的集合 //
        ////////////////////////////
        let leftTemp = i;
        let rightTemp = i;

        /** 找到左边界 */
        while (leftTemp >= left && activities[leftTemp][1] > activities[i][0]) leftTemp--;

        /** 找到右边界 */
        while (rightTemp <= right && activities[rightTemp][0] < activities[i][1]) rightTemp++;

        // console.log("leftTemp")
        // console.log(leftTemp)
        // console.log('rightTemp')
        // console.log(rightTemp)

        let temp = dealGreatActivitySelector(activities, left, leftTemp) +
            dealGreatActivitySelector(activities, rightTemp, right) + 1;
        if (temp > max) {
            max = temp;
            pos = i;
            borderTemp = [leftTemp, rightTemp]
            // pair<let , let>(leftTemp , rightTemp);
        }
    }
    solution[left][right] = pos;
    border[left][right] = borderTemp;
    great[left][right] = max;
    // console.log(max)
    // console.log(solution)
    // console.log(border)
    console.log(great)
    return max;
}


function printSolution(left, right) {
    if (left > right)
        return;
    if (left == right) {
        console.log(`from ${left} to ${right} -----> ${solution[left][right]}`)

        // cout<<"from "<<left<<" to "<<right<<" -----> "<<solution[left][right]<<endl;
        return;
    }
    console.log(`from ${left} to ${right} -----> ${solution[left][right]}`)

    // cout<<"from "<<left<<" to "<<right<<" -----> "<<solution[left][right]<<endl;
    printSolution(left, border[left][right][0]);
    printSolution(border[left][right][1], right);
    return;
}

greateActivitySelector(activities)
printSolution(0 , arrSize-1);


/*
function main( argc, char const *argv[])
{
    std::vector<pair<int , int> > activities;

    cout<<"The max selectors is : "<<greateActivitySelector(activities)<<endl;
    printSolution(0 , arrSize-1);
    return 0;
}

*/


