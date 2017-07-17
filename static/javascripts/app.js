angular.module('CloneApp', ['ui.router','AppController','ngCookies'])
.config(function($stateProvider, $locationProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl:'static/Home.html',
    controller:'HomeController'
    
 }).state('register', {

   url: '/register',
   templateUrl:'static/Register.html',
   controller:'RegisterController'
}).state('login', {
   
   url:'/login',
   templateUrl:'static/Login.html',
   controller:'LoginController'
    
});

  $locationProvider.html5Mode(true);

}).run(function($state) {
  $state.go('home'); 
});
