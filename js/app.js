
var app=angular.module('myApp',[])
.controller('AppCtrl',function($scope,$http){
  var refresh = function(){
  $http.get('/testcases').success(function(response){
  	$scope.testcases=response;
  	$scope.contact="";
  });
}
refresh();
   $scope.add = function(){
   	console.log($scope.contact);
   	$http.post('/testcases',$scope.contact).success(function(response){
   		console.log("response from database");
   		console.log(response);
   		refresh();
   	});
   };

  $scope.edit = function(id){
  	$http.get('/testcases/'+id).success(function(response){
  		$scope.contact=response;
  		console.log($scope.contact);
  	})
  }
   
   $scope.update = function(){
   	$http.put('/testcases/' + $scope.contact._id, $scope.contact).success(function(response){
   		refresh();
   	});
   }; 


});
