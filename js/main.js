$(function(){
	//addScalar, offsetHSL
	generateLevel(4);
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

function checkWin(colorArray){
	var colorArray = colorArray;
	var win = true;
	for (i = 0; i < colorArray.length; i++) {
		var recColorData = $('div').eq(i).attr('data');
		if ( recColorData != colorArray[i].getHex() ){
			win = false;
		}
	}
	var reversewin = true;
	for (i = 0; i < colorArray.length; i++) {
		var recColorData = $('div').eq(colorArray.length-i-1).attr('data');
		if ( recColorData != colorArray[i].getHex() ){
			reversewin = false;
		}
	}
	if(win||reversewin) {
		alert('You win');
	}
}
function generateLevel( i ) {
	var numberOfBlocks = i;
	var c=$("body");
	var colorArray = [];
	var startColor = new THREE.Color(Math.random(), Math.random(),Math.random());
	var endColor = new THREE.Color(Math.random(), Math.random(),Math.random());

	for (i = 0; i < numberOfBlocks; i++) { 
		c.append( createElement(i) );

		// $('.example').append( createElement(i+i.toString()) );
		// $('#rec'+i+i).css('background-color', startColor.clone().lerp(endColor, i/(numberOfBlocks-1)).getStyle());
		colorArray.push( startColor.clone().lerp(endColor, i/(numberOfBlocks-1) ) )
	}
	var randomColorArray = colorArray.slice();
	shuffle(randomColorArray);

	console.log(randomColorArray);
	console.log(colorArray);

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