var tech = angular.module('tech', ['ui.router', 'tech.controllers', 'ui.bootstrap']);

tech.run(function($location, $rootScope){
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (current.hasOwnProperty('$$route')) {
            $rootScope.title = current.$$route.title;
        }
    });
});

tech.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('main',{
		url: "/main",
		templateUrl: "templates/main.html",
		controller: "AppCtrl"
	})
	.state('main.students',{
		url: "/students",
		templateUrl: "templates/students.html",
		controller: "StudentsCtrl",
		title: "Students"
	})
	.state('main.devices',{
		url: "/devices",
		templateUrl: "templates/devices.html",
		controller: "DevicesCtrl",
		title: "Devices"
	})
	.state('main.maintenance',{
		url: "/maintenance",
		templateUrl: "templates/maintenance.html",
		controller: "MaintenanceCtrl",
		title: "Maintenance"
	})
	.state('main.reports',{
		url: "/reports",
		templateUrl: "templates/reports.html",
		controller: "ReportsCtrl",
		title: "Reports"
	})
	.state('main.applications',{
		url: "/applications",
		templateUrl: "templates/applications.html",
		controller: "ApplicationsCtrl",
		title: "Applications"
	})
	;

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/main/students');
})