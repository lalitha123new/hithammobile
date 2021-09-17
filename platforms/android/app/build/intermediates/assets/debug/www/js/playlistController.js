var app = angular.module("hitham", []);

app.controller("playlistController",function($scope,$http) {
	
  //variables to assign the data from sqlite db and display in the UI
	$scope.res = [];
  $scope.res1 = [];
	$scope.playlist = [];
  $scope.current_student_playlist = [];
	$scope.playlist_color = [];
	$scope.playlist_image = [];
  $scope.assigned_song_id_old = [];
	$scope.assigned_song_id = [];
  $scope.myJSON1 = [];
  

  //old code -localstorage
  res_play =   localStorage.getItem('res_playlists');
  var res1 =  JSON.parse(res_play);
  //var student_pk = res1.student_pk;
  //console.log(student_pk);
  /*$(document).ready(function(){
  onDeviceReady();
   });*/
   document.addEventListener("deviceready", onDeviceReady, false);
  
  //begin sqlite db code
  // Cordova is ready
  function onDeviceReady() {
      var db = window.openDatabase("database", "1.0", "Hitham_Db", 200000);
      db.transaction(populateDB, errorCB, successCB);
  }

  //Populate the database 
  function populateDB(tx) {
     //console.log("populate tables in db");
  }

  function successCB() {
      var db = window.openDatabase("database", "1.0", "Hitham_Db", 200000);
      db.transaction(queryDB, errorCB);
  }

  // Query the database
  function queryDB(tx) {
   tx.executeSql('SELECT * FROM playlist', [], querySuccess2, errorCB);
  }


  function querySuccess2(tx, results){

    for(var i2 = 0;i2 < results.rows.length;i2++){

     
     $scope.res = results.rows[i2];
     console.log( $scope.res);
     $scope.current_student_playlist[i2]  = $scope.res.playlist_name;
     $scope.playlist[i2] = $scope.res.playlist_id;
     $scope.playlist_image[i2] = $scope.res.playlist_pic_url;
     $scope.playlist_color[i2] = $scope.res.playlist_color;
     //to be changed as the assigned_song_id from query is not array but string
     $scope.assigned_song_id[i2] = JSON.parse($scope.res.playlist_songIDs); 
     console.log($scope.assigned_song_id);
     //$scope.assigned_song_id[i2] = [13,15,16];

  }
  //very important line of code to display above data in the view. (The $scope.$apply() function is useful when integrating AngularJS with other code)
  $scope.$apply();  
  }

  function errorCB(err) {
      console.log("Error processing SQL: "+err.message);
  }
//end of sqlite database code

  $scope.selected_playlist = function(playlist_id,song_id){
    console.log(playlist_id);
    console.log(song_id);
    
    //code to create and/insert selected playlist_id and song_id when the user clicks on any playlist(old code - data is saved in localstorage)
    /*var db = window.openDatabase("database", "1.0", "Hitham_Db", 200000);
    db.transaction(populateDB1, errorCB, successCB1);
    function populateDB1(tx) {
   
    tx.executeSql('DROP TABLE IF EXISTS playlist_song');
    tx.executeSql('CREATE TABLE IF NOT EXISTS playlist_song (row_id unique, student_pk, playlist_id, songs_id)');
    tx.executeSql('INSERT INTO playlist_song (row_id, student_pk, playlist_id, songs_id) VALUES (1,'+student_pk+','+playlist_id+',"'+[song_id]+'")');
    }

    function successCB1() {
    var db = window.openDatabase("database", "1.0", "Hitham_Db", 200000);
    db.transaction(queryDB1, errorCB);
    }
    function queryDB1(tx) {
    tx.executeSql('SELECT * FROM playlist_song', [], querySuccess2_new, errorCB);
    }
    function querySuccess2_new(tx, results){
    console.log(results);
    }*/
        
  localStorage.setItem("playlist_id",playlist_id);
  //localStorage.setItem("song_id",JSON.stringify(song_id));
  localStorage.setItem("song_id",JSON.stringify(song_id));
  window.location.href="playlist_songlist.html";
  }

  $scope.logout = function(){
  window.location.href="index.html";
  }  
	
	});//end of app.controller function