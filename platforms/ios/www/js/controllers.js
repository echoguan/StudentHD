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
      // alert("!!");
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
            
            $state.go('tab.lessons', null, {
              reload: true
            });
          } else if(resp.responseText == 'PasswordWrong'){
            showAlert("登录失败","密码错误！");
          } else if(resp.responseText == 'NameWrong'){
            showAlert("登录失败","用户名不存在！");
          }
          // $state.go('tab.account', null, {
          //     reload: true
          //   });
          
          // Auth.setUser({
          //   username : "echo"
          // });
          // $state.go('tab.lessons');
        });
      }
    };
  })
  
  appCtrl.controller('RegisterCtrl', function($scope, $state, Auth, $ionicPopup) {
    // alert("RegisterCtrl执行");
    
    $scope.registerData = {};
    
    showAlert = function (title, message) {
      var alertPopup = $ionicPopup.alert({
        title : title,
        template : message
      });
    }
    
    $scope.register = function() {
      if(!angular.isDefined($scope.registerData.username) || !angular.isDefined($scope.registerData.password) || !angular.isDefined($scope.registerData.repeatPassword) 
          || $scope.registerData.username.trim() == "" || $scope.registerData.password.trim() == "" || $scope.registerData.repeatPassword.trim() == ""){
        showAlert("注册失败","不能有空项！");
        return;
      } else if($scope.registerData.password != $scope.registerData.repeatPassword) {
        showAlert("注册失败","两次密码不一致！");
      } else {
        var adapterURL = "http://localhost:9080/mfp/api/adapters/JavaSQL/API/registerStudent/" + $scope.registerData.username + "/" + $scope.registerData.password;
        var req = new WLResourceRequest(adapterURL, WLResourceRequest.GET);
        req.send().then(function(resp){
          alert("aaaaaaaaaaaaaaaaaaa"+resp);
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

  appCtrl.controller('LessonsCtrl', function($scope, MFPInit) {
    alert("LessonsCtrl执行");
    
    $scope.title = "Blogs";
    
    // alert("1");
    // $http.get("http://localhost:9080/mfp/api/adapters/JavaSQL/API/getLesson").success(function (response) {
        // $scope.myWelcome = response.data;
        // alert("aaa出来啊："+response.data);
    // });
    // alert("2");
    
    // $scope.$on('$ionicView.enter', function() {
    //   MFPInit.then(function() { WL.Analytics.log({ AppView: 'Lesson' }, "visit lesson view"); console.log("lesson view enter") });
    // });
    
    var adapterURL = "http://localhost:9080/mfp/api/adapters/JavaSQL/API/getLesson";
    var req = new WLResourceRequest(adapterURL, WLResourceRequest.GET);
    req.send().then(function(resp){
      $scope.lessons = JSON.parse(resp.responseText);
      // $scope.lessons = resp.responseText;
      
    //   var lessons1 = [
    //   {
    //     "lessontable_name": "高等数学",
    //     "lessontable_key": "数学",
    //     "lessontable_description": "大学基础数学课程，提高逻辑思维和分析解决问题能力。",
    //     "id": "1"
    //   },
    //   {
    //     "lessontable_name": "大学体育",
    //     "lessontable_key": "体育",
    //     "lessontable_description": "大学基础课程，进行体育锻炼，增强身体素质。",
    //     "id": "2"
    //   },
    //   {
    //     "lessontable_name": "形式与政策",
    //     "lessontable_key": "政治",
    //     "lessontable_description": "了解当代的全方面形式与政策",
    //     "id": "3"
    //   },
    //   {
    //     "lessontable_name": "大学英语",
    //     "lessontable_key": "英语",
    //     "lessontable_description": "提高学生英语口语和写作能力",
    //     "id": "4"
    //   },
    //   {
    //     "lessontable_name": "大学生就业",
    //     "lessontable_key": "素质",
    //     "lessontable_description": "指导大学生走向社会以及就业",
    //     "id": "5"
    //   }
    // ];
      
      alert("LessonsCtrl-resp-lesson:" + resp.responseText);
      alert("LessonsCtrl-scope-lesson:" + $scope.lessons);
      // alert("LessonsCtrl-hard-lessons:" + lessons1);
    });
    
    // $scope.lessons = [
    //     {
    //       "lessontable_name": "高等数学",
    //       "lessontable_key": "数学",
    //       "lessontable_description": "大学基础数学课程，提高逻辑思维和分析解决问题能力。",
    //       "id": "1"
    //     },
    //     {
    //       "lessontable_name": "大学生就业",
    //       "lessontable_key": "就业",
    //       "lessontable_description": "指导大学生就业与工作",
    //       "id": "2"
    //     },
    //     {
    //       "lessontable_name": "大学体育",
    //       "lessontable_key": "体育",
    //       "lessontable_description": "大学基础课程，进行体育锻炼，增强身体素质。",
    //       "id": "3"
    //     }
    // ];
    
    // alert("LessonsCtrl-scope-lesson!!:" + $scope.lessons);

    // $scope.lessons = Lessons.all();
    
    // alert("2ctrl-lesson:"+$scope.lesson);
    
    // $scope.remove = function(lesson) {
    //   Lessons.remove(lesson);
    // };
    
    // $scope.remove = function(lesson) {
    //   lessons.splice(lessons.indexOf(lesson), 1);
    // };

  })

  appCtrl.controller('LessonDetailCtrl', function($scope, $stateParams, Lessons, MFPInit) {
    // alert("LessonDetailCtrl执行");
    $scope.$on('$ionicView.enter', function() {
      MFPInit.then(function() { WL.Analytics.log({ AppView: 'Lesson Details' }, "visit Lesson Details view"); console.log("lesson details view enter") });
    });
    
    // $scope.get = function(lessonId) {
    //   for (var i = 0; i < lessons.length; i++) {
    //     if ((lessons[i].id-1) === parseInt(lessonId)) {
    //       return lessons[i];
    //     }
    //   }
    //   return null;
    // };
    // $scope.lesson = $scope.get($stateParams.lessonId-1);
    
    // $scope.lesson = Lessons.get($stateParams.lessonId-1);
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
  
