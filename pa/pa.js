var data = '';

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
    data += chunk;
});

process.stdin.on('end', function() {
    data =  data.split("\n")
    callback(data)
});


function callback(data) {
    n = data[0];
    day1 = data[1];
    day2 = data[2];
    var occupied = 0;
    for (i = 0; i < n; i++) {
        if (day1[i] == 'O' && day2[i] == 'O') {
            occupied++;
        }
    }
    console.log(occupied)
}