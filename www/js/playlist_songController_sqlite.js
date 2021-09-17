var app = angular.module("hitham", []);

app.controller("playlist_songController",function($scope,$http) {
	
  //variabled to assign song and recording details  from the sqlite db and display in the UI 
	$scope.songs = [];
	$scope.song_color = [];
	$scope.song_img = [];
	$scope.recording_id = [];
	$scope.assigned_song_id = [];
	$scope.song_singer = [];
	$scope.raaga = [];
	$scope.taal = [];
	$scope.song_url = [];
	$scope.song_name= [];
	$scope.song_composer = [];
	$scope.search_array = [];
	$scope.resultObject = [];
	$scope.songs_id = [];
  var newArr = [];

  //get selected_playlist_id and songs_list from the localstorage
	playlist_id =   localStorage.getItem('playlist_id');
	console.log(playlist_id);
	songs_id =   localStorage.getItem('song_id');
	console.log(songs_id);
	var songs_id_parsed = JSON.parse(songs_id);
	console.log(songs_id_parsed);
	   
  //old code to get data from the localstorage  
	//res_play =   localStorage.getItem('res_playlists');
	//var res1 = 	JSON.parse(res_play);

	var marvelHeroes = [];
  $scope.res1 = [];
  $scope.res3 = [];

/*$(document).ready(function(){

  onDeviceReady();
});*/
document.addEventListener("deviceready", onDeviceReady, false);

//Function to the get the song details(raaga,singer,composer,recording_name,recordin_id,recording_pic_url,song_url) of the songs_list() of the selected playlist.
//There may be more than one recordings under a song_id. We need to fetch all recording and song_details of all songs under a selected playlist.

$scope.search = function(nameKey, myArray){
		    				
		    for (i=0;i < myArray.length; i++) {
		        var marvelHeroes =  myArray.filter(function(hero) {
				return hero.song_id == nameKey;
				});
		        return marvelHeroes;
		    }
						   
}//end of function to the get the song details of the song_lists of the selected playlist.
			    			
	
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
 //tx.executeSql('SELECT * FROM playlist_song', [], querySuccess1, errorCB);
 tx.executeSql('SELECT * FROM song', [], querySuccess3, errorCB);
}

function querySuccess3(tx, results){

    for(var i3 = 0;i3 < results.rows.length;i3++){
     $scope.res2 = results.rows[i3];
     console.log($scope.res2);
     $scope.search_array.push($scope.res2);
     console.log($scope.search_array);
    }

    for(var j=0;j<songs_id_parsed.length;j++){
      $scope.resultObject[j] = $scope.search(songs_id_parsed[j], $scope.search_array);
      console.log($scope.resultObject);          
    }

    for(var i1 = 0; i1 < $scope.resultObject.length; i1++){
        newArr = newArr.concat($scope.resultObject[i1]);
    }
    //console.log(newArr);
    for(var i2=0;i2<newArr.length;i2++){
      

        $scope.res3  = newArr[i2];
        $scope.songs[i2] =$scope.res3.recording_name;
        $scope.song_img[i2] = $scope.res3.recording_pic_url;
        $scope.song_color[i2] = $scope.res3.recording_color;
        $scope.recording_id[i2] =$scope.res3.recording_id; 
        $scope.assigned_song_id[i2] = $scope.res3.song_id;
        $scope.song_name[i2] =$scope.res3.song_name;
        $scope.song_singer[i2] = $scope.res3.song_singer;
        $scope.raaga[i2] = $scope.res3.song_raaga;
        $scope.taal[i2] = $scope.res3.song_taal;
        $scope.song_url[i2] = $scope.res3.song_url;
        console.log($scope.recording_id);
        $scope.song_composer[i2] = $scope.res3.song_composer;
    }
    //very important line of code to display above data in the view
    $scope.$apply();  
}

function errorCB(err) {
      console.log("Error processing SQL: "+err.message);
     
}
//end of sqlite database code


//old code to get data from localstorage and display in the UI
/*for(var i=0;i<res1.songslist.length;i++){
	   	
	  $scope.res  = res1.songslist[i];
	  $scope.search_array.push($scope.res);
    $scope.songs[i] =$scope.res.recording_name;
		$scope.song_img[i] = $scope.res.recording_pic_url;
		$scope.song_color[i] = $scope.res.recording_color;
		$scope.recording_id[i] =$scope.res.recording_id; 
		$scope.assigned_song_id[i] = $scope.res.song_id;
		$scope.song_name[i] =$scope.res.song_name;
		$scope.song_singer[i] = $scope.res.song_singer;
		$scope.raaga[i] = $scope.res.song_raaga;
		$scope.taal[i] = $scope.res.song_taal;
		$scope.song_url[i] = $scope.res.song_url;
		$scope.song_composer[i] = $scope.res.song_composer;

}*/

/*for(var j=0;j<songs_id_parsed.length;j++){
		
	   	$scope.resultObject[j] = $scope.search(songs_id_parsed[j], $scope.search_array);					
			
}*/

/*for(var i = 0; i < $scope.resultObject.length; i++){
		newArr = newArr.concat($scope.resultObject[i]);
}

    console.log(newArr);
    console.log($scope.resultObject);

for(var i=0;i<newArr.length;i++){
		console.log("in newarr");
    $scope.res  = newArr[i];
	  $scope.songs[i] =$scope.res.recording_name;
		$scope.song_img[i] = $scope.res.recording_pic_url;
		$scope.song_color[i] = $scope.res.recording_color;
		$scope.recording_id[i] =$scope.res.recording_id; 
		$scope.assigned_song_id[i] = $scope.res.song_id;
		$scope.song_name[i] =$scope.res.song_name;
		$scope.song_singer[i] = $scope.res.song_singer;
		$scope.raaga[i] = $scope.res.song_raaga;
		$scope.taal[i] = $scope.res.song_taal;
		$scope.song_url[i] = $scope.res.song_url;
		console.log($scope.song_url[i]);
		$scope.song_composer[i] = $scope.res.song_composer;
}*/
//end of old code to get data from localstorage and display in the UI

$scope.selected_song = function(song_id,recording_name,song_color,song_img,raaga,taal,song_name,url,composer,rec_id){
  //console.log(rec_id);
       	
       	localStorage.setItem("recording_name",recording_name);
       	localStorage.setItem("song_color",song_color);
       	localStorage.setItem("song_img",song_img);
       	localStorage.setItem("raaga",raaga);
       	localStorage.setItem("taal",taal);
       	localStorage.setItem("song_name",song_name);
       	localStorage.setItem("url",url);
       	localStorage.setItem("composer",composer);
        localStorage.setItem("reco_id",rec_id);
        
        window.location.href="song_selected.html"
}

       data1 =   localStorage.getItem('recording_name');
       data2 =   localStorage.getItem('song_color');
       data3 =   localStorage.getItem('song_img');
       data4 =   localStorage.getItem('raaga');
       data5 =   localStorage.getItem('taal');
       data6 =   localStorage.getItem('url');
       data7 =   localStorage.getItem('song_name'); 

$scope.logout = function(){

     	window.location.href="index.html";
       	
}
 
            			 
				});//end of app.controller function