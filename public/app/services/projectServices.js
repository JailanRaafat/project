angular.module('projectServices', [])

	.factory('Project', function($http) {
		var projectFactory = {}; // Create the project object
		// User.create(regData)
		projectFactory.create = function(projectData) {
			return $http.post('/api/projects', projectData); 
			
				
			
		};
		projectFactory.getData= function(projectData){
		return $http.get('/api/viewprojects', projectData);

		}
		


		return projectFactory;


	});

	
