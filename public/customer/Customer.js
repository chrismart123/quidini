
app.controller('customer', function($scope, $http) {
	console.log('customer CTRL CONTROLLER RUNNING');
});

app.directive('customer', function($http) {
	return{
		restrict: 'E',
		scope:{
			customer: '=',

			onRemoved: '&',
			onServed: '&'
		},
		templateUrl: '/customer/customer.html',
		link: function(scope){

			// calculate how long the customer has queued for
			scope.queuedTime = new Date() - new Date(scope.customer.joinedTime);

			scope.remove = function(){
				$http({
					method: 'POST',
					url: '/api/customer/serve',
					params: {id: scope.customer.id}
				}).then(function(res){
					console.log('success on add served customer', res);
					scope.onServed()()
					scope.customersServed = res;
					
					$http({
						method: 'DELETE',
						url: '/api/customer/remove',
						params: {id: scope.customer.id}
					}).then(function(res){
						console.log('response on remove', res);
						scope.onRemoved()()
						scope.message = res.data;
					})
					
				});
				
			};
		}
	}
});



