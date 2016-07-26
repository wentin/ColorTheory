$(function() {
    generateLevel(8, 4);
})

function createElement(id, i) {
    return $('<div>', { id: id + i });
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function checkWin(colorArray, levelID) {
    var colorArray = colorArray;
    var id = '#' + levelID;
    var win = true;
    for (i = 0; i < colorArray.length; i++) {
        var recColorData = $(id + ' div').eq(i).attr('data');
        if (recColorData != colorArray[i].getHex()) {
            win = false;
        }
    }
    var reversewin = true;
    for (i = 0; i < colorArray.length; i++) {
        var recColorData = $(id + ' div').eq(colorArray.length - i - 1).attr('data');
        if (recColorData != colorArray[i].getHex()) {
            reversewin = false;
        }
    }
    if (win || reversewin) {
        alert('You win!!!');
    }
}

/* 0 - i will be between two hue－contrasting colors， 
   i － i+j will be between the second contrasting color and its hsl－constrasting color
*/
function generateLevel(i, j) {
    var c = $("#game"),
        numberOfBlocksX = i,
        numberOfBlocksY = j,
        colorArrayX = [],
        colorArrayY = [],
        totalColorArray = [],
        startColor0202 = new THREE.Color(0x0DC0CB),
        startColor0201 = new THREE.Color(Math.random(), Math.random(), Math.random());
    // startColor0202 = new THREE.Color(Math.random(),Math.random(),Math.random());

    var startColor0202Hue = startColor0202.getHSL().h;
    var startColor0202HueReversed = (Math.random() / 2 + 0.25 + startColor0202Hue) % 1;

    startColor0201.offsetHSL((startColor0202HueReversed - startColor0201.getHSL().h), 0, 0);

    for (i = 0; i < numberOfBlocksX; i++) {
        colorArrayX.push(startColor0201.clone().lerp(startColor0202, i / (numberOfBlocksX - 1)));
        totalColorArray.push(startColor0201.clone().lerp(startColor0202, i / (numberOfBlocksX - 1)));
    }
    var ramdomH = (Math.random() / 2 + 0.25 + startColor0202.getHSL().h) % 1;
    var randomS = (Math.random() / 2 + 0.25 + startColor0202.getHSL().s) % 1;
    var randomL = (Math.random() / 2 + 0.25 + startColor0202.getHSL().l) % 1;
    for (j = 0; j < numberOfBlocksY; j++) {
        var temp = startColor0202.clone().lerpHSL(startColor0202.getHSL().h, randomS, randomL, (j + 1) / numberOfBlocksY);
        colorArrayY.push(temp);
        totalColorArray.push(temp);
    }

    var randomColorArray = totalColorArray.slice();
    // shuffle(randomColorArray);

    for (k = 0; k < (numberOfBlocksX + numberOfBlocksY); k++) {
        c.append(createElement('rec', k));
        $('#rec' + k).css('background-color', randomColorArray[k].getStyle()).attr('data', randomColorArray[k].getHex());
    }
    c.sortable({
        stop: function(event, ui) {
            checkWin(totalColorArray, 'levelTwoWrapper');
        }
    });
    c.disableSelection();
}
