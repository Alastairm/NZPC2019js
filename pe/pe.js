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
    var ex_weights = data[0].split(' ').map(x => parseInt(x));
    var total = ex_weights.reduce((a, b) => a + b, 0) * 10;

    var exercises = ['A', 'B', 'C', 'D', 'E'];
    var weights = {};
    for (var i = 0; i < 5; i++) {
        weights[exercises[i]] = ex_weights[i];
    }

    var n = parseInt(data[1]);
    var student_names = {};
    var ids = [];
    var results = {};
    for (var i = 2; i < n + 2; i++) {
        var student = data[i];
        var sid = student.slice(0,4);
        var name = student.slice(5);
        ids.push(sid);
        student_names[sid] = name;
        results[sid] = {'A':'', 'B':'', 'C':'', 'D':'', 'E':''};
    }

    for (var i = n + 2; i < Number.MAX_SAFE_INTEGER; i++) {
        test = data[i];
        if (test == '0 # #') {
            break;
        }
        var sid = test.slice(0,4);
        results[sid][test[5]] += test[7];
    }

    var scores = {};
    var passed = {};
    for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        var result = results[id];
        var pscores = [10, 7, 4];
        var score = 0;

        for (let i = 0; i < exercises.length; i++) {
            const e = exercises[i];
            if (result[e].includes('P')) {
                var f = result[e].split('P')[0].length;
                f = f > 2 ? 2 : f;
                score += pscores[f] * weights[e];
            }
            
        }
        scores[id] = score;
        if (score / total >= 0.5) {
            passed[id] = 'Pass';
        } else {
            passed[id] = 'Fail'
        }
    }

    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        console.log(`${student_names[id]} ${passed[id]}`);
    }
}