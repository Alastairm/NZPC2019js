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


function callback(data) {
    var n1 = Number(data[0]);
    var n2 = Number(data[1]);

    console.log(`${n1} + ${n2} = ${n1 + n2}`);
    console.log(`${n1} - ${n2} = ${n1 - n2}`);
    console.log(`${n1} x ${n2} = ${n1 * n2}`);
    console.log(`${n1} divided by ${n2} is ${parseInt(n1 / n2)} remainder ${n1 % n2}`)
}