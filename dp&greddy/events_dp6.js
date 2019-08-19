// import {activities, createTwoDimensionArr} from "./config";

/*
* 除了上面的思路外，我们还可以参照最长单调递增子序列LIS的解法，得到另外一个动态规划方法。

我们定义一个数组maxCompatibleSet，元素maxCompatibleSet[i]表示S0i中最大兼容活动子集中的活动数目，
那么整个集合的最大兼容活动子集的大小就是maxCompatibleSet[n+1]。为了确定最大兼容活动子集中的活动，我们可以定义一个数组trace，

Trace[i]表示在求解maxCompatibleSet[i]时使用哪个活动对集合S0i进行划分可以得到最大的maxCompatibleSet[i]。
*/

function createArr(size, init = 0) {

    let arr = []

    for (let i = 0; i < size; i++) {
        arr[i] = 1
    }
    return arr
}

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

let maxSetNum = createArr(12)
let trace = []

max(activities.length)

// maxCompatibleSet1(activities)

console.log(maxSetNum)

function maxCompatibleSet1(activities) {
    let maxSetNum = []
    let trace = []

    const n = activities.length

    for (let i = 0; i < n; i++) {
        maxSetNum[i] = 1;


        // i == 兼容 & 最大的 M(j) + 1 / 1
        for (let j = 0; j <= i; j++) {
            if (activities[j][1] < activities[i][0] && maxSetNum[i] <= maxSetNum[j]) {
                maxSetNum[i] = maxSetNum[j] + 1;
                trace[i] = j;
            }
        }
    }
    console.log(maxSetNum)
    return maxSetNum
}


function max(i) {
    console.log('max')
    console.log(i)

    maxSetNum[i - 1] = 1

    for (let j = i - 1; j >= 0; j--) {
        // console.log(j)
        if (activities[j][1] < activities[i - 1][0]) {//&& maxSetNum[i - 1] <= maxSetNum[j]
            maxSetNum[i - 1] = max(j) + 1;
            trace[i - 1] = j;
        }
    }
    return maxSetNum[i - 1]
}

arr = []
function max(n) {
    for (let i = 1; i <= n; i++) {
        arr.push(getMax(i))
    }

    return arr[n]
}
