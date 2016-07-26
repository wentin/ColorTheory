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
	var c = $("#game");

	var colorNum1 = i;
	var colorNum2 = j;
	var colorNumTotal = colorNum1 + colorNum2;
	var color1 = new THREE.Color(Math.random(), Math.random(), Math.random());
	var color2 = new THREE.Color(Math.random(), Math.random(), Math.random());
	var colorArray = [];

  for (i = 0; i < colorNumTotal; i++) {
  	var tempColor = color1.clone().lerp(color2, i / (colorNumTotal - 1))
    colorArray.push(tempColor);
  }

  var randomColorArray = colorArray;
  // shuffle(randomColorArray);

	for (k = 0; k < colorNumTotal; k++) {
    $("#game").append(createElement('rec', k));
    $('#rec' + k)
    	.css('background-color', randomColorArray[k].getStyle())
    	.attr('data', randomColorArray[k].getHex());
  }

  c.sortable({
    stop: function(event, ui) {
      checkWin(colorArray, 'game');
    }
  });
  c.disableSelection();
}
