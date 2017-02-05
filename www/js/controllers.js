angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,  $location, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  //--------------------------------------------
   $scope.login = function(user) {
			
		if(typeof(user)=='undefined'){
			$scope.showAlert('Please fill username and password to proceed.');	
			return false;
		}

		if(user.username=='demo@gmail.com' && user.password=='demo'){
			$location.path('/app/dashboard');
		}else{
			$scope.showAlert('Invalid username or password.');	
		}
		
	};
  //--------------------------------------------
  $scope.logout = function() {   $location.path('/app/login');   };
  //--------------------------------------------
   // An alert dialog
	 $scope.showAlert = function(msg) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Warning Message',
		 template: msg
	   });
	 };
  //--------------------------------------------
})

.controller('ProfilesCtrl', function($scope , Profiles) {
    $scope.profiles = Profiles.all();
})

.controller('ProfileCtrl', function($scope, $stateParams , Profiles, $http,$state,$ionicPopup) {
// initiate form and radio array of options
		$scope.addn = {};
		$scope.value = [{
			role : "tester" 
			},
			{
				role : "developer"
			} 
		];
		//get tid
		$scope.addfrm = false;
		$scope.addnew = function(){
			$scope.addfrm = $scope.addfrm ? false : true;
		}
		var teamid =  window.localStorage.getItem("tid");

	$scope.addnewmm = function(){
		console.log($scope.addn);
			var addurl = "http://pawanmore.com/bug/process.php";

			var add_data = "username="+$scope.addn.username+"&teamid="+teamid+"&email="+$scope.addn.useremail+"&action=adduser&userrole="+$scope.addn.userrole;

			$http({
					method: 'POST',
					url : addurl,
					data : add_data,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function(res){
					console.log(res);
					 var ds = res.data;
						if(ds.status == "success"){
							$ionicPopup.alert({
									content : "Member added !"
							});

							$scope.addfrm = false;
						}
				});		
	}
})
//get list of team members under one leader
.controller('listmemCtrl', function($scope, $stateParams , Profiles,$http,$state,$ionicPopup) {

		var req = "getlist";
		var teamid =  window.localStorage.getItem("tid");


			if(teamid){
					var lisurl = "http://pawanmore.com/bug/process.php?teamid="+teamid+"&request="+req+"";

					$http.get(lisurl).then(function(res){
					
					 var ds = res.data;
						$scope.list = ds;
										});		


			}

})
.controller('signupCtrl', function($scope, $stateParams , Profiles,$http,$state,$ionicPopup,$ionicSideMenuDelegate) {
		$ionicSideMenuDelegate.canDragContent(false);

	$scope.frm = {};
		$scope.signupbg = function(){
			if ($scope.frm.uname != "" && $scope.frm.uname != "" && $scope.frm.uname != "" && $scope.frm.uname != "" && $scope.frm.uname != "" ) {
					

			var arr = "name=" +$scope.frm.uname+ "&pass=" +$scope.frm.upass + "&action=register&email=" + $scope.frm.uemail + "&team=" +$scope.frm.uteam +"";

					console.log(arr);
					var url = "http://pawanmore.com/bug/process.php";
				$http({
					method: 'POST',
					url : url,
					data : arr,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function(res){
					console.log(res);
					 var ds = res.data;
					 if (ds.status == "success") {

					 		$state.go('app.login');
					 }
				});		

			}
		}
})
.controller('loginCtrl', function($scope, $stateParams , Profiles,$http,$state,$ionicPopup,$ionicSideMenuDelegate) {
	$ionicSideMenuDelegate.canDragContent(false);
	// check if logged in now ?
	var chklgn = window.localStorage.getItem("islogged");

			if (chklgn == 1) {
				$state.go('app.profile');
			}

			$scope.login = {};
		$scope.loginvrify = function(){
				var d = "email="+$scope.login.username+"&pass="+$scope.login.password+"&action=login";
				var url = "http://pawanmore.com/bug/process.php";
				$http({
					method: 'POST',
					url : url,
					data : d,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function(res){
					console.log(res);
						var dd = res.data;
						if(dd.status == "success"){
							//for leader
								if(dd.role == "teamleader"){
									var logged = 1;
							window.localStorage.setItem("islogged",logged);
									var tid = dd.teamid;
									window.localStorage.setItem("tid",tid);
									$state.go('app.profile');
								}
								else {
									$state.go('app.profiles');
								}
						}
						else {
							$ionicPopup.alert({
								content : "Wrong username or password, please try again"
							});
								$scope.login = {};
						}
				});	
		}
})
.controller('DashCtrl', function($scope, $stateParams , Profiles) {
	$scope.profiles = Profiles.all();
});

