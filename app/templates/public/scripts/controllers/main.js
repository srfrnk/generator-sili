define("controllers/main", ["app"], function (app) {
	return app.controller("main", ["$scope","$translate","$translatePartialLoader"/*,"$socket"*/, function ($scope,$translate,$translatePartialLoader/*,$socket*/) {
		$translatePartialLoader.addPart("main");
		$translate.refresh();

//		$socket.on('realtime:broadcast', function(data) {
//			$scope.messages.push(data);
//		});
//		$socket.emit('realtime:connect', {});

		angular.extend($scope, {
//			messages:[],
//			send: function (message) {
//				$socket.emit('realtime:message', {message:message});
//			}
		});
	}]);
});