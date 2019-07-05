## 贪心算法
求解决策过程最优化的一种算法
        
#### 基本思路

> 从问题的某一个初始解出发逐步逼近给定的目标，以尽可能快的地求得更好的解。当达到某算法中的某一步不能再继续前进时，算法停止。   

> 贪心算法最大的特点，就是在每一步中取最优化的解，不会回溯处理。这样的策略，自然在执行速度上更快，但是因为这种方法的短视。会导致得的解并不是真正的全局最优解，但是贪心算法得到的依然是一个近似最优解。

#### 找钱问题   
贪心算法最经典的例子，找钱问题
比如中国的货币，只看元，有1元2元5元10元20、50、100   
    
如果我要16元，可以拿16个1元，8个2元，但是怎么最少呢？   


#### 贪心法的求解过程

用贪心法求解问题应该考虑如下几个方面：
（1）候选集合C：为了构造问题的解决方案，有一个候选集合C作为问题的可能解，即问题的最终解均取自于候选集合C。例如，在付款问题中，各种面值的货币构成候选集合。
（2）解集合S：随着贪心选择的进行，解集合S不断扩展，直到构成一个满足问题的完整解。例如，在付款问题中，已付出的货币构成解集合。
（3）解决函数solution：检查解集合S是否构成问题的完整解。例如，在付款问题中，解决函数是已付出的货币金额恰好等于应付款。 
（4）选择函数select：即贪心策略，这是贪心法的关键，它指出哪个候选对象最有希望构成问题的解，选择函数通常和目标函数有关。例如，在付款问题中，贪心策略就是在候选集合中选择面值最大的货币。
（5）可行函数feasible：检查解集合中加入一个候选对象是否可行，即解集合扩展后是否满足约束条件。例如，在付款问题中，可行函数是每一步选择的货币和已付出的货币相加不超过应付款。        

起初，算法选出的候选对象的集合为空。接下来的每一步中，根据`贪心策略`选择函数，算法从剩余候选对象中选出最有希望构成解的对象。如果集合中加上该对象后不可行，那么该对象就被丢弃并不再考虑；否则就加到集合里。每一次都扩充集合，并检查该集合是否构成解。


如果用贪心算，就是我每一次拿那张可能拿的最大的。
每次拿能拿的最大的，就是贪心策略。 

比如16，我第一次拿20拿不起，拿10元，OK，剩下6元，再拿个5元，剩下1元   
也就是3张   10、5、1。   

> 伪代码
```
Greedy(C)  //C是问题的输入集合即候选集合
{
    S={ };  //初始解集合为空集
    while (not solution(S))  //集合S没有构成问题的一个解
    {
       x=select(C);    //在候选集合C中做贪心选择
       if feasible(S, x)  //判断集合S中加入x后的解是否可行
          S=S+{x};
          C=C-{x};
    }
    return S;
}
```

#### 贪心算法有以下特点：

（1）贪心选择性质；
 - 自顶向下进行决策，每次做出的决策都是局部最优解，且每次做出决策后问题规模都变小了

（2）最优子结构性质；
- 即问题的最优解结构中包含子问题的最优解；
> 最优子结构性质
```
某个问题的最优决策是建立在其子问题的最优决策的基础上;
当一个问题的最优解包含着它的子问题的最优解时，称此问题具有最优子结构性质。
问题所具有的这个性质是该问题可用动态规划算法或贪心算法求解的一个关键特征
```

* * *

### 动态规划

动态规划(dynamic programming)是求解决策过程最优化的一种算法。
#### 基本思路
自底向上，首先将原始问题分解为若干个相互有联系的子问题
多阶段过程转化为一系列单阶段问题，利用各阶段之间的关系，逐个求解
全局最优解中一定包含某个局部最优解，但不一定包含前一个局部最优解


#### 01背包问题

> 有N件物品和一个容量为V的背包。第i件物品的费用是c[i]，价值是w[i]。求解将哪些物品装入背包可使价值总和最大。

动态规划过程分为三步：
1：确定状态
装入背包的使价值总和最大
2：状态转移
即如何由以求出的局部最优解来推导全局最优解 
3: 初始状态
即`边界条件`：最简单的，可以直接得出的局部最优解


> 用子问题定义状态：
> 即f[i][v]表示前i件物品恰放入一个容量为v的背包可以获得的最大价值。

> 则其状态转移方程便是：
`f[i][v] = max{f[i-1][v],f[i-1][v-c[i]]+w[i]}`

> 初始状态
> f[i][0] = 0
> f[0][v] = 0


将前i件物品放入容量为v的背包中
子问题: 若只考虑第i件物品的策略（放或不放），那么就可以转化为一个只牵扯前i-1件物品的问题。
- 如果不放第i件物品，那么问题就转化为“前i-1件物品放入容量为 v 的背包中”，价值为`f[i-1][v]`；
- 如果放第i件物品，那么问题就转化为“前i-1件物品放入剩下的容量为 v-c[i] 的背包中”，此时能获得的最大价值就是`f[i-1][v-c[i]]`再加上通过放入第i件物品获得的价值`w[i]`。


> 伪代码如下
```
for i=1..N
    for v=0..V
        f[v]=max{f[i-1][v],f[i-1][v-c[i]]+w[i]};
```

假设
背包容量 V = 6
物品数量 N = 4
物品容积 c = [1, 4, 3, 2]
物品价值 w = [3, 6, 4, 8]

