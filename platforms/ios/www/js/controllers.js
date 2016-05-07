/// <reference path="plugins/cordova-plugin-mfp-push/typings/mfppush.d.ts"/>
var appCtrl = angular.module('starter.controllers', [])

  appCtrl.factory('Lessons', function() {
    // alert("!!!!");
    // Might use a resource here that returns a JSON array
    
    // var adapterURL = "http://localhost:9080/mfp/api/adapters/JavaSQL/API/getLesson";
    // var req = new WLResourceRequest(adapterURL, WLResourceRequest.GET);
    // req.send().then(function(resp){
    //   alert("resp:" + resp.responseText);
    //   var lesson = JSON.parse(resp.responseText);
    //   alert("lesson1" + lesson);
    // });
    // var lesson = resp.responseText;
    
    var lessons = [
        {
          "lessontable_name": "高等数学",
          "lessontable_key": "数学",
          "lessontable_description": "大学基础数学课程，提高逻辑思维和分析解决问题能力。",
          "id": "1"
        },
        {
          "lessontable_name": "大学生就业",
          "lessontable_key": "就业",
          "lessontable_description": "指导大学生就业与工作",
          "id": "2"
        },
        {
          "lessontable_name": "大学体育",
          "lessontable_key": "体育",
          "lessontable_description": "大学基础课程，进行体育锻炼，增强身体素质。",
          "id": "3"
        }
    ];
    
    // alert("lesson2:" + lesson);

    return {
      all: function() {
        // alert("all:"+ lessons);
        return lessons;
      },
      remove: function(lesson) {
        lessons.splice(lessons.indexOf(lesson), 1);
      },
      get: function(lessonId) {
        for (var i = 0; i < lessons.length; i++) {
          if ((lessons[i].id-1) === parseInt(lessonId)) {
            return lessons[i];
          }
        }
        return null;
      }
    };
  })

  appCtrl.controller('LoginCtrl', function($scope, $state, Auth, $ionicPopup) {
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
            
            $state.go('tab.account');
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
    $scope.$on('$ionicView.enter', function() {
      MFPInit.then(function() { WL.Analytics.log({ AppView: 'Status' }, "visit status view"); console.log("status view enter") });
    });
  })

  appCtrl.controller('LessonsCtrl', function($scope, Lessons, MFPInit) {
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
    $scope.$on('$ionicView.enter', function() {
      MFPInit.then(function() { WL.Analytics.log({ AppView: 'Lesson Details' }, "visit Lesson Details view"); console.log("lesson details view enter") });
    });
    $scope.lesson = Lessons.get($stateParams.lessonId-1);
  })

  appCtrl.controller('AccountCtrl', function($scope, MFPInit, $state, Auth) {
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
