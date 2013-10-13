// Aplicación
var appAdmin = angular.module('AdminUser', ['ngResource']);

// Configuración de Ruteo 
appAdmin.config(function ($routeProvider){
	$routeProvider
	.when(
		'/',
		 { controller: 'AdminCtrl', templateUrl: 'js/partials/module_users.html' }
	)
	.otherwise({ redirectTo: '/' });
});

// Métodos de GET/POST/PUT/DELETE
appAdmin.service('userService', ['$http', function ($http) {
	var urlBase = '/user';
	
	this.getUsers = function () {
		return $http.get('/users');	
	}

	this.getUser = function (id) {
		return $http.get(urlBase + '/' + id);	
	}

	this.addUser = function (user) {
		return $http.post(urlBase, user);
	}

	this.updateUser = function (user) {
		return $http.put(urlBase, user);
	}

	this.deleteUser = function (id) {
		return $http.delete(urlBase + '/' + id);
	}

}]);

// Objeto de los Controladores
var controllers = {};

// Controlador de los Usuario
controllers.AdminCtrl = function  ($scope, userService) {
	
	getUsers();
	$scope.View = { update: false };

	// Método para Obtener Usuarios
	function getUsers () {
		userService.getUsers()
		.success(function (data) {
			$scope.users = data.users;
		})
		.error(function (data) {
			console.log(data);
		});
	}

	// Método para Agregar un Nuevo Usuario
	$scope.addUser = function () {
		var User = $scope.User;
		userService.addUser(User)
		.success(function (data) {
			$scope.User = {};
			getUsers();
		}).error(function (data) {
			console.log(data);
		});
	}

	// Método para Obtener Usuario
	$scope.getUser = function (id) {
		userService.getUser(id)
		.success(function (data) {
			$scope.User = data.user;
			$scope.View.update = true; 
		})
		.error(function (data) {
			console.log(data);
		});
	}

	// Método para Actualizar Usuario
	$scope.updateUser = function () {
		var User = $scope.User;
		userService.updateUser(User)
		.success(function (data) {
			$scope.User = {};
			$scope.View.update = false;
			getUsers();
		})
		.error(function (data) {
			console.log(data);
		});
	}

	// Método para Eliminar Usuario
	$scope.deleteUser = function (id) {
		userService.deleteUser(id)
		.success(function (data) {
			$scope.User = {};
			$scope.View.update = false;
			getUsers();
		})
		.error(function (data) {
			console.log(data);
		});
	}

}

appAdmin.controller(controllers);