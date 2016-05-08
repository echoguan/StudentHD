// <reference path="plugins/cordova-plugin-mfp-push/typings/mfppush.d.ts"/>
var appCtrl = angular.module('starter.controllers', [])

  appCtrl.controller('LoginCtrl', function($scope, $state, Auth, $ionicPopup) {
    // alert("LoginCtrl执行");
    $scope.loginData = {};
    
    showAlert = function (title, message) {
      var alertPopup = $ionicPopup.alert({
        title : title,
        template : message
      });
    }
    
    $scope.doLogin = function() {
      if( !angular.isDefined($scope.loginData.username) || !angular.isDefined($scope.loginData.password) || $scope.loginData.username.trim() == "" || $scope.loginData.password.trim() == "") {
        showAlert("登录失败","用户名或密码不能为空！");
        return;
      } else {
        var adapterURL = "http://localhost:9080/mfp/api/adapters/JavaSQL/API/loginConfirm/" + $scope.loginData.username + "/" + $scope.loginData.password;
        var req = new WLResourceRequest(adapterURL, WLResourceRequest.GET);
        req.send().then(function(resp){
          if(resp.responseText == 'Success'){
            Auth.setUser({
              username : $scope.loginData.username
            });
            
            $state.go('tab.account', null, {
              reload: true
            });
          } else if(resp.responseText == 'PasswordWrong'){
            showAlert("登录失败","密码错误！");
          } else if(resp.responseText == 'NameWrong'){
            showAlert("登录失败","用户名不存在！");
          }
        });
      }
    };
    
    
  })


  appCtrl.controller('DashCtrl', function($scope, MFPInit) {
    // alert("DashCtrl执行");
    $scope.$on('$ionicView.enter', function() {
      MFPInit.then(function() { WL.Analytics.log({ AppView: 'Status' }, "visit status view"); console.log("status view enter") });
    });
  })

  appCtrl.controller('LessonsCtrl', function($scope, Lessons, MFPInit,$http) {
    // alert("LessonsCtrl执行");
    
    // alert("1");
    $http.get("http://localhost:9080/mfp/api/adapters/JavaSQL/API/getLesson").success(function (response) {
        // $scope.myWelcome = response.data;
        // alert("aaa出来啊："+response.data);
    });
    // alert("2");
    
    $scope.$on('$ionicView.enter', function() {
      MFPInit.then(function() { WL.Analytics.log({ AppView: 'Lesson' }, "visit lesson view"); console.log("lesson view enter") });
    });
    
    // var adapterURL = "http://localhost:9080/mfp/api/adapters/JavaSQL/API/getLesson";
    // var req = new WLResourceRequest(adapterURL, WLResourceRequest.GET);
    // req.send().then(function(resp){
    //   $scope.lesson = JSON.parse(resp.responseText);
    //   // alert("1req-lesson:" + $scope.lesson);
    // });

    $scope.lessons = Lessons.all();
    // alert("2ctrl-lesson:"+$scope.lesson);
    $scope.remove = function(lesson) {
      Lessons.remove(lesson);
    };
  })

  appCtrl.controller('LessonDetailCtrl', function($scope, $stateParams, Lessons, MFPInit) {
    // alert("LessonDetailCtrl执行");
    $scope.$on('$ionicView.enter', function() {
      MFPInit.then(function() { WL.Analytics.log({ AppView: 'Lesson Details' }, "visit Lesson Details view"); console.log("lesson details view enter") });
    });
    $scope.lesson = Lessons.get($stateParams.lessonId-1);
  })

  appCtrl.controller('AccountCtrl', function($scope, MFPInit, $state, Auth) {
    // alert("AccountCtrl执行");
    $scope.username = Auth.getUser().username;
    $scope.$on('$ionicView.enter', function() {
      MFPInit.then(function() { WL.Analytics.log({ AppView: 'Account' }, "visit Account view"); console.log("account view enter") });
    });
    $scope.settings = {
      enableFriends: true
    };
    
    $scope.logout = function() {
      Auth.logout();
      $state.go('login');
    };
  });
  
  appCtrl.controller('MyLessonsCtrl', function($scope, $stateParams, Lessons, MFPInit) {
    // alert("MyLessonsCtrl执行");
    $scope.$on('$ionicView.enter', function() {
      MFPInit.then(function() { WL.Analytics.log({ AppView: 'My Lessons' }, "visit My Lessons view"); console.log("my lessons view enter") });
    });
  });
  
  appCtrl.controller('MyCommentsCtrl', function($scope, $stateParams, Lessons, MFPInit) {
    // alert("MyCommentsCtrl执行");
  });
  
