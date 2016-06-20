/* All App js */
'use strict'

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

/* DIRECTIVES */
app.directive('addCustomer', function($http){
	return {
            restrict: 'E',
            scope:{
                onAdded: '&'
            },
            templateUrl:'/add-customer/add-customer.html',
            link: function(scope){

                scope.products = [
                    {name: 'Grammatical advice'},
                    {name: 'Magnifying glass repair'},
                    {name: 'Cryptography advice'}
                ];

                scope.addCustomer = function(){

                }
				scope.add = function(customer){
					$http({
						method: 'POST',
						url: '/api/customer/add',
						params: customer
					}).then(function(res){
						console.log('success on add', res);
						console.log('this will be queud list', scope);
						
						scope.onAdded()()
					});
					console.log('i am clicked', customer);
				}
            }
        }
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

