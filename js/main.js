$(function() {
	generateLevel(9,6);
})

function generateLevel(colorTotal1, colorTotal2) {
	var colorTotal1 = colorTotal1;
	var colorTotal2 = colorTotal2;
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

	for (i = 0; i < colorTotal1; i++) {
  	var tempColor = color1.clone().lerpHSL(color2, i / (colorTotal1 - 1));
		var newRectangle = $("<div></div>")
												.css('background-color', tempColor.getStyle());
    $("#game").append(newRectangle);
  }

  var color2Hue = color2.getHSL().h;
	var color2Saturation = color2.getHSL().s;
	var color2Lightness = color2.getHSL().l;
  var color3 = color2.clone().setHSL(color2Hue, color2Saturation, 0.2);

	for (j = 1; j < colorTotal2; j++) {
  	var tempColor = color2.clone().lerpHSL(color3, j / (colorTotal2 - 1));
		var newRectangle = $("<div></div>")
												.css('background-color', tempColor.getStyle());
    $("#game").append(newRectangle);
  }
}
