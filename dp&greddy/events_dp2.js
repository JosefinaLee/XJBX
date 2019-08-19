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
    [17, 20]
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

function createTwoDimensionArr(size = arrSize + 12, init = 0) {

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
let arrSize = activities.length -1
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

    // 只有一个活动，初始化
    for (let i = left; i < right; ++i) {
        great[i][i - 1] = 0;
    }
    for (let k = 0; k <= right - left; ++k) {
        for (let i = left; i <= right; ++i) {
            let max = 0;
            let pos = i;
            let leftBorder = i;
            let rightBorder = i;
            for (let j = i; j <= i + k; ++j) {
                // 首先需要计算左右边界
                let leftTemp = j;
                let rightTemp = j;
                /** 找到左边界 */
                while (leftTemp >= i && activities[leftTemp][1] > activities[j][0])
                    leftTemp--;
                /** 找到右边界 */
                console.log(activities[10])
                console.log(activities[11][0])

                while (rightTemp <= i + k && activities[rightTemp][0] < activities[j][1]) {
                    rightTemp++;
                    console.log(rightTemp)
                }
                let temp = great[i][leftTemp] + great[rightTemp][i + k] + 1;
                if (max < temp) {
                    max = temp;
                    pos = j;
                    leftBorder = leftTemp;
                    rightBorder = rightTemp;
                }
            }
            solution[i][i + k] = pos;
            border[i][i + k] = [leftBorder, rightBorder];
            great[i][i + k] = max;
        }
    }
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
printSolution(0, arrSize - 1);


/*
function main( argc, char const *argv[])
{
    std::vector<pair<int , int> > activities;

    cout<<"The max selectors is : "<<greateActivitySelector(activities)<<endl;
    printSolution(0 , arrSize-1);
    return 0;
}

*/


