angular.module('AppController', [])
.directive('posts',function(){

  console.log("Entered here"); 

 

    return{

       scope:{
        
           value:'='

         },
       
       template:'<ul  class="listgroup" ><li class="list-group-item" ng-repeat="x in value"> {{x.content}} </li>  </ul>  '

    };

}).directive('profileposts',function()
{

   return{
       scope:{

          val:'='

       },
    
       template:'<ul  class="listgroup" ><li class="list-group-item" ng-repeat="x in val"> {{x.content}} </li>  </ul>  '  

   };

})
.directive('header',function()
{
  console.log("Entered here");

  return {

    scope:{

      res:'@',
      profile: '@',
      logout:'&'
    } ,

     templateUrl:'static/navbar.html'
  };
})
.controller('RegisterController',function($scope,Registerfactory,Authenciationfactory) {
 

  console.log(Authenciationfactory.isauthenciated());

  $scope.submit_data = function() {
        
        var obj={
        	'username':$scope.user_name,
        	'password':$scope.password,
        	'email':$scope.email_id
        };

        
        var res = Registerfactory.register(obj);
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

}).controller('LoginController',function($scope,$http,$window,$cookies,Loginfactory,Authenciationfactory,$location){


  

    $scope.submit_data=function()

    {

     var obj=
	  {
		'email':$scope.email_id,
		'password':$scope.password
	  }




    var res=Loginfactory.login(obj);

    console.log(res);

    res.then(function(data,status,headers,config)
    {
    	console.log(data);
    	Authenciationfactory.setAuthenciatedAccount(data.data);
        console.log(Authenciationfactory.isauthenciated());
        $location.path("/");
       
    });
    res.catch(function(data,status,headers,config)
    {
    	alert("user name and password do not match");
    });
  
};
   

}).controller('HomeController', function($scope,$http,$window,Authenciationfactory,$cookies,Postfactory){

  $scope.res=Authenciationfactory.isauthenciated();

   console.log($scope.res);

   console.log("Home controller is being called");

   //var vm=this;

   isauthenciated=Authenciationfactory.isauthenciated();

   $scope.post_data=[];

   $scope.temp="this is adithya";

   console.log($scope.temp);

   activate();

   //console.log(vm.posts)

   function activate()
   {
      var result=Postfactory.all();
      result.then(function(data,status,headers,config){

       console.log(data); 
    
        $scope.post_data=data.data;

        console.log("post data is ",$scope.post_data);

      });
      result.catch(function(data,status,headers,config){
     
        console.log("failed to load data");

      })

   }
   
    

}).controller('NavController',function($scope,$http,$window,$location,Authenciationfactory,Logoutfactory){

    console.log("Nav controller is called");

     $scope.res=Authenciationfactory.isauthenciated();

     console.log($scope.res);

     if($scope.res)
     {

       $scope.profile_data=Authenciationfactory.getauthenciationdetails();
       console.log($scope.profile_data);
       $scope.profile_data=JSON.parse($scope.profile_data);
       console.log(typeof($scope.profile_data));
       $scope.profile=($scope.profile_data)['username'];
       console.log($scope.profile);

     }

     $scope.logout =function()
     {

       console.log("reched here");
       var res=Logoutfactory.logout();
       res.then(function(data,status,headers,config){
         
          console.log(data.data);
          console.log("reached here too");
          Authenciationfactory.unauthenciate();
          //alert("reached here");
          //$location.path("/");
          window.location="/";
          //alert("reached here too "); 

       });
  
     };

    
  
}).controller('modalcontroller',function ($scope,Postfactory) {
  // body...

   
  //alert("modalcontroller called");

  $scope.close=function()
  {
     console.log("Entered here");
     $('#modal').hide();
   
  };

  $scope.post=function()
  {

      console.log("Entered post function");

        var obj=
        {
          'content':$scope.content
        };

        
        console.log(obj);
        
        

        var res=Postfactory.create(obj);

        /*

        res.then(function(data,status,headers,config)
        {

           console.log(data.data);
        });
  
     */
          


  };


 

}).controller('ProfileController',function($scope,$window,$location,Profilefactory) {
  
    console.log("Profile Controller called");

    var params=$location.path();
    var res= params.split("/");
    console.log(res[2]);

    var res=Profilefactory.getposts(res[2]);
    res.then(function(data,status,headers,config)
    {
                console.log(data.data);
                $scope.value=data.data;
    });
});







