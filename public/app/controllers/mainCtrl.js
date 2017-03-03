angular.module('mainController',['authServices'])
.controller('mainCtrl',function(Auth, $timeout,$location,$rootScope){

var app=this;

$rootScope.$on('$routeChangeStart',function(){
	  if (Auth.isLoggedIn()){
    	console.log('success');
    	app.isLoggedIn=true;
    	Auth.getUser().then(function(data){
    		
    		app.username= data.data.username;
    	});
 }else
    {console.log('failure');
    app.isLoggedIn=false; 
    app.username='';
    	   }

});

  
	app.doLogin= function(loginData){
		app.loading=true;
		app.errorMsg=false;

		Auth.login(app.loginData).then(function(data){
          
          if(data.data.success){
  	         app.loading=false;

             app.succcessMsg= data.data.message+' Redirecting....';

             $timeout(function(){
             	$location.path('/about');
             	app.loginData= '';
             	app.successMsg=false;
             }, 2000);
         }                  
            else{ 
            	app.loading=false;
  	          app.errorMsg= data.data.message;
                 }

		});
			};

			app.logout= function(){
				Auth.logout();
				$location.path('/logout');
				$timeout(function(){
					$location.path('/')
				}, 2000);
			};
 });