转化为递推表格f[i][v]


| i\v | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 3 | 3 | 3 | 3 | 3 | 3 | 
| 2 | 0 | 3 | 3 | 3 | 6 | 9 | 9 | 
| 3 | 0 | 3 | 3 | 4 | 7 | 9 | 9 | 
| 4 | 0 | 3 | 8 | 11 | 11 | 12 | 15 | 

可得f[4][6] = 15

* * *

#### 动态规划有以下特点：

（1）重叠子问题性质；
- 自底向上， 需要首先将原始问题分解为若干个相互有联系的子问题
有很多问题会被重复计算，这时候通过保存计算过的问题，能做到非常好的优化。

（2）最优子结构性质；
- 最优解子结构性质和贪心算法相似

（3）：无后效性
- 将各阶段按照一定的次序排列好之后，对于某个给定的阶段状态，它以前各阶段的状态无法直接影响它未来的决策，而只能通过当前的这个状态。换句话说，每个状态都是过去历史的一个完整总结。


* * *


## 贪心算法与动态规划的比较
### 简要
#### 相似 
动态规划和贪心算法都是一种递推算法 
均有最优子结构性质（某个问题的最优决策是建立在其子问题的最优决策的基础上）

> 最优子结构性质

```
某个问题的最优决策是建立在其子问题的最优决策的基础上;
当一个问题的最优解包含着它的子问题的最优解时，称此问题具有最优子结构性质。
问题所具有的这个性质是该问题可用动态规划算法或贪心算法求解的一个关键特征
```

#### 不同点： 
##### 贪心算法： 
作出的每步贪心决策都无法改变，因为贪心策略是由上一步的最优解推导下一步的最优解，而上一部之前的最优解则不作保留，不会回溯处理。每一步的最优解一定包含上一步的最优解。这样的策略，自然在执行速度上更快，但是因为这种方法的短视。会导致得的解并不是真正的全局最优解，但是贪心算法得到的依然是一个近似最优解。
贪心一般解决一维问题

##### 动态规划:
动态规划则会根据以前的选择结果对当前进行选择，有回退功能。动态规划主要运用于二维或三维问题
全局最优解中一定包含某个局部最优解，但不一定包含前一个局部最优解

* * *

#### 详细
贪心和动态规划本质上是对子问题树的一种修剪。
两种算法要求问题都具有的一个性质就是`“子问题最优性”`。即，组成最优解的每一个子问题的解，对于这个子问题本身肯定也是最优的。如果以自顶向下的方向看问题树（原问题作根），则，我们每次只需要向下遍历代表最优解的子树就可以保证会得到整体的最优解。形象一点说，可以简单的用一个值（最优值）代表整个子树，而不用去求出这个子树所可能代表的所有值。
- 动态规划方法代表了这一类问题的一般解法。我们自底向上（从叶子向根）构造子问题的解，对每一个子树的根，`求出下面每一个叶子的值，并且以其中的最优值作为自身的值`，其它的值舍弃。动态规划的代价就取决于可选择的数目（树的叉数）和子问题的的数目（树的节点数，或者是树的高度）。
- 贪心算法是动态规划方法的一个特例。贪心特在，可以证明，每一个子树的根的值不取决于下面叶子的值，而只取决于当前问题的状况。换句话说，`不需要知道一个节点所有子树的情况`，就可以求出这个节点的值。通常这个值都是对于当前的问题情况下，显而易见的“最优”情况。因此用“贪心”来描述这个算法的本质。由于贪心算法的这个特性，`它对解空间树的遍历不需要自底向上，而只需要自根开始，选择最优的路，一直走到底就可以了`。这样，与动态规划相比，它的代价只取决于子问题的数目，而选择数目总为1。


* * *



## 活动选择问题
  设有n个活动的集合E={1,2,…,n}，其中每个活动都要求使用同一资源，如演讲会场等，而在同一时间内只有一个活动能使用这一资源。每个活动i都有一个要求使用该资源的起始时间begin[i]和一个结束时间end[i],且begin[i] <end[i] 。如果选择了活动i，则它在半开时间区间[begin[i], end[i])内占用资源。若区间[begin[i], end[i])与区间[begin[j], end[j])不相交，则称活动i与活动j是相容的。也就是说，当begin[i]≥end[j]或begin[j]≥end[i]时，活动i与活动j相容。
  
```
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
```



### 动态规划解法

确定状态
用f[i]表示与i活动兼容的最大兼容活动集合

状态转移方程
```
f[i] = max{f[j]+1, 1}
```

时间复杂度 O(N^2)
```javascript

maxCompatibleSet(activities)

function isCompatible(a, b) {
    return activities[a][1] < activities[b][0]
}


function maxCompatibleSet(activities) {

    let maxSetNum = []
    const n = activities.length

    for (let i = 0; i < n; i++) {
        maxSetNum[i] = 1;

        for (let j = 0; j <= i; j++) {

            if (isCompatible(j, i)) {
                if (maxSetNum[i] <= maxSetNum[j]) {
                    maxSetNum[i] = maxSetNum[j] + 1;
                }
            }
        }
    }

    return maxSetNum[n - 1]
}

```



### 贪心算法
贪心策略：每次选择最早结束的活动

时间复杂度 O(N)
```javascript


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

    return maxSetNum
}


```