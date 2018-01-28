
var app=angular.module('myApp',[])
.controller('AppCtrl',function($scope,$http){

  var list = [];
  var refresh = function(){
  $http.get('/testcases').success(function(response){
  	$scope.testcases=response;
    list=response;
  	$scope.contact="";
  });
}
refresh();
   $scope.add = function(){
    var status;
    var fields=$scope.contact;
    fields['status']=false;
   	$http.post('/testcases',fields).success(function(response){
   		refresh();
   	});
   };

  $scope.edit = function(id){
  	$http.get('/testcases/'+id).success(function(response){
  		$scope.contact=response;
  	})
  }
   
   $scope.update = function(){
   	$http.put('/testcases/' + $scope.contact._id, $scope.contact).success(function(response){
   		refresh();
   	});
   }; 


   $scope.runIt = function(){
        $http.get('/testcases/').success(function(response){
          $scope.testcases=response;
          console.log('response from backend');
          console.log(response);
        })
      } 
     


});
