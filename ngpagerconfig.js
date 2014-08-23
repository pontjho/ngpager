angular.module('PagerConfig', []).factory('PagerConfig', [function() {
	var offset = 0;
	var config = {
		setBase1: function() {offset = -1;}
	};
	Object.defineProperty(config, "offset", { get: function() { return offset; }});
	return config;
}]);
