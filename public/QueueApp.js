var app = angular.module('myApp', []);

app.controller('QueueCtrlTest', function($scope, $http) {
	console.log('QUEUE CTRL CONTROLLER RUNNING');
	
		$scope.customers = [];
        $scope.customersServed = [];
		
        _getCustomers();
        _getServedCustomers();

        $scope.onCustomerAdded = function(){
            _getCustomers();
        }

        $scope.onCustomerRemoved = function(){
            _getCustomers();
        }

        $scope.onCustomerServed = function(){
            _getCustomers();
            _getServedCustomers();
        }

        function _getServedCustomers(){
			console.log('_getServedCustomers');
            return $http.get('/api/customers/served').then(function(res){
				console.log('response get served:', res);
                $scope.customersServed = res.data;
            })
        }

        function _getCustomers(){
            return $http.get('/api/customers').then(function(res){
			console.log('response get customer:', res);
                $scope.customers = res.data;
            })
        }
});


