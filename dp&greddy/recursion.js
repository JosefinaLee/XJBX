function recursion(n) {

    if(n == 0) return;
    console.log(n);
    recursion(n-1)

}

function recursion2(n, i=0) {

    if(i > n) return;
    console.log(i);
    recursion2(n, i+1)
}


function map(n) {

    for(let i = 0; i< n; i++){
        console.log(i)
    }

}

// map(10)
recursion2(10)
