angular.module('userControllers',['userServices'])
.controller('regCtrl',function($http,$location,User){
 var app=this;


	this.regUser= function(regData){
    console.log('testing');
		app.loading=true;
		app.errorMsg=false;

		User.create(app.regData)
		.then(function(data){
          if(data.data.success){
  	         app.loading=false;
             app.successMsg= data.data.message;
             $location.path('/');
                                }
            else{ app.loading=false;
  	          app.errorMsg= data.data.message;
                 }

		});
			};
 });

// http://localhost:9080/api/users
