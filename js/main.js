$(function(){
	//addScalar, offsetHSL
	// generateLevel(15);
	generateLevelTwo(12,12);
	generateLevelThree(12,12);
	// generateLevelFour(10,4);
	// generateLevelFive(10,4);
	// generateLevelSix(10,4);
})
	
function createElement(id,i) {
    return $('<div>', { id: id + i});
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
	// var endColor = new THREE.Color(Math.random(), Math.random(),Math.random());

	var	endColor = new THREE.Color(0x0DC0CB);

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
/* 0 - i will be between two hue－contrasting colors， 
   i － i+j will be between the second contrasting color and its hsl－constrasting color
*/
function generateLevelTwo( i, j ) {
	var c=$("#levelTwoWrapper"),
		numberOfBlocksX = i,
		numberOfBlocksY = j,
		colorArrayX = [],
		colorArrayY = [],
		totalColorArray = [],
		startColor0202 = new THREE.Color(0x0DC0CB),
		startColor0201 = new THREE.Color(Math.random(),Math.random(),Math.random());
		// startColor0202 = new THREE.Color(Math.random(),Math.random(),Math.random());

	var startColor0202Hue = startColor0202.getHSL().h;
	var startColor0202HueReversed = ( Math.random()/2 + 0.25 + startColor0202Hue ) % 1;

	startColor0201.offsetHSL((startColor0202HueReversed-startColor0201.getHSL().h), 0, 0);
	
	for (i = 0; i < numberOfBlocksX; i++) { 
		colorArrayX.push( startColor0201.clone().lerp(startColor0202, i/(numberOfBlocksX-1) ) );
		totalColorArray.push( startColor0201.clone().lerp(startColor0202, i/(numberOfBlocksX-1) ) );
	}
	var ramdomH = ( Math.random()/2 + 0.25 + startColor0202.getHSL().h ) % 1;
	var randomS = ( Math.random()/2 + 0.25 + startColor0202.getHSL().s ) % 1;
	var randomL = ( Math.random()/2 + 0.25 + startColor0202.getHSL().l ) % 1;
	for (j = 0; j < numberOfBlocksY; j++) { 
		var temp = startColor0202.clone().lerpHSL(startColor0202.getHSL().h, randomS, randomL, (j+1)/numberOfBlocksY);
		colorArrayY.push(temp);
		totalColorArray.push(temp);
	}

	var randomColorArray = totalColorArray.slice();
	// shuffle(randomColorArray);

	for (k = 0; k < (numberOfBlocksX + numberOfBlocksY); k++) {
		c.append( createElement('rec',k) );
		$('#rec'+k).css('background-color', randomColorArray[k].getStyle()).attr('data', randomColorArray[k].getHex() );
	}
    c.sortable({
    	stop: function( event, ui ) {
    		checkWin(totalColorArray, 'levelTwoWrapper');
    	}
	});
    c.disableSelection();
}

function generateLevelThree( i, j ) {
	var c=$("#levelThreeWrapper"),
		numberOfBlocksX = i,
		numberOfBlocksY = j,
		colorArrayX = [],
		colorArrayY = [],
		totalColorArray = [],
		startColor0201 = new THREE.Color(Math.random(),Math.random(),Math.random()),
		// startColor0202 = new THREE.Color(Math.random(),Math.random(),Math.random());
		startColor0202 = new THREE.Color(0x0DC0CB);
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
	// shuffle(randomColorArray);

	for (k = 0; k < (numberOfBlocksX + numberOfBlocksY); k++) {
		c.append( createElement('rec3',k) );
		$('#rec3'+k).css('background-color', randomColorArray[k].getStyle()).attr('data', randomColorArray[k].getHex() );
	}
    c.sortable({
    	stop: function( event, ui ) {
    		checkWin(totalColorArray, 'levelThreeWrapper');
    	}
	});
    c.disableSelection();
}


function generateLevelFour( i, j ) {
	var c=$("#levelFourWrapper"),
		numberOfBlocksX = i,
		numberOfBlocksY = j,
		colorArrayX = [],
		colorArrayY = [],
		totalColorArray = [],
		// startColor0202 = new THREE.Color(0xDF0000),
		// hue = Math.random(),
		hue = new THREE.Color('#E91E63').getHSL().h;
		startColor0401 = new THREE.Color().setHSL(hue,0.8,0.95),
		startColor0402 = new THREE.Color().setHSL(hue,0.7,0.4),
		startColor0403 = new THREE.Color().setHSL(hue,1,0.75),
		startColor0404 = new THREE.Color().setHSL(hue,1,0.4);

	for (i = 0; i < numberOfBlocksX; i++) { 
		colorArrayX.push( startColor0401.clone().lerp(startColor0402, i/(numberOfBlocksX-1) ) );
		totalColorArray.push( startColor0401.clone().lerp(startColor0402, i/(numberOfBlocksX-1) ) );
	}

	for (j = 0; j < numberOfBlocksY; j++) { 
		var temp = startColor0403.clone().lerp(startColor0404, j/(numberOfBlocksY-1) )
		// var temp = startColor0403.clone().lerpHSL(startColor0404.getHSL().h, randomS, randomL, (j+1)/numberOfBlocksY);
		colorArrayY.push(temp);
		totalColorArray.push(temp);
	}

	var randomColorArray = totalColorArray.slice();
	// shuffle(randomColorArray);

	for (k = 0; k < (numberOfBlocksX + numberOfBlocksY); k++) {
		c.append( createElement('rec4',k) );
		$('#rec4'+k).css('background-color', randomColorArray[k].getStyle()).attr('data', randomColorArray[k].getHex() );
	}
    c.sortable({
    	stop: function( event, ui ) {
    		checkWin(totalColorArray, 'levelFourWrapper');
    	}
	});
    c.disableSelection();
}

function generateLevelFive( i, j ) {
	var c=$("#levelFiveWrapper"),
		numberOfBlocksX = i,
		numberOfBlocksY = j,
		colorArrayX = [],
		colorArrayY = [],
		totalColorArray = [],
		// startColor0202 = new THREE.Color(0xDF0000),
		// hue = Math.random(),
		hue = new THREE.Color('#E91E63').getHSL().h;
		startColor0501 = new THREE.Color().setHSL(hue,0.8,0.95),
		startColor0502 = new THREE.Color().setHSL(hue,0.7,0.4),
		startColor0503 = new THREE.Color().setHSL(hue,1,0.75),
		startColor0504 = new THREE.Color().setHSL(hue,1,0.4);

	for (i = 0; i < numberOfBlocksX; i++) { 
		var temp = startColor0501.clone().lerpHSL(startColor0502.getHSL().h,startColor0502.getHSL().s,startColor0502.getHSL().l, i/(numberOfBlocksX-1) );
		colorArrayX.push( temp );
		totalColorArray.push( temp );
	}

	for (j = 0; j < numberOfBlocksY; j++) { 
		var temp = startColor0503.clone().lerpHSL(startColor0504.getHSL().h,startColor0504.getHSL().s,startColor0504.getHSL().l, j/(numberOfBlocksY-1) )
		colorArrayY.push(temp);
		totalColorArray.push(temp);
	}

	var randomColorArray = totalColorArray.slice();
	// shuffle(randomColorArray);
	console.log(randomColorArray);
	for (k = 0; k < (numberOfBlocksX + numberOfBlocksY); k++) {
		c.append( createElement('rec5',k) );
		$('#rec5'+k).css('background-color', randomColorArray[k].getStyle()).attr('data', randomColorArray[k].getHex() );
	}
    c.sortable({
    	stop: function( event, ui ) {
    		checkWin(totalColorArray, 'levelFiveWrapper');
    	}
	});
    c.disableSelection();
}

function generateLevelSix( i, j ) {
	var c=$("#levelSixWrapper"),
		numberOfBlocksX = i,
		numberOfBlocksY = j,
		colorArrayX = [],
		colorArrayY = [],
		totalColorArray = [],
		// startColor0202 = new THREE.Color(0xDF0000),
		// hue = Math.random(),
		hue = new THREE.Color('#E91E63').getHSL().h;
		startColor0501 = new THREE.Color().setHSL(hue,0.8,0.95),
		startColor0502 = new THREE.Color().setHSL(hue,0.7,0.4),
		startColor0503 = new THREE.Color().setHSL(hue,1,0.75),
		startColor0504 = new THREE.Color().setHSL(hue,1,0.4);

	for (i = 0; i < numberOfBlocksX; i++) { 
		var temp = startColor0501.clone().lerpHSL(startColor0502.getHSL().h,startColor0502.getHSL().s,startColor0502.getHSL().l,
				Math.sqrt(i/(numberOfBlocksX-1)) );
		colorArrayX.push( temp );
		totalColorArray.push( temp );
	}

	for (j = 0; j < numberOfBlocksY; j++) { 
		var temp = startColor0503.clone().lerpHSL(startColor0504.getHSL().h,startColor0504.getHSL().s,startColor0504.getHSL().l, 
				Math.sqrt(j/(numberOfBlocksY-1)) );
		colorArrayY.push(temp);
		totalColorArray.push(temp);
	}

	var randomColorArray = totalColorArray.slice();
	// shuffle(randomColorArray);
	console.log(randomColorArray);
	for (k = 0; k < (numberOfBlocksX + numberOfBlocksY); k++) {
		c.append( createElement('rec6',k) );
		$('#rec6'+k).css('background-color', randomColorArray[k].getStyle()).attr('data', randomColorArray[k].getHex() );
	}
    c.sortable({
    	stop: function( event, ui ) {
    		checkWin(totalColorArray, 'levelSixWrapper');
    	}
	});
    c.disableSelection();
}