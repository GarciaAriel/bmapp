angular.module('starter.rolescontrollers', ['starter.rolesservices'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup) {
  
  //call services data
  // Contacts.all();
  //MailList.all();
  // TaskList.all();

  //var firstUse = $localstorage.get("starter",null);
  var firstUse = null;
  if(firstUse == null){ //if first time
    // Contacts.all();
    // MailList.all();
  }
  else{

  }

})


.controller('DashCtrl', function($scope) {})

.controller('LoginController', function (LoginService,apiUrlLocal,pathLogon,$ionicPopup,$scope,$ionicModal, AuthenticationService,$state,$http) {
    'use strict';

    $scope.data = {};

    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    $scope.doLogin = function() {
      console.log('==LOGIN== HTTP POST REQUEST', $scope.data);
      $state.go('app');
      // Simple POST request
      $http({
        method: 'POST',
        url: apiUrlLocal+""+pathLogon,
        data: {"dto(login)":$scope.data.username, "dto(companyLogin)":$scope.data.company, "dto(password)":$scope.data.password, "dto(language)":"en","dto(rememberInfo)":true}
      }).success(function(data, status, headers, config) {
        console.log('==LOGIN== REQUEST SUCCESS OK');


        // console.log(headers('UserLastLogin'));
        
        var auxiliary = "/"+data+"/";
        var size = auxiliary.length;
        if( size>4 )
        {
          console.log(size);
          console.log("DATA: ",data);
          console.log("status: ",status);
          console.log("headers: ",headers);
          console.log("CONFIG: ",config);

          AuthenticationService.login({name: $scope.data.username, company: $scope.data.company});
          $scope.closeLogin();
          $state.go('app');
        }
        else
        {
          var alertPopup = $ionicPopup.alert({
                title: 'Log on, Failed!',
                template: 'Please check your credentials!'
            });
          $state.go('/login');
        }
      }).
      error(function(data, status, headers, config) {
       console.log('==LOGIN== ERROR', data);
      });

    };

})

.controller('logoutController', function($scope, $state,AuthenticationService){
    'use strict';
    AuthenticationService.logout();
})

//dooooooooooooooooooooooooooooooooooooooooooo

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('app');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Log on, Failed!',
                template: 'Please check your credentials!'
            });
        });
    }
});