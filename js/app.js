var app = angular.module('colorApp', []);
app.controller('colorSpaceCtrl', function($scope) {
	$scope.startColor = "#EFEE69";
	$scope.endColor = "#264351";
	$scope.colorArray = [];

	$scope.num = 30;
	$scope.$watch('[startColor, endColor, num]', function () {
		var startColorChroma = chroma($scope.startColor);
		var endColorChroma = chroma($scope.endColor);
		$scope.colorArray = [];
		for(var i=0; i<=$scope.num; i++) {
			var temp;
			// chroma.mix('red', 'blue', 0.5, 'lch'); | rgb | hsl | lab | lch
			temp = chroma.mix(startColorChroma, endColorChroma, i/$scope.num, 'lch');
			$scope.colorArray.push(temp);
		}
		$scope.colorArrayRGB = [];
		for(var i=0; i<=$scope.num; i++) {
			var temp;
			temp = chroma.mix(startColorChroma, endColorChroma, i/$scope.num, 'rgb');
			$scope.colorArrayRGB.push(temp);
		}
		$scope.colorArrayHSL = [];
		for(var i=0; i<=$scope.num; i++) {
			var temp;
			temp = chroma.mix(startColorChroma, endColorChroma, i/$scope.num, 'hsl');
			$scope.colorArrayHSL.push(temp);
		}
		$scope.colorArrayLAB = [];
		for(var i=0; i<=$scope.num; i++) {
			var temp;
			temp = chroma.mix(startColorChroma, endColorChroma, i/$scope.num, 'lab');
			$scope.colorArrayLAB.push(temp);
		}
	}, true);
});
app.controller('colorPaletteCtrl', function($scope) {
	$scope.muteColor = "#000000";
	$scope.anchorMuteNum = 3;
	$scope.anchorColor = "#EFEE69";
	$scope.anchorAccentNum = 1;
	$scope.accentColor = "#12A1E8";
	$scope.colorArrayAnchor = [];

	//, anchorMuteNum, muteColor, anchorAccentNum, accentColor
	$scope.$watch('[anchorColor, anchorMuteNum, anchorAccentNum]', function () {
		// lch.h ranges from 0 to 360
		var tempAccentColor = chroma($scope.anchorColor);
		var targetHue = ( tempAccentColor.get('lch.h') + 135 + 90 * Math.random() ) % 360;
		tempAccentColor.set('lch.h', targetHue);
		// generate accentColor based on anchorColor, an opposite hue with randomness and same c and l. based on hcl
		$scope.accentColor = tempAccentColor.hex();

		// lch.l ranges from 0 to 100
		var tempMuteColor = chroma($scope.anchorColor);
		// targetLightness is a random number in range of 0 ~ 3 and 97 ~ 100
		// var targetLightness = ( Math.random()*6 + 97 ) % 100;
		var dark = ( tempAccentColor.get('lch.l') - 50 ) > 0;
		if (dark) {
			var targetLightness = Math.random()*3;
		} else {
			var targetLightness = -Math.random()*3 + 100;
		}
		tempMuteColor.set('lch.l', targetLightness);
		$scope.muteColor = tempMuteColor.hex();


		var muteColorChroma = chroma($scope.muteColor);
		var anchorColorChroma = chroma($scope.anchorColor);
		var accentColorChroma = chroma($scope.accentColor);
		$scope.colorArrayAnchor = [];
		for(var i=0; i<=$scope.anchorMuteNum; i++) {
			var temp;
			temp = chroma.mix(muteColorChroma, anchorColorChroma, i/$scope.anchorMuteNum, 'lch');
			$scope.colorArrayAnchor.push(temp);
		}
		for(var i=1; i<=$scope.anchorAccentNum; i++) {
			var temp;
			temp = chroma.mix(anchorColorChroma, accentColorChroma, i/$scope.anchorAccentNum, 'lch');
			$scope.colorArrayAnchor.push(temp);
		}
	}, true);

});