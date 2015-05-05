
angular.module('starter.contactroutes', ['starter.contactcontrollers'])


.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider.state('app.contacts', {
    url: '/contacts',
    cache: false,
    views: {
      'menuContent': {
       controller: 'ContactsCtrl',
       templateUrl: 'templates/views_contact/contactslist.html'
      }
    }
  })
  
  $stateProvider.state('app.search', {
    url: '/parameter(contactSearchName)',
  })

  $stateProvider.state('app.contact', {
    url: "/contact?contactId&addressId&contactPersonId&addressType",
    cache: true,
    views: {
      'menuContent': {
        templateUrl: "templates/views_contact/contact.html",
        controller: 'ContactCtrl'
      }
    }
  })

  $stateProvider.state('app.newperson', {
    url: "/newperson",
    cache: true,
    views: {
      'menuContent': {
        templateUrl: "templates/views_contact/newperson.html",
        controller: 'newpCtrl'
      }
    }
  })

  $stateProvider.state('app.editPerson', {
    url: "/editPerson",
    cache: true,
    views: {
      'menuContent': {
        templateUrl: "templates/views_contact/newperson.html",
        controller: 'editPersonCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
  
});
