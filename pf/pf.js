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


const COLOURS = ['R', 'G', 'B'];
const SHAPES = ['D', 'O', 'S'];
const NUMBERS = ['1', '2', '3'];
const FILLS = ['F', 'S', 'E'];
const CARD_PROPERTIES = [COLOURS, SHAPES, NUMBERS, FILLS];


function make_card_set(card1, card2) {
    let card_properties = [];
    for (let i = 0; i < 4; i++) {
        const p1 = card1[i];
        const p2 = card2[i];
        const ptypes = CARD_PROPERTIES[i];
        const property = make_property_set(p1, p2, ptypes);
        card_properties.push(property);
    }
    return card_properties;
}

function make_property_set(p1, p2, ptypes) {
    if (p1 === p2) {
        return p1;
    } else {
        for (let i = 0; i < ptypes.length; i++) {
            const ptype = ptypes[i];
            if (p1 !== ptype && p2 !== ptype) {
                return ptype;
            }
            
        }
    }
}

function callback(data) {
    for (let i = 1; i <= parseInt(data[0]); i++) {
        const card1 = data[i].split(' ')[0];
        const card2 = data[i].split(' ')[1];
        const set_card = make_card_set(card1, card2);
        console.log(`${set_card.join('')}`);
    }
}