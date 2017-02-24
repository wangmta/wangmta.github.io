// Code goes here
(function(){
  
  var app = angular.module("gitSearch", []);
  var MainController = function($scope, $http, $interval, $log, $location, $anchorScroll){
    
    var onUserComplete = function(response){
      $scope.user = response.data;
      $http.get($scope.user.repos_url)
      .then(onRepos, ifError);
    };
    
    var onRepos = function(response){
      $scope.repos = response.data;
      $location.hash("details");
      $anchorScroll();
    };
    
    var ifError = function(reason){
      $scope.error = "could not find the user";
    };
    
    $scope.search = function(username){
      $log.info("search for " + username);
      $http.get("https://api.github.com/users/" + username)
      .then(onUserComplete, ifError);
      if(cdInterval){
        $interval.cancel(cdInterval);
        $scope.countdown = null;
      }
    };
    
    var countDownFun = function(){
      $scope.countdown -= 1;
      if($scope.countdown <1){
        $scope.search($scope.username);
      }
    };
    
    var cdInterval = null;
    var startCountDown = function(){
      cdInterval = $interval(countDownFun, 1000, $scope.countdown);
    };
    
    $scope.username = "angular";
    $scope.message = "Github Repo Search";
    $scope.countdown = 2;
    startCountDown();
    
  };
  
  app.controller("MainController", MainController);
  
}());
