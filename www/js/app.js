// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services' ])

.run(function($ionicPlatform , $rootScope, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

     /*$rootScope.authStatus = false;
	 //stateChange event
	  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
		  $rootScope.authStatus = toState.authStatus;
		  if($rootScope.authStatus){
			  
			
		  }
    });*/

	/*$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		console.log("URL : "+toState.url);
		if(toState.url=='/dashboard'){
			console.log("match : "+toState.url);
			$timeout(function(){
				angular.element(document.querySelector('#leftMenu' )).removeClass("hide");
			},1000);
		}	
	});
*/
})
.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

}])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

//--------------------------------------

 .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-signin.html',
        controller: 'loginCtrl'
      }
    }
  })

 .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-signup.html',
        controller: 'signupCtrl'
      }
   }
  })
//--------------------------------------
   .state('app.listmem', {
    url: '/listmem',
    views: {
      'menuContent': {
        templateUrl: 'templates/memberlist.html',
        controller: 'listmemCtrl'
      }
   }
     })
   .state('app.listproj', {
    url: '/listprojects',
    views: {
      'menuContent': {
        templateUrl: 'templates/projectlist.html',
        controller: 'listprojCtrl'
      }
   }
     })
   /*Project Main state*/
   .state('app.project', {
    url: '/project',
    views: {
      'menuContent': {
        templateUrl: 'templates/project.html',
    controller: 'ProjectCtrl'
      }
     }
  })
    .state('app.project-detail', {
    url: '/project-detail/:projectid',
    views: {
      'menuContent': {
        templateUrl: 'templates/project-detail.html',
    controller: 'ProjectDetailCtrl'
      }
     }
  })
/*   .state('app.module', {
    url: '/module',
    views: {
      'menuContent': {
        templateUrl: 'templates/module.html',
        controller: 'modCtrl'
      }
   }
  })*/
    .state('app.module-main', {
    url: '/module-main/:moduleid',
    views: {
      'menuContent': {
        templateUrl: 'templates/module-main.html',
        controller: 'modMainCtrl'
      }
   }
  })
    .state('app.bug-detail', {
    url: '/bug-detail/:bugid',
    views: {
      'menuContent': {
        templateUrl: 'templates/bug-detail.html',
        controller: 'bugDetailCtrl'
      }
   }
  })
  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
		controller: 'DashCtrl'
      }
     }
  })


    .state('app.profiles', {
      url: '/profiles',
      views: {
        'menuContent': {
          templateUrl: 'templates/profiles.html',
          controller: 'ProfilesCtrl'
        }
      }
    })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile-detail.html',
        controller: 'ProfileCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
