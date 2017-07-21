angular.module('AppService',[])
.factory('GetCookie',function()
{
	var y={};
	y.getcookie=function (name) {
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



  return y;

})
.factory('Registerfactory',['GetCookie','$http',function(GetCookie,$http){

  

   var res = {};

   res.register=function(obj)
   {
   	   var y=GetCookie.getcookie('csrftoken');
       $http.defaults.headers.common['X-CSRFToken'] = y;
   	   return ($http.post('/api/v1/accounts/', obj));
   }


   return res;

  

}])
.factory('Loginfactory',['GetCookie','$http',function(GetCookie,$http){

   var res={};

   res.login=function(obj)
   {
   	var y=GetCookie.getcookie('csrftoken');
   	$http.defaults.headers.common['X-CSRFToken']=y;
   	return ($http.post('/api/v1/auth/login/',obj));
   }
 
   return res;

}]).factory('Profilefactory',['GetCookie','$http',function(GetCookie,$http){

   var res={};

   res.getposts=function(user)
   {
    var y=GetCookie.getcookie('csrftoken');
    $http.defaults.headers.common['X-CSRFToken']=y;
    return ($http.get('/api/v1/accounts/'+user+'/posts/'));
   };
 
   return res;

}])
.factory('Logoutfactory',['GetCookie','$http',function(GetCookie,$http){

           var res={};
           res.logout=function()
           {
              var y=GetCookie.getcookie('csrftoken');
              $http.defaults.headers.common['X-CSRFToken']=y;
              return ($http.post('/api/v1/auth/logout/'));
           }
           return res;

}])
.factory('Postfactory',['GetCookie','$http',function(GetCookie,$http){

	var x={};

	x.all=function()
	{
    //console.log("Entered here");
		var y=GetCookie.getcookie('csrftoken');
		$http.defaults.headers.common['X-CSRFToken']=y;
		return ($http.get('/api/v1/posts/'));
	}

	x.create=function(obj)
	{
    console.log(obj);
	  var y=GetCookie.getcookie('csrftoken');
		$http.defaults.headers.common['X-CSRFToken']=y;
		return ($http.post('/api/v1/posts/',obj));	
	}

	x.get=function(username)
	{
		var y=GetCookie.getcookie('csrftoken');
		$http.defaults.headers.common['X-CSRFToken']=y;
		 return ($http.get('/api/v1/accounts/' + username + '/posts/'));
	}

  return x;

}])
.service('Authenciationfactory',['$cookies',function($cookies){
  
   var x={};

   x.setAuthenciatedAccount=function(account)
   {
   	  $cookies.authenciatedaccount=JSON.stringify(account);
   }

   x.unauthenciate=function()
   {
   	  delete $cookies.authenciatedaccount;
   }

   x.isauthenciated=function()
   {
   	  return !!$cookies.authenciatedaccount;
   }

   x.getauthenciationdetails=function(account)
   {
      return $cookies.authenciatedaccount;
   }

   return x;

}]);