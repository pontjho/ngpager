angular.module('PagerConfig', []).factory('PagerConfig', [function() {
	var offset = 0;
	var areJumpControlsEnabled = false;
	var config = {
		setBase1: function() {offset = -1;},
		disableJumpControls: function() { areJumpControlsEnabled = false; }
	};
	Object.defineProperty(config, "offset", { get: function() { return offset; }});
	Object.defineProperty(config, "areJumpControlsEnabled", { get: function() { return areJumpControlsEnabled; }});
	return config;
}]);
