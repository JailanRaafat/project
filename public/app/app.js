 angular.module('userApp', ['appRoutes', 'userControllers', 'userServices', 'mainController', 'authServices','projectServices','projectControllers','myController','fileUpload'])
.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors');
});