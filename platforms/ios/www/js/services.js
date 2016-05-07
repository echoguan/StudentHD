angular.module('starter.services', ['ngCookies'])

.factory('Auth', function($cookieStore) {
  var _user = $cookieStore.get('starter.user');
  var setUser = function(user) {
    _user = user;
    $cookieStore.put('starter.user', _user);
  }
  
  return {
    setUser : setUser,
    isLoggedIn : function() {
      return _user ? true : false;
    },
    getUser : function() {
      return _user;
    },
    logout : function() {
      $cookieStore.remove('starter.user');
      _user = null;
    }
  }
})

.factory('Lesson', function() {
  // Might use a resource here that returns a JSON array
  alert("chulaile?");
  // var adapterURL = "http://localhost:9080/mfp/api/adapters/JavaSQL/API/getLesson";
  // var req = new WLResourceRequest(adapterURL, WLResourceRequest.GET);
  // req.send().then(function(resp){
  //   alert(resp.responseText);
  //   var lesson = resp.responseText;
  // });
  var lesson = [
      {
        "lessontable_name": "高等数学",
        "lessontable_key": "数学",
        "lessontable_description": "大学基础数学课程，提高逻辑思维和分析解决问题能力。"
      },
      {
        "lessontable_name": "大学英语",
        "lessontable_key": "英语",
        "lessontable_description": "大学基础英语教程，提高英语口语和写作能力。"
      },
      {
        "lessontable_name": "大学体育",
        "lessontable_key": "体育",
        "lessontable_description": "大学基础课程，进行体育锻炼，增强身体素质。"
      }
  ];

  return {
    all: function() {
      return lesson;
    },
    remove: function(oneLesson) {
      lesson.splice(lesson.indexOf(oneLesson), 1);
    },
    get: function(lessonId) {
      for (var i = 0; i < lesson.length; i++) {
        if (lesson[i].id === parseInt(lessonId)) {
          return lesson[i];
        }
      }
      return null;
    }
  };
});
