angular.module('starter.services', [])

.service('LoginService', function($q) {
    return {
        loginUser: function(name, company) {

            console.log("==LOGIN== CREATE  "+name+" service "+company+"-");
            var deferred = $q.defer();
            var promise = deferred.promise;

            // if (name == "ariel" && company == "piramide") {
                deferred.resolve('Welcome ' + name + '!');
            // } else {
                // deferred.reject('Wrong credentials.');
            // }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            // promise.error = function(fn) {
            //     promise.then(null, fn);
            //     return promise;
            // }
            return promise;
        }
    };
})


.factory('ariel', function ($resource,apiUrlLocal,pathLogon) {
  var url = apiUrlLocal+""+pathLogon;
  console.log('==SERVICE LOGON== RESOURCE',url);
  return $resource(url);
})

//dodooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo

.factory('AuthenticationService', function ($http, SessionService) {

  'use strict';

  return {

    login: function (user) {
      // this method could be used to call the API and set the user instead of taking it in the function params
      SessionService.currentUser = user;
    },
    isLoggedIn: function () {
      return SessionService.currentUser !== null;
    },
    logout: function(){
      SessionService.currentUser = null;
      return SessionService.currentUser;
    }
  };
})

.factory('SessionService', function () {

  'use strict';

  return {
    currentUser: null
  };
})

.factory('RoleService', function ($http) {

  'use strict';

  var adminRoles = ['admin', 'editor'];
  var otherRoles = ['user'];

  return {
    validateRoleAdmin: function (currentUser) {
      return currentUser ? _.contains(adminRoles, currentUser.role) : false;
    },

    validateRoleOther: function (currentUser) {
      return currentUser ? _.contains(otherRoles, currentUser.role) : false;
    }
  };
})
//dodooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://pbs.twimg.com/profile_images/479740132258361344/KaYdH9hE.jpeg'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
});
