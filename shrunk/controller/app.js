var myApp = angular.module('shrunkApp', ['ngAnimate', 'ui.bootstrap', 'ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'views/home.html',
        controller: 'urlShortener'
    })
    .when('/blockurl',{
        templateUrl: 'views/blockurl.html',
        controller: 'urlShortener'
    })
    .when('/stat/:id',{
        templateUrl: 'views/stats.html',
        controller: 'viewController'
    })
    .when('/usermgmt',{
        templateUrl: 'views/usermgmt.html',
        controller: 'urlShortener'
    })
    .when('/blacklist',{
        templateUrl: 'views/blacklist.html',
        controller: 'urlShortener'
    })
    .otherwise({
        redirectTo: 'views/home.html',
        controller: 'urlShortener'
    })    
}]);

myApp.filter('beginWith',function(){
    return function(data,start){
        return data.slice(start);
    }
});

myApp.service('myService', function(){
    this.results = []; 
});

myApp.controller('urlShortener', ['$scope', 'myService', function($scope, myService){
    var closesidenav = document.getElementById("closesidenav"),
        openicon = document.getElementById("openicon"),
        sidebar = document.getElementById("sidebar-wrapper"),
        shrunk = document.getElementById("shrunk"),
        dialogoverlay = document.getElementById('dialogoverlay'),
        navlink = document.querySelectorAll(".navlink"),
        winW = window.innerWidth,
        winH = window.innerHeight;
    function openNav() {
        sidebar.style.marginLeft = "0px";
        shrunk.style.marginLeft = "250px";
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogoverlay.style.width = winW+"px";
    };
    function closeNav() {
        sidebar.style.marginLeft = "-250px";
        shrunk.style.marginLeft = "0";
        dialogoverlay.style.display = "none"; 
    };
    openicon.onclick = function(){
        openNav(); 
    };
    for(i=0; i<navlink.length; i++){
        navlink[i].onclick = function(){
            closeNav();   
        };
    }
    dialogoverlay.onclick = function(){
        closeNav();   
    };
    
}]);

myApp.controller('appBody', ['$scope', 'myService', function($scope, myService){
    
    
    var editInput = document.getElementById("editInput"),
        box1 = document.getElementById("box1"),
        box2 = document.getElementById("box2"),
        primarybtn = document.getElementById("primarybtn"),
        inputGroup = document.getElementById("inputGroup"),
        inputForm = document.getElementById("inputForm");
    
    function toggleView(btn,content,content2,text1,text2){
        var maxH = "266px";
        if (content.style.height == maxH) {
            setTimeout(function(){content2.style.visibility = "collapse";}, 200);
            setTimeout(function(){content.style.height = "0px";}, 200);
            btn.innerText = text2;
        }
        else {
            content.style.height = maxH;
            setTimeout(function(){content2.style.visibility = "visible";}, 350);
            btn.innerText = text1;
        }
    };
    $scope.results = myService.results;
    
    $scope.addRow = function(){
        $scope.results.unshift({
            title: $scope.newrow.title,
            longUrl: $scope.newrow.longUrl,
            shortUrl: "test",
            alias: $scope.newrow.alias,
            timeCreated: new Date(),
            owner: "userid",
            internalviews: Math.floor(Math.random() * 100),
            externalviews: Math.floor(Math.random() * 100)
        });
        $scope.newrow.title = "";
        $scope.newrow.longUrl = "";
        $scope.newrow.alias = "";
    };
    
    $scope.removeRow = function(el){
        var removeRow = $scope.results.indexOf(el);
        $scope.results.splice(removeRow, 1);
    };
    
    $scope.pageSize = 6;
    $scope.currentPage = 1; 
    
    $scope.editData = function(elrow){
        $scope.current = elrow;
        editInput.style.display = "block";
    };
    
    $scope.saveData = function(elrow){
        $scope.current = {};
        editInput.style.display = "none";
    };
    
    primarybtn.onclick = function(){
        toggleView(primarybtn,inputGroup,inputForm,"Hide","Shorten URL");
    };
}]);

myApp.controller('viewController',['$scope', 'myService', '$routeParams', function($scope, myService, $routeParams){
    $scope.result = myService.results[$routeParams.id];
}]);

myApp.controller('blockurlFX', ['$scope', function($scope){
    $scope.blockurls = [];
    $scope.addUrl = function(){
        $scope.blockurls.unshift({
            list: $scope.newurl.list
        });
        $scope.newurl.list= "";
    };
    
    $scope.removeUrl = function(el){
        var removeurl = $scope.blockurls.indexOf(el);
        $scope.blockurls.splice(removeurl, 1);
    };
}]);

myApp.controller('blacklistFX', ['$scope', function($scope){
    $scope.blUsers = [];
    $scope.addUser = function(){
        $scope.blUsers.unshift({
            list: $scope.newuser.list
        });
        $scope.newuser.list= "";
    };
    
    $scope.removeUser = function(el){
        var removeuser = $scope.blUsers.indexOf(el);
        $scope.blUsers.splice(removeuser, 1);
    };
}]);