// import {activities, createTwoDimensionArr} from "./config";

/*
* 除了上面的思路外，我们还可以参照最长单调递增子序列LIS的解法，得到另外一个动态规划方法。

我们定义一个数组maxCompatibleSet，元素maxCompatibleSet[i]表示S0i中最大兼容活动子集中的活动数目，
那么整个集合的最大兼容活动子集的大小就是maxCompatibleSet[n+1]。为了确定最大兼容活动子集中的活动，我们可以定义一个数组trace，

Trace[i]表示在求解maxCompatibleSet[i]时使用哪个活动对集合S0i进行划分可以得到最大的maxCompatibleSet[i]。
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


maxCompatibleSet(activities)

function maxCompatibleSet(activities) {
    let maxSetNum = []
    let trace = []

    const n = activities.length

    for (let i = 0; i < n; i++) {
        maxSetNum[i] = 1;

        for (let j = 0; j <= i; j++) {
            if (activities[j][1] < activities[i][0] && maxSetNum[i] <= maxSetNum[j]) {
                maxSetNum[i] = maxSetNum[j] + 1;
                trace[i] = j;
            }
        }
    }
    // console.log(maxSetNum)
    return maxSetNum
}
