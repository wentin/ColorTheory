$(function() {
	generateLevel(6);
})

function generateLevel(colorTotal) {
	var colorTotal = colorTotal;
	var color1 = new THREE.Color(Math.random(), Math.random(), Math.random());
	var color2 = new THREE.Color(Math.random(), Math.random(), Math.random());

	for (k = 0; k < colorTotal; k++) {
  	var tempColor = color1.clone().lerp(color2, k / (colorTotal - 1));
		var newRectangle = $("<div></div>")
												.css('background-color', tempColor.getStyle());
    $("#game").append(newRectangle);
  }
}
