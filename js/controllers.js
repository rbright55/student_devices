var webserver = 'localhost';
angular.module('tech.controllers', ['ui.bootstrap', 'ui.router'])

.controller('AppCtrl', function($scope, $http, $state, $rootScope, $modal, $log){
	$scope.getStudents = function(){
	$http.get("http://"+webserver+"/ip2/students.php")
      .success(function (response) {$scope.students = response.records; $log.info(response.sql);});
      var students = $scope.students;
    return students;
	};
	$scope.getDevices = function(){
	$http.get("http://"+webserver+"/ip2/devices.php")
      .success(function (response) {$scope.devices = response.records; $log.info(response.sql);});
      var devices = $scope.devices;
    return devices;
	};
	$rootScope.getTickets = function(opentics){
	$http.get("http://"+webserver+"/ip2/tickets.php?opentics="+opentics)
      .success(function (response) {$scope.tickets = response.records; $log.info(response.sql); $log.info(response.csql);});
      var tickets = $scope.tickets;
    return tickets;
	};
})
.controller('StudentsCtrl',function($scope, $rootScope, $http, $log, $state){
	$rootScope.title = $state.current.title;
	$scope.getStudents();

	$scope.edit = true;
	$scope.incomplete = true; 

	$scope.editStudent = function(id) {
	  	if (id == 'new') {
		    $scope.edit = true;
		    $scope.incomplete = true;
		    $scope.sid = ''
		    $scope.fName = '';
		    $scope.lName = '';
		    $scope.username = '';
		    $scope.grade = '';
		    $scope.homeroom = '';
		    $scope.ipadnum = '';
	    } else {
		    $scope.edit = false;
		    $scope.sid = $scope.students[id].sid;
		    $scope.fName = $scope.students[id].fname;
		    $scope.lName = $scope.students[id].lname; 
		    $scope.username = $scope.students[id].username;
		    $scope.grade = parseInt($scope.students[id].grade, 10);
		    $scope.homeroom = $scope.students[id].hroom;
		    $scope.ipadnum = parseInt($scope.students[id].ipadnum, 10);
	  	}
	};
	$scope.$watch('fName', function() {$scope.test();});
	$scope.$watch('lName', function() {$scope.test();});

	$scope.test = function() {
	  if ($scope.edit && (!$scope.fName ||
	  !$scope.lName )) {
	       $scope.incomplete = true;
	  }else{
	  	$scope.incomplete = false;
	  }
	};
	$scope.addStudent= function(){
	    var request = $http({
            method: "POST",
            url: "http://"+webserver+"/ip2/update.php",
            crossDomain : true,
            data: {
            	studentid: $scope.sid,
                fname: $scope.fName,
                lname: $scope.lName,
                username: $scope.username,
                grade: $scope.grade,
                homeroom: $scope.homeroom,
                ipadnum: $scope.ipadnum
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function(data) {
            $log.info(data);
            $scope.sid = ''
		    $scope.fName = '';
		    $scope.lName = '';
		    $scope.username = '';
		    $scope.grade = '';
		    $scope.homeroom = '';
		    $scope.ipadnum = '';
            $state.reload();
        });
	};
})
.controller('DevicesCtrl',function($scope, $rootScope, $log, $state, $http){
	$rootScope.title = $state.current.title;
	$scope.getDevices();
	$scope.edit = true;
	$scope.incomplete = true;
	$scope.editDevice = function(id) {
	  	if (id == 'new') {
		    $scope.edit = true;
		    $scope.incomplete = true;
		    $scope.did = '';
		    $scope.serial = '';
		    $scope.dstatus = 0;
	    } else {
		    $scope.edit = false;
		    $scope.did = parseInt($scope.devices[id].did, 10);
		    $scope.serial = $scope.devices[id].serial;
		    $scope.dstatus = $scope.devices[id].statusid;
		    $log.info($scope.statusid);
	  	}
	};
	$scope.$watch('did', function() {$scope.testdevice();});
	$scope.$watch('serial', function() {$scope.testdevice();});

	$scope.testdevice = function() {
	  
	  if ($scope.edit && (
	  !$scope.serial )) {
	       $scope.incomplete = true;
	  } else{
	  	$scope.incomplete = false;
	  }
	};

	$scope.addDevice= function(){
	    var request = $http({
            method: "POST",
            url: "http://"+webserver+"/ip2/update.php",
            crossDomain : true,
            data: {
                did: $scope.did,
                serial: $scope.serial,
                status: $scope.dstatus
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function(data) {
            $log.info(data);
            $state.reload();
            $scope.did = '';
		    $scope.serial = '';
        });
	};
	$scope.getStat = function(){
		$http.get("http://"+webserver+"/ip2/status.php")
	      .success(function (response) {$scope.stats = response.records; $log.info(response.sql);});
	      var stats = $scope.stats;
	    return stats;
	};
	$scope.getStat();
})
.controller('MaintenanceCtrl',function($scope, $rootScope, $state, $modal, $log, $http){
	$rootScope.title = $state.current.title;
	$scope.ctickets = true;
	$scope.getTickets($scope.ctickets);
	$scope.opentic = function (tic) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: 'templates/ticket.html',
	      controller: 'TicketCtrl',
	      size: 'lg',
	      resolve: {
	        tic: function () {
	          return tic;
	        }
	      }
	    });
	};
	$scope.showClosed = function(){
		$scope.ctickets = $scope.ctickets === false ? true: false;
		$scope.getTickets($scope.ctickets);
	}
})
.controller('TicketCtrl',function($scope, $modalInstance, $http,$log, $state, tic){
	$scope.tt = tic;
	$scope.ok = function () {
		$state.reload();
    	$modalInstance.close();
	};
	$scope.addComment= function(){
		
		var newcom = $scope.newcomment;
	    var request = $http({
            method: "POST",
            url: "http://"+webserver+"/ip2/update.php",
            crossDomain : true,
            data: {
                newcomment: newcom,
                tid: tic.Ticketnum
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function(data) {
                $log.info(data);
                $scope.ok();
        });
	};
	$scope.getStat = function(){
		$http.get("http://"+webserver+"/ip2/status.php")
	      .success(function (response) {$scope.stats = response.records; $log.info(response.sql);});
	      var stats = $scope.stats;
	    return stats;
	};
	$scope.getStat();
	$scope.updateStatus = function(){
		var request = $http({
            method: "POST",
            url: "http://"+webserver+"/ip2/update.php",
            crossDomain : true,
            data: {
                upstatus: $scope.dstatus,
                updid: $scope.tt.iPadnum
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function(data) {
                $log.info(data);
        });
	}
	$scope.closeopenTicket = function(closet){
		var request = $http({
            method: "POST",
            url: "http://"+webserver+"/ip2/update.php",
            crossDomain : true,
            data: {
                tid: tic.Ticketnum,
                close: closet
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function(data) {
                $log.info(data);
                $scope.ok();
        });
	}
})
.controller('ApplicationsCtrl', function($scope, $rootScope, $state){
	$rootScope.title = $state.current.title;
})