
angular.module('authServices', [])

// Factor: Auth handles all login/logout functions  
.factory('Auth', function($http, AuthToken) {
    var authFactory = {}; // Create the factory object
	//User.create(regData);
	authFactory.login= function(loginData){
		return $http.post('/api/authenticate',loginData).then(function(data){
			AuthToken.setToken(data.data.token);
			return data;
		});

	};
	//Auth.isLoggedin();
	 authFactory.isLoggedIn = function() {
        
        if (AuthToken.getToken()) {
            return true; // Return true if in storage
        } else {
            return false; // Return false if not in storage
        }
    };

	authFactory.getUser= function(){
    if(AuthToken.getToken()){
	return $http.post('/api/me');}
	else
	{
		$q.reject({ message :'user has no token'});
	}

	};

    authFactory.logout = function() {
        AuthToken.setToken(); // Removes token from local storage
    };

    return authFactory; // Return object
})

.factory('AuthToken', function($window) {
    var authTokenFactory = {}; // Create factory object

    // Function to set and remove the token to/from local storage
    authTokenFactory.setToken = function(token) {
        // Check if token was provided in function parameters
        if (token) {
            $window.localStorage.setItem('token', token); // If so, set the token in local storage
        } else {
            $window.localStorage.removeItem('token'); // Otherwise, remove any token found in local storage (logout)
        }
    };

    // Function to retrieve token found in local storage
    authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    };

    return authTokenFactory; // Return factory object
})

.factory('AuthInterceptors',function(AuthToken){
	var authInterceptorsFactory= {};
	authInterceptorsFactory.request= function(config){
		var token= AuthToken.getToken();
		if(token) config.headers['x-access-token']=token;
		return config;
	};

	return authInterceptorsFactory;
});

