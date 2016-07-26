$(function() {
	generateLevel(6,4);
})

var lerpHSL = function(color1, color2, alpha) {
  var h1 = color1.getHSL().h;
	var s1 = color1.getHSL().s;
	var l1 = color1.getHSL().l;

	var h2 = color2.getHSL().h;
	var s2 = color2.getHSL().s;
	var l2 = color2.getHSL().l;

	var h = h1 + ( h2 - h1 ) * alpha;
	var s = s1 + ( s2 - s1 ) * alpha;
	var l = l1 + ( l2 - l1 ) * alpha;
	
	var color = new THREE.Color().setHSL(h,s,l);
	return color;
}

var checkWin = function(colorArray) {
	var colorArray = colorArray;
	var win = true;

	for (i = 0; i < colorArray.length; i++) {
		var recColorData = $('#game div').eq(i).attr('data');
		if ( recColorData != colorArray[i].getHex() ){
			win = false;
		}
		console.log(recColorData, colorArray[i].getHex(), win);
	}

	var reversewin = true;
	for (i = 0; i < colorArray.length; i++) {
		var recColorData = $('#game div').eq(colorArray.length-i-1).attr('data');
		if ( recColorData != colorArray[i].getHex() ){
			reversewin = false;
		}
	}

	if(win||reversewin) {
		alert('You win!!!');
	}
}

var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

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

function generateLevel(colorTotal1, colorTotal2) {
	var colorTotal1 = colorTotal1;
	var colorTotal2 = colorTotal2;
	var colorArray = [];

	// var color1 = new THREE.Color(Math.random(), Math.random(), Math.random());
	// generate random number that is saturated and not so dark
	var h = Math.random();
	var s = Math.random()/2 + 0.5;
	var l = Math.random()/2 + 0.5;
	var color1 = new THREE.Color().setHSL(h, s, l);

	var color1Hue = color1.getHSL().h;
	var color1Saturation = color1.getHSL().s;
	var color1Lightness = color1.getHSL().l;

	if (color1Hue > 0.5) {
		var color2Hue = color1Hue - 0.5;
	} else {
		var color2Hue = color1Hue + 0.5;
	}
	var color2 = color1.clone().setHSL(color2Hue, color1Saturation, color1Lightness);

	for (i = 0; i < colorTotal1; i++) {
  	var tempColor = lerpHSL(color1, color2, i / (colorTotal1 - 1));
		// var newRectangle = $("<div></div>")
		// 										.css('background-color', tempColor.getStyle());
  	//   $("#game").append(newRectangle);
  	colorArray.push(tempColor);
  }

  var color2Hue = color2.getHSL().h;
	var color2Saturation = color2.getHSL().s;
	var color2Lightness = color2.getHSL().l;

  var color3 = color2.clone().setHSL(color2Hue, color2Saturation, Math.random()/3);

	for (j = 1; j < colorTotal2; j++) {
  	// var tempColor = color2.clone().lerp(color3, j / (colorTotal2 - 1));
  	var tempColor = lerpHSL(color2, color3, j / (colorTotal2 - 1));
		// var newRectangle = $("<div></div>")
		// 										.css('background-color', tempColor.getStyle());
    // $("#game").append(newRectangle);
  	colorArray.push(tempColor);
  }

  var randomColorArray = colorArray.slice();
	shuffle(randomColorArray);


  for (k = 0; k < randomColorArray.length; k++) {
  	var newRectangle = $("<div></div>")
												.css('background-color', randomColorArray[k].getStyle())
												.attr('data', randomColorArray[k].getHex());
    $("#game").append(newRectangle);
  }

  $("#game").sortable({
    	stop: function( event, ui ) {
    		checkWin(colorArray);
    	}
	});
}
