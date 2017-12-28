// Need to add the routing library (angular-route.min.js) as a dependency to use $routeProvider
// Need to add the animation library (angular-animate.min.js) as a dependency to use animations
var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);

// any logic that needs to be in place before app runs
// - $routeProvider via ngRoute library
// - $locationProvider allows URLs to not use "#" prefix, but requires server-side rewrites (varies on server)
myNinjaApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  // also need to:
  // - add base href="/" to head tag in index.html
  // - configure server to handle rewrites (i.e. Apache - .htaccess file as in tutorial video)
  // $locationProvider.html5Mode(true);

  // an alternative that doesn't require the base tag in index.html
  // $locationProvider.html5Mode({
  //   enabled: true,
  //   requireBase: false
  // });

  $routeProvider
    .when('/home', {
      templateUrl: 'app/views/home.html',
      controller: 'NinjaController'
    })
    .when('/contact', {
      templateUrl: 'app/views/contact.html',
      controller: 'ContactController'
    })
    .when('/contact-success', {
      templateUrl: 'app/views/contact-success.html',
      controller: 'ContactController'
    })
    .when('/directory', {
      templateUrl: 'app/views/directory.html',
      controller: 'NinjaController'
    })
    .otherwise({
      redirectTo: '/home'
    });

}]);


// app.run fires off when app first runs
// myNinjaApp.run(function(){});


// Custom directive to populate home view
myNinjaApp.directive('randomNinja', [function(){

  return {
    // restrict directive to be used in a certain way:
    // - E = can only use directive as an element
    // - A = can only use as an attribute
    // - also C & M (legacy - classes & comments)
    restrict: 'E',
    // create an isolate scope so directive has its own scope
    // - get the data from the NinjaController and map it into isolate scope
    scope: {
      ninjas: '=',  // bind ninjas property to value of ninja attribute in random-ninja element
      title: '='
    },
    // passing in the isolate scope
    // template: '{{ title }}',  // test to verify scope access
    // template: '<img ng-src="{{ ninjas[0].thumb }}" />',  // another test
    // template: '<img ng-src="{{ ninjas[random].thumb }}" />',  // randomized
    templateUrl: 'app/views/random.html',
    // use "transclude: true" to allow nested HTML in custom directive
    transclude: true,
    // replaces custom element name with outermost element in templateUrl's HTML (typically div)
    // - better for HTML5 standards compliance
    replace: true,
    // define logic for template - typically DOM manipulation here
    controller: function($scope) {

      // Generate a random number between 0 and 3
      $scope.random = Math.floor(Math.random() * 4);
    }
  };

}]);


// To use $http service, need to include as a dependency
myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http){

  // Called via X buttons, removes the specified ninja from $scope.ninjas object
  $scope.removeNinja = function(ninja) {

    // look for the index of the ninja passed into function
    var removedNinja = $scope.ninjas.indexOf(ninja);

    // .splice method removes element from array and cleans up resulting gap
    $scope.ninjas.splice(removedNinja, 1);
  };


  // Called via ng-submit's addNinja() on form
  $scope.addNinja = function() {

    $scope.ninjas.push({
      name: $scope.newNinja.name,
      belt: $scope.newNinja.belt,
      rate: parseInt($scope.newNinja.rate),  // turn string into an integer
      available: true
    });

    $scope.newNinja = {};  // set newNinja object to empty to clear form fields
  };

  // Called via ng-click in "a" tag on directory.html
  $scope.removeAll = function() {

    // remove all ninjas by setting object to an empty array
    // - use stagger animation effect so ninjas leave one-by-one
    $scope.ninjas = [];
  };

  // Use $http.get to retrieve data from JSON file
  $http.get('app/data/ninjas.json').then(
    function(response){
      $scope.ninjas = response.data;
    },
    function(error) {
      console.log("Error message: ", error);
    }
  );

}]);


// Used to redirect to contact-success route when contact form submitted via ng-submit
myNinjaApp.controller('ContactController', ['$scope', '$location', function($scope, $location) {

  $scope.sendMessage = function() {

    // specify the route to redirect to when function is called
    $location.path('/contact-success');

  };

}]);


// myNinjaApp.controller('NinjaController', ['$scope', function($scope){
  
  // typically want to access data via external JSON file/data
  // $scope.ninjas = [
  //   {
  //     name: "Yoshi",
  //     belt: "green",
  //     rate: 50,
  //     available: true,
  //     thumb: "app/img/yoshi.png"
  //   },
  //   {
  //     name: "Crystal",
  //     belt: "blue",
  //     rate: 30,
  //     available: true,
  //     thumb: "app/img/crystal.png"
  //   },
  //   {
  //     name: "Ryu",
  //     belt: "orange",
  //     rate: 10,
  //     available: true,
  //     thumb: "app/img/ryu.png"
  //   },
  //   {
  //     name: "Shaun",
  //     belt: "black",
  //     rate: 1000,
  //     available: true,
  //     thumb: "app/img/shaun.png"
  //   }
  // ];

    // To convert an object to JSON format
    // console.log(angular.toJson($scope.ninjas));

    // Converted
    // [{"name":"Yoshi","belt":"green","rate":50,"available":true,"thumb":"app/img/yoshi.png"},{"name":"Crystal","belt":"blue","rate":30,"available":true,"thumb":"app/img/crystal.png"},{"name":"Ryu","belt":"orange","rate":10,"available":true,"thumb":"app/img/ryu.png"},{"name":"Shaun","belt":"black","rate":1000,"available":true,"thumb":"app/img/shaun.png"}]

    // Can prettify via jsonlint.com - paste & hit Validate JSON:
    // [{
    //   "name": "Yoshi",
    //   "belt": "green",
    //   "rate": 50,
    //   "available": true,
    //   "thumb": "app/img/yoshi.png"
    // }, {
    //   "name": "Crystal",
    //   "belt": "blue",
    //   "rate": 30,
    //   "available": true,
    //   "thumb": "app/img/crystal.png"
    // }, {
    //   "name": "Ryu",
    //   "belt": "orange",
    //   "rate": 10,
    //   "available": true,
    //   "thumb": "app/img/ryu.png"
    // }, {
    //   "name": "Shaun",
    //   "belt": "black",
    //   "rate": 1000,
    //   "available": true,
    //   "thumb": "app/img/shaun.png"
    // }]

// }]);


// Tutorial 12 (ng-show, ng-hide)
// myNinjaApp.controller('NinjaController', ['$scope', function($scope){

//   $scope.ninjas = [
//     {
//       name: "Yoshi",
//       belt: "green",
//       rate: 50,
//       available: true
//     },
//     {
//       name: "Crystal",
//       belt: "yellow",
//       rate: 30,
//       available: true
//     },
//     {
//       name: "Ryu",
//       belt: "orange",
//       rate: 10,
//       available: false
//     },
//     {
//       name: "Shaun",
//       belt: "black",
//       rate: 1000,
//       available: true
//     }
//   ];

// }]);


// controller controls app data
// - different controllers control different parts of the app
// - use an array to include dependencies and function to protect for minification
// myNinjaApp.controller('NinjaController', ['$scope', function($scope){

  // $scope object accessible in view and controller
  // $scope.message = "hey y'all";

  // $scope.ninjas = ['yoshi', 'crystal', 'ryu', 'shaun'];

// }]);