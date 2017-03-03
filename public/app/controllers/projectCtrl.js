angular.module('projectControllers',['projectServices','authServices'])
.controller('projectCtrl',function($http,Auth,Project,$scope,$rootScope){
 var projectControllers=this;


	this.projectPortfolio= function(projectData){
    
		$scope.projects={};
	projectControllers.errorMsg=false;
    console.log('form submitted');

    Project.create(projectControllers.projectData)
    .then(function(data){
      if( data.data.success){ 
       projectControllers.successMsg= data.data.message;
      }
      else
      {
       projectControllers.errorMsg= data.data.message;
      }


    });
    $rootScope.$on('$routeChangeStart',function(){


});
    Project.getData(projectControllers.projectData).then(function(data){
      
      $scope.projects=data;

    })


      };

       

 });

 

	
