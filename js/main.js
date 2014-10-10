$(function(){
	//addScalar, offsetHSL
	// generateLevel(15);
	generateLevelTwo(3,3);
})

function createElement(i) {
    return $('<div>', { id: "rec" + i});
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

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

function checkWin(colorArray, levelID){
	var colorArray = colorArray;
	var id = '#' + levelID;
	var win = true;
	for (i = 0; i < colorArray.length; i++) {
		var recColorData = $(id+' div').eq(i).attr('data');
		if ( recColorData != colorArray[i].getHex() ){
			win = false;
		}
	}
	var reversewin = true;
	for (i = 0; i < colorArray.length; i++) {
		var recColorData = $(id+' div').eq(colorArray.length-i-1).attr('data');
		if ( recColorData != colorArray[i].getHex() ){
			reversewin = false;
		}
	}
	if(win||reversewin) {
		alert('You win!!!');
	}
}
function generateLevel( i ) {
	var numberOfBlocks = i;
	var c=$("#levelOneWrapper");
	var colorArray = [];
	var startColor = new THREE.Color(Math.random(), Math.random(),Math.random());
	var endColor = new THREE.Color(Math.random(), Math.random(),Math.random());

	for (i = 0; i < numberOfBlocks; i++) { 
		c.append( createElement(i) );
		// $('.example').append( createElement(i+i.toString()) );
		// $('#rec'+i+i).css('background-color', startColor.clone().lerp(endColor, i/(numberOfBlocks-1)).getStyle());
		colorArray.push( startColor.clone().lerp(endColor, i/(numberOfBlocks-1) ) );
	}
	var randomColorArray = colorArray.slice();
	shuffle(randomColorArray);


	for (i = 0; i < colorArray.length; i++) {
		$('#rec'+i).css('background-color', randomColorArray[i].getStyle()).attr('data', randomColorArray[i].getHex() );
	}
	
    c.sortable({
    	stop: function( event, ui ) {
    		checkWin(colorArray);
    	}
	});
    c.disableSelection();
}
function generateLevelTwo( i, j ) {
	var c=$("#levelTwoWrapper"),
		numberOfBlocksX = i,
		numberOfBlocksY = j,
		colorArrayX = [],
		colorArrayY = [],
		totalColorArray = [],
		startColor0201 = new THREE.Color(Math.random(),Math.random(),Math.random()),
		startColor0202 = new THREE.Color(Math.random(),Math.random(),Math.random());
	window.color = new THREE.Color(Math.random(),Math.random(),Math.random());
	for (i = 0; i < numberOfBlocksX; i++) { 
		colorArrayX.push( startColor0201.clone().lerp(startColor0202, i/(numberOfBlocksX-1) ) );
		totalColorArray.push( startColor0201.clone().lerp(startColor0202, i/(numberOfBlocksX-1) ) );

	}
	var ramdomH = Math.random();
	var randomS = Math.random();
	var randomL = 0.95;
	for (j = 0; j < numberOfBlocksY; j++) { 
		var temp = startColor0202.clone().lerpHSL(ramdomH, 0, randomS, (j+1)/numberOfBlocksY);
		colorArrayY.push(temp);
		totalColorArray.push(temp);
	}

	var randomColorArray = totalColorArray.slice();
	//shuffle(randomColorArray);

	for (k = 0; k < (numberOfBlocksX + numberOfBlocksY); k++) {
		c.append( createElement(k) );
		$('#rec'+k).css('background-color', randomColorArray[k].getStyle()).attr('data', randomColorArray[k].getHex() );
	}
    c.sortable({
    	stop: function( event, ui ) {
    		checkWin(totalColorArray, 'levelTwoWrapper');
    	}
	});
    c.disableSelection();
}