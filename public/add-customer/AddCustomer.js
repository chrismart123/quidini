
app.controller('addCustomer', function($scope, $http) {
	console.log('ADD CTRL CONTROLLER RUNNING');
});

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



