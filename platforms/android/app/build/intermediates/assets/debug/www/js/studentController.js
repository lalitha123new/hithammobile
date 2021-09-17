var app = angular.module("hitham", []);

app.controller("studentController",function($scope,$http) {

	//document.addEventListener("deviceready", onDeviceReady, false);

	/*function onDeviceReady(){

	var permissions = cordova.plugins.permissions;

	permissions.hasPermission(permissions.WRITE_EXTERNAL_STORAGE, function(status) {
	
  if (status.hasPermission) {
    // here you can savely start your own plugin because you already have write_external_storage permission
  }
  else {
    // need to request write_external_storage permission
    permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, success, error);

    function error() {
      // write_external_storage permission not turned on
    }

    function success(status) {
      if (status.hasPermission) {
        // user accepted, here you can start your own plugin
      }
    }
  }
});

	}*/
		

	
	
		var username = $('#Username').val();
		localStorage.setItem("username",username);
	   	username =   localStorage.getItem('username');	

        //student details
        //var student_pk = 0;
	   	//playlist details 
	    $scope.res = [];
		$scope.playlist = [];
		$scope.current_student_playlist = [];
		$scope.playlist_color = [];
		$scope.playlist_image = [];
		$scope.assigned_song_id = [];
		//song and recording details
		$scope.songs = [];
		$scope.song_color = [];
		$scope.song_img = [];
		$scope.recording_id = [];
		$scope.assigned_song_id_sqlite = [];
		$scope.song_singer = [];
		$scope.raaga = [];
		$scope.taal = [];
		$scope.song_url = [];
		$scope.song_name= [];
		$scope.song_composer = [];
		$scope.songs_id = [];

		$scope.res1 = [];
		$scope.res2 = [];
		$scope.res3 = [];
		$scope.res4 = [];
	   
       $scope.login = function(){
       
		var pass = $('#Password').val();
		
		if (pass.length == 0) alert("Enter password");

		$http({

				url : URL+ '/webapi/songlist',
				method : "POST",
				headers : {
				'Content-Type' : 'application/json',
				},
				data: JSON.stringify({
				student_id: $('#Username').val(),
				student_password: encryptme(pass)
		    	}),

				}).success(function(res) {
				
				if(res.status === false){

					alert("Invalid login credentials");
					
				}else{
				//begin old code for storing student_playlist_song_recording data in localstorage	
				//var res1 = JSON.stringify(res);
				//localStorage.setItem("res_playlists",res1);
				//end of old code for storing data in localstorage

				//begin new code for creating and saving in sqlite database
				console.log(res);
				//console.log(res.playlists);
				var student_pk = res.student_pk;
				console.log(student_pk);
				localStorage.setItem("student_pk",student_pk);

				for(var i=0;i<res.playlists.length;i++){

		   		$scope.res  = res.playlists[i];
			    $scope.current_student_playlist[i] = $scope.res.playlist_name;
				$scope.playlist[i] = $scope.res.playlist_id;
				$scope.playlist_color[i] = $scope.res.playlist_color;
				$scope.playlist_image[i] = $scope.res.playlist_pic_url;
				$scope.assigned_song_id[i] = $scope.res.playlist_songIDs;
				
				//error in the 16th playlist name(ehrcapps db).so changed the playlist name here
				$scope.current_student_playlist[15] = "blue bells";
		        //console.log($scope.current_student_playlist[i]);

	   			}

	   			for(var i=0;i<res.songslist.length;i++){
      
			    $scope.res  = res.songslist[i];
			    $scope.songs[i] =$scope.res.recording_name;
			    $scope.song_img[i] = $scope.res.recording_pic_url;
			    $scope.song_color[i] = $scope.res.recording_color;
			    $scope.recording_id[i] =$scope.res.recording_id; 
			    $scope.assigned_song_id_sqlite[i] = $scope.res.song_id;
			    $scope.song_name[i] =$scope.res.song_name;
			    $scope.song_singer[i] = $scope.res.song_singer;
			    $scope.raaga[i] = $scope.res.song_raaga;
			    $scope.taal[i] = $scope.res.song_taal;
			    $scope.song_url[i] = $scope.res.song_url;
				$scope.song_composer[i] = $scope.res.song_composer;

				}

				
		//sqlite database code       
		document.addEventListener("deviceready", onDeviceReady, false);

    	//Populate the database 
    	function populateDB(tx) {

        console.log($scope.assigned_song_id);
        tx.executeSql('DROP TABLE IF EXISTS student');
        tx.executeSql('DROP TABLE IF EXISTS playlist');
        //tx.executeSql('DROP TABLE IF EXISTS recording');
        tx.executeSql('DROP TABLE IF EXISTS song');

        tx.executeSql('CREATE TABLE IF NOT EXISTS student (row_id unique, student_pk, playlist_id)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS playlist (row_id unique,student_pk, playlist_id, playlist_name, playlist_color, playlist_pic_url,playlist_songIDs)');
        //tx.executeSql('CREATE TABLE IF NOT EXISTS recording (row_id unique, recording_id, recording_name, recording_pic_url, recording_color,song_id)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS song (row_id unique,student_pk, recording_id, recording_name, recording_pic_url, recording_color, song_id, song_name, song_url, song_taal,song_raaga,song_composer)');
        
        for(var j = 0; j < $scope.playlist.length; j++){
        tx.executeSql('INSERT INTO student (row_id, student_pk, playlist_id) VALUES ('+(j+1)+', '+student_pk+', '+$scope.playlist[j]+')');
        }

        //to be corrected, assigned_song_id is not array but string-to be changed
        for(var i = 0; i < $scope.playlist.length; i++){
        //console.log($scope.assigned_song_id[i]);
        tx.executeSql('INSERT INTO playlist (row_id,student_pk, playlist_id, playlist_name, playlist_color, playlist_pic_url,playlist_songIDs) VALUES ('+(i+1)+','+student_pk+', '+$scope.playlist[i]+', "'+$scope.current_student_playlist[i]+'", "'+$scope.playlist_color[i]+'", "'+$scope.playlist_image[i]+'","['+$scope.assigned_song_id[i]+']")');
        }

        /*for(var i = 0; i < $scope.recording_id.length; i++){
        tx.executeSql('INSERT INTO recording (row_id, recording_id, recording_name, recording_pic_url, recording_color,song_id) VALUES ('+(i+1)+', '+$scope.recording_id[i]+', "'+$scope.songs[i]+'", "'+$scope.song_img[i]+'", "'+$scope.song_color[i]+'", '+$scope.assigned_song_id_sqlite[i]+')');
        }*/
        for(var i = 0; i < $scope.assigned_song_id_sqlite.length; i++){
        //console.log($scope.assigned_song_id_sqlite);
        tx.executeSql('INSERT INTO song (row_id,student_pk,recording_id, recording_name, recording_pic_url, recording_color, song_id, song_name, song_url, song_taal,song_raaga,song_composer) VALUES ('+(i+1)+','+student_pk+','+$scope.recording_id[i]+', "'+$scope.songs[i]+'", "'+$scope.song_img[i]+'", "'+$scope.song_color[i]+'", '+$scope.assigned_song_id_sqlite[i]+', "'+$scope.song_name[i]+'","'+$scope.song_url[i]+'","'+$scope.taal[i]+'","'+$scope.raaga[i]+'","u'+$scope.song_composer[i]+'")');
        }

        }

      // Query the database
      function queryDB(tx) {
      tx.executeSql('SELECT * FROM student', [], querySuccess1, errorCB);
      tx.executeSql('SELECT * FROM playlist', [], querySuccess2, errorCB);
      //tx.executeSql('SELECT * FROM recording', [], querySuccess3, errorCB);
      tx.executeSql('SELECT * FROM song', [], querySuccess4, errorCB);
      }

     // Query the success callback
     function querySuccess1(tx, results) {
     //console.log(results);

    for(var i1=0;i1<results.rows.length;i1++){
    $scope.res1 = results.rows[i1];
    //console.log($scope.res1);
    }  // this will be true since it was a select statement and so rowsAffected was 0
    if (!results.rowsAffected) {
    //console.log('No rows affected!');
    return false;
    }
    // for an insert statement, this property will return the ID of the last inserted row
    //console.log("Last inserted row ID = " + results);
    }

  
  function querySuccess2(tx, results) {
    
  for(var i2=0;i2<results.rows.length;i2++){
  	$scope.res2 = results.rows[i2];
  	//console.log($scope.res2);
  
   }  
  
  if (!results.rowsAffected) {
  return false;
  }
  
  }

  /*function querySuccess3(tx, results) {
  for(var i3=0;i3<results.rows.length;i3++){
  $scope.res3 = results.rows[i3];
  } 
  if (!results.rowsAffected) {
  return false;
  }
  }*/

  function querySuccess4(tx, results) {
  for(var i4=0;i4<results.rows.length;i4++){
  $scope.res4 = results.rows[i4];
  //console.log($scope.res4);
  }
  if (!results.rowsAffected) {
  return false;
  }
  
  }

		// Transaction error callback
		function errorCB(err) {
		    console.log("Error processing SQL: "+err.message);
		}

		// Transaction success callback
		function successCB() {
		    var db = window.openDatabase("database", "1.0", "Hitham_Db", 200000);
		    db.transaction(queryDB, errorCB);
		}

		// Cordova is ready
		function onDeviceReady() {

			var permissions = cordova.plugins.permissions;

	permissions.checkPermission(permissions.WRITE_EXTERNAL_STORAGE, function(status) {
	
  if (status.hasPermission) {
    // here you can savely start your own plugin because you already have write_external_storage permission
  }
  else {
    // need to request write_external_storage permission
    permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, success, error);

    function error() {
      // write_external_storage permission not turned on
    }

    function success(status) {
      if (status.hasPermission) {
        // user accepted, here you can start your own plugin
      }
    }
  }
});

		    var db = window.openDatabase("database", "1.0", "Hitham_Db", 200000);
		    db.transaction(populateDB, errorCB, successCB);
		}		 

		//end of new code for creating and saving data in sqlite database

		window.location.href = "student_playlist.html";

		}
        
       		}).error(function(res) {
			console.log(res);
			alert("error.can not connect to server");

			});
       	}

		
       });