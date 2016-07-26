$(function() {
	generateLevel(6);
})

function generateLevel(colorTotal) {
	var colorTotal = colorTotal;
	var color1 = new THREE.Color(Math.random(), Math.random(), Math.random());
	var color1Hue = color1.getHSL().h;
	var color1Saturation = color1.getHSL().s;
	var color1Lightness = color1.getHSL().l;

	// var color2 = color1.clone().setHSL(color1Hue, 0, color1Lightness);
	// var color2 = color1.clone().setHSL(color1Hue, color1Saturation, 0.2);
	if (color1Hue > 0.5) {
		var color2Hue = color1Hue - 0.5;
	} else {
		var color2Hue = color1Hue + 0.5;
	}
	// var color2Hue = color1Hue > 0.5?(color1Hue-0.5):(color1Hue+0.5)
	var color2 = color1.clone().setHSL(color2Hue, color1Saturation, color1Lightness);

	for (k = 0; k < colorTotal; k++) {
  	var tempColor = color1.clone().lerp(color2, k / (colorTotal - 1));
		var newRectangle = $("<div></div>")
												.css('background-color', tempColor.getStyle());
    $("#game").append(newRectangle);
  }
}
