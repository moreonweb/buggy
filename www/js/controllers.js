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

.controller('ProfileCtrl', function($scope, $stateParams ,
	 Profiles, $http,$state,$ionicPopup,$rootScope) {
							

				var r = $stateParams.role;
					if (r == "teamleader") {
						$scope.supersen = true;
					}	
			
// initiate form and radio array of options
		$scope.addn = {};
		$scope.value = [{
			role : "tester" 
			},
			{
				role : "developer"
			} 
		];
		
		// Toggle add member div
		$scope.addfrm = false;
		$scope.addnew = function(){
			$scope.addfrm = $scope.addfrm ? false : true;
		}
		// Toggle add project div
		$scope.addProjectfrm = false;
		$scope.addnewProject = function(){
			$scope.addProjectfrm = $scope.addProjectfrm ? false : true;
		}

		//get tid
		var teamid =  window.localStorage.getItem("tid");

			var addurl = "http://pawanmore.com/bug/process.php";

			// Creting new service for profile stat
			var dataForProfile = "action=profilestat&teamid="+teamid;

			$http({
					method: 'POST',
					url : addurl,
					data : dataForProfile,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function(res){
					console.log(res);
					 var profiledata = res.data;
						if (profiledata) {
							console.log(profiledata);
						}
						else{
							console.log("service not started yet !!!");
						}

				});	

		// Add member function
	$scope.addnewmm = function(){
		console.log($scope.addn);
			

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
				$scope.addp = {};
	// Add project function
			$scope.addnewpp = function(){
					var add_proj_data = "projectname="+$scope.addp.pname+"&projectdesc="+$scope.addp.pdesc+"&teamid="+teamid+"&action=addproject";
					$http({
					method: 'POST',
					url : addurl,
					data : add_proj_data,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function(res){
					console.log(res);
					 var ds = res.data;
						if(ds.status == "success"){
							// var pid = ds.projectid ;
							$ionicPopup.alert({
									content : "Project added !"
							});

							$scope.addProjectfrm = false;
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
			if($scope.frm.uname.length > 0 && $scope.frm.upass.length > 0 
							&& $scope.frm.uemail.length > 0 && $scope.frm.uteam.length > 0 )
			{
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
			else{
				$ionicPopup.alert({
					content : "Please fill the form correctly"
				})
			}
			
		}
})
.controller('loginCtrl', function($scope, $stateParams ,$rootScope,
		$ionicHistory, Profiles,$http,$state,$ionicPopup,$ionicSideMenuDelegate) {
	$ionicSideMenuDelegate.canDragContent(false);
	// check if logged in now ?
	var chklgn = window.localStorage.getItem("islogged");
	var role = window.localStorage.getItem("role");

			if (chklgn == 1) {
				$state.go('app.profile',{role : role});
			}

			 $scope.login = {};
		$scope.loginvrify = function(){
		
				 var uname = $scope.login.username;
          		var upass = $scope.login.password;

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
							var logged = 1;
							//for leader
								if(dd.role == "teamleader"){
									
							window.localStorage.setItem("islogged",logged);
									var tid = dd.teamid;
									window.localStorage.setItem("tid",tid);
									var role = dd.role;
										$rootScope.name = 'sensei';
									window.localStorage.setItem("role",role);
									$state.go('app.profile',{role : role});
										// Disable back on next state
										 $ionicHistory.nextViewOptions({
										            historyRoot: true
										          });
								}
								else  {
									window.localStorage.setItem("islogged",logged);
									var tid = dd.teamid;
									window.localStorage.setItem("tid",tid);
									var role = dd.role;
											
									window.localStorage.setItem("role",role);
									$state.go('app.profile',{role : role});
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
// Logout controller
	$scope.logoutu = function() {   
			   window.localStorage.removeItem("islogged");
				window.localStorage.removeItem("tid");
				$state.go("app.login",{},{reload: true});
	   };

})
/*.controller('DashCtrl', function($scope, $stateParams , Profiles) {
	$scope.profiles = Profiles.all();
})*/
/*.controller('modCtrl', function($scope, $stateParams , Profiles,$http,$state,$ionicPopup,$ionicSideMenuDelegate) {

	
		}

		
})*/
.controller('modMainCtrl', function($scope, $stateParams , Profiles,$http,$state,$ionicPopup,$ionicSideMenuDelegate) {

			var mid = $stateParams.moduleid;

				$scope.prlist = [{
			name : "low" 
			},
			{
				name : "medium"
			},
			{
				name : "high"
			}];

			$scope.statlist = [{status : "pending"},{status : "in progress"},{status : "completed"}];

			var tid = window.localStorage.getItem("tid");
			var url = "http://pawanmore.com/bug/process.php";

					var bugstatd = "action=bugstat&moduleid=" + mid;

						$http({
					method : 'POST',
					url : url,
					data : bugstatd,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function(res){

						$scope.bugsbystatus = res.data;

					});

			// Toggle bug div
			$scope.addBugfrm = false;
		$scope.addnewBug = function(){
			$scope.addBugfrm = $scope.addBugfrm ? false : true;
		}
				

		    

				var ud = "action=moduledetails&teamid="+tid+"&moduleid="+mid;

					$http({
					method : 'POST',
					url : url,
					data : ud,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function(res){

						console.log(res.data);

						$scope.mod_detail_data = res.data;
				});


				// Add new bug
				$scope.bugf = {};

				$scope.addnew_bug = function(){

						var bdata = "action=addbug&moduleid="+mid+"&teamid="+tid+"&bugname="+$scope.bugf.name+"&bugdesc="+
										$scope.bugf.desc+"&bugpriority="+$scope.bugf.priority+"&bugstatus="+$scope.bugf.status;

						$http({
					method : 'POST',
					url : url,
					data : bdata,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function(res){

						console.log(res.data);

						$scope.bug_detail_data = res.data;

						console.log(res);

						 var ds = res.data;
						if(ds.status == "success"){
							$ionicPopup.alert({
									content : "Bug added !"
									 

							});

							 $scope.addBugfrm = false;
						}

				});								

				}

					// Show list of bugs
					// Toggle bug div
			$scope.showbgs = false;
		$scope.showBugs = function(){
			$scope.showbgs = $scope.showbgs ? false : true;
			
			var shdata = "action=showbugs&teamid="+tid+"&moduleid="+mid;

					$http({
					method : 'POST',
					url : url,
					data : shdata,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function(res){

						console.log(res.data);

						

						var ds = res.data;
						console.log(ds.length);
						if(ds == "error"){
							$ionicPopup.alert({
									content : "Module does not have bugs"
									 

							});

							 $scope.showbgs = false;
						} else {
						$scope.bugdata = res.data;
							
						}



				});	

		}
})
.controller('bugDetailCtrl', function($scope, $stateParams , Profiles,$http,$state,
	$ionicPopup,$ionicSideMenuDelegate,$ionicModal) {


			var bugid = $stateParams.bugid;

			var tid = window.localStorage.getItem("tid");
			var url = "http://pawanmore.com/bug/process.php";

				var bd = "action=bugdetail&bugid="+bugid+"&teamid="+tid;

				
				$http({
					method : 'POST',
					url : url,
					data : bd,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function(res){

						console.log(res.data);

						$scope.bugdetail = res.data;

						$scope.selectedpri = $scope.bugdetail.priority;
						$scope.selectedstat = $scope.bugdetail.status; 
				});	
					
					
})
.controller('bugEditCtrl', function($scope, $stateParams , Profiles,$http,$state,$ionicPopup,$ionicSideMenuDelegate) {
						var bugid = $stateParams.bugid;

			var tid = window.localStorage.getItem("tid");
			var url = "http://pawanmore.com/bug/process.php";
			$scope.prlist = [{
			name : "low" 
			},
			{
				name : "medium"
			},
			{
				name : "high"
			}];

			$scope.statlist = [{status : "pending"},{status : "in progress"},{status : "completed"}];

				var bd = "action=bugdetail&bugid="+bugid+"&teamid="+tid;

				
				$http({
					method : 'POST',
					url : url,
					data : bd,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function(res){

						console.log(res.data);

						$scope.bugdetail = res.data;

						$scope.selectedpri = $scope.bugdetail.priority;
						$scope.selectedstat = $scope.bugdetail.status; 
				});	
				
			// Update Bug
			$scope.editbug = {};
				$scope.editbugFrm = function(){
					console.log($scope.editbug);

					console.log($scope.addn);
		
					var bdd = "action=updatebug&bugid="+bugid+"&bugname="+$scope.editbug.name+"&bugdesc="+$scope.editbug.desc+"&bugpriority="+$scope.editbug.priority+"&bugstatus="+$scope.editbug.status;


					$http({
					method : 'POST',
					url : url,
					data : bdd,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function(res){

						console.log(res.data);
				});	

				}


})
.controller('ProjectDetailCtrl', function($scope, $stateParams , Profiles,$http,$state,$ionicPopup,$ionicSideMenuDelegate) {

			var pid = $stateParams.projectid;

						// Toggle
		$scope.addModfrm = false;
		$scope.addnewMod = function(){
			$scope.addModfrm = $scope.addModfrm ? false : true;
		}

					var url = "http://pawanmore.com/bug/process.php";

					

		/*count action...*/
				var countdata = "action=modulestat&projectid="+ pid;

				console.log(countdata);
				// web service
				$http({
					method: 'POST',
					url : url,
					data : countdata,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function(res){
				 var rr = res.data;
						$scope.modulestat = res.data;

			});
			// var tid = window.localStorage.getItem("tid");
		// Add new module
		$scope.modf = {};
		$scope.addnew_mod = function(){


			
				var modname = $scope.modf.mname;
				var moddesc = $scope.modf.mdesc;
				var action = "addmodule";
				var urdata = "modulename="+modname+"&moduledesc="+moddesc+"&action="+action+"&projectid="+pid;
				// web service
				$http({
					method: 'POST',
					url : url,
					data : urdata,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function(res){
					console.log(res);

					 var ds = res.data;
						if(ds.status == "success"){
							$ionicPopup.alert({
									content : "Module added !"


							});

							 $scope.addModfrm = false;
						}




					//{"status":"success"} 
				});
			}
				// Show all modules !!
		$scope.showmds = false;
		$scope.showMods = function(){
			$scope.showmds = $scope.showmds ? false : true;
			var pda = "action=showmodules&projectid="+pid;
				$http({
					method : 'POST',
					url : url,
					data : pda,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function(res){

						console.log(res.data);

						$scope.moddata = res.data;
				});

		}



})
//get list of team members under one leader
.controller('listprojCtrl', function($scope, $stateParams , Profiles,$http,$state,$ionicPopup) {

		var req = "showprojects";
		var teamid =  window.localStorage.getItem("tid");


			if(teamid){
					var lisurl = "http://pawanmore.com/bug/process.php?teamid="+teamid+"&request="+req+"";

					$http.get(lisurl).then(function(res){	
					
					 var ds = res.data;
						$scope.plist = ds;
						});		


			}

});

