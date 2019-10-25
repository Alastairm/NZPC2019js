var data = '';

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
    data += chunk;
});

process.stdin.on('end', function() {
    data =  data.split("\n");
    callback(data);
});


function calculate(expression) {
    expression = expression.split(' ');
    let stack = [];

    expression.forEach(element => {
        let e = parseInt(element);
        if (isNaN(e)) {
            let n2 = stack.pop();
            let n1 = stack.pop();
            let ans = operate(element, n1, n2);
            stack.push(ans);
        } else {
            stack.push(e)
        }
    });

    if (stack.length === 1) {
        return parseInt(stack[0]);
    } else {
        throw "Operator value mismatch";
    }
}

function operate(op, n1, n2) {
    if (op === '+') {
        return n1 + n2;
    } else if (op === '-') {
        return n1 - n2;
    } else if (op === '*') {
        return n1 * n2;
    } else if (op === '/') {
        return parseInt(n1 / n2)
    } else {
        throw `Invalid operator '${op}'.`
        
    }
}

function callback(data) {
    for (let i = 1; i <= parseInt(data[0]); i++) {
        const expression = data[i];
        const answer = calculate(expression);
        console.log(answer);        
    }
}