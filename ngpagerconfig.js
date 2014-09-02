angular.module('PagerConfig', []).factory('PagerConfig', [function() {
	var offset = 0;
	var areJumpControlsEnabled = false;
	var defaultMaxPages = 3;

	var config = {
		setBase1: function() {offset = -1;},
		enableJumpControls: function() { areJumpControlsEnabled = true; },
		setDefaultMaxPages: function(newDefault) { defaultMaxPages = newDefault; }
	};
	Object.defineProperty(config, "offset", { get: function() { return offset; }});
	Object.defineProperty(config, "areJumpControlsEnabled", { get: function() { return areJumpControlsEnabled; }});
	Object.defineProperty(config, "defaultMaxPages", { get: function() { return defaultMaxPages; }});
	return config;
}]);
