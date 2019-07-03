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

// TODO sort

maxCompatibleSet(activities);

function maxCompatibleSet(activities) {
    let i = 0; //当前最早结束的事件
    let TimeStart = 0; //当前可选事件的最早开始时间
    let Select = [];
    let maxSetNum = 0
    while (i < activities.length) {
        if (activities[i][0] >= TimeStart) {
            Select[i] = 1;
            TimeStart = activities[i][1];
            maxSetNum++;
        }
        i++;
    }
    console.log(maxSetNum)
    return maxSetNum
}
