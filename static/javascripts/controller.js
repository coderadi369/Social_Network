angular.module('AppController', [])
.controller('RegisterController', function($scope,$http) {
 
  $scope.submit_data = function() {
        
        console.log($scope.user_name);
        console.log($scope.email_id);
        console.log($scope.password);
        console.log($scope.confirm_password);

        
        var obj={
        	'username':$scope.user_name,
        	'password':$scope.password,
        	'email':$scope.email_id
        };


        var res = $http.post('/api/v1/accounts/', obj);
		res.then(function(data, status, headers, config) {
			
			console.log(data);
			alert("Success function called");
		});
		res.catch(function(data, status, headers, config) {
            alert("failure function called");
			//alert( "failure message: " + JSON.stringify({data: data}));
		});	


        $scope.user_name="";
        $scope.email_id="";
        $scope.password=""; 
        $scope.confirm_password="";
    };

}).controller('LoginController',function($scope,$http,$window,$cookies){


  console.log("Login Controller is being called");

   


  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}





    function setAuthenciatedAccount(data)                 //Set Authenciation
    {
         console.log("Enterd here");
         $cookies.AuthenciatedAccount=JSON.stringify(data);
         console.log($cookies.AuthenciatedAccount);
    }
    


    function unauthenticate() {                            //Unset Authenciation
         delete $cookies.AuthenciatedAccount;
    }



    function isAuthenticated() {
     return !!$cookies.AuthenciatedAccount;
    }

  
    if(isAuthenticated())
    {
        $window.location.href="/";
    }
    

    $scope.submit_data=function()

    {

    var csrftoken = getCookie('csrftoken');
    console.log(csrftoken);

	var obj=
	{
		'email':$scope.email_id,
		'password':$scope.password
	}



   
    //$httpProvider.defaults.xsrfCookieName = 'csrftoken';
    //$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

  
    $http.defaults.headers.common['X-CSRFToken'] = csrftoken;

    var res=$http.post('/api/v1/auth/login/',obj);

    console.log(res);

    res.then(function(data,status,headers,config)
    {
    	console.log(data);
    	setAuthenciatedAccount(data.data);
    	//$window.location.href="/";
    });
    res.catch(function(data,status,headers,config)
    {
    	alert("user name and password do not match");
    });
  
  };

}).controller('HomeController', function($scope,$http,$window){

   console.log("Home controller is being called");

   $scope.signout = function() {
       console.log("logout is being asked");

   };

}).controller('NavController',function($scope,$http,$window){

    console.log("Nav controller is called");

    
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


    $scope.logout = function ()
    {
          console.log("Logout function is being clciked");
    
          var csrftoken = getCookie('csrftoken');

           $http.defaults.headers.common['X-CSRFToken'] = csrftoken;

          var res=$http.post('/api/v1/auth/logout/');

          res.then(function(data,status,headers,config)
          {
              $window.location.href="/";
          });

    };
});







