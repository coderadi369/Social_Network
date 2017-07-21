angular.module('CloneApp', ['ui.router','AppController','ngCookies','AppService','ngDialog'])
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
    
}).state('profile',{

  url:'/users/:profile',
  templateUrl:'static/Profile.html',
  controller:'ProfileController'

});

  $locationProvider.html5Mode(true);

}).run(function($state) {
  $state.go('home'); 
});
