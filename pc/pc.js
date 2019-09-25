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
    var recipe_name = data[0];
    var n = Number(data[1]);

    var required = count_ingredients(n, data.slice(2, n + 2));
    var available = count_ingredients(n, data.slice(n + 2));

    var needed = [];
    Object.keys(available).forEach( function (item) {
        if (available[item] < required[item]) {
            needed.push(item);
        }
    });

    if (needed.length == 0) {
        console.log(`You may make your ${recipe_name}`);
    }
    else {
        console.log(`You may NOT make your ${recipe_name}`);
        console.log(`You need ${needed.join(' ')}`);
    }
}


function count_ingredients(n_ingredients, ingredient_list) {
    var ingredients = {};
    for (var i = 0; i < n_ingredients; i++) {
        var line  = ingredient_list[i].split(',');
        for (j = 0; j < 3; j++) {
            line[j] = line[j].trim()
        }
        var name = line[0];
        var units = line[1];
        var amount = line[2];

        if (units == 'kg' || units=='l') {
            amount = amount * 1000;
        } 
        else {
            amount = amount * 1;
        }
        ingredients[name] = amount;
    }
    return ingredients;
}