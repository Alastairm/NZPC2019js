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

function callback() {
    var team1_name = data[0];
    var team2_name = data[1];

    var scores = data[2].split(' ').map(x => parseInt(x));

    var n_moves = parseInt(data[3]);
    var moves = data[4];

    var active_team = 0;

    for (var i = 0; i < n_moves; i++) {
        move = moves[i];
        if (move == 'H' || move == 'P') {
            scores[active_team]++;
        }
        else if (move == 'M') {
            active_team++;
            active_team = active_team % 2;
        }
    }

    console.log(`${team1_name} ${scores[0]} ${team2_name} ${scores[1]}`)
    
}