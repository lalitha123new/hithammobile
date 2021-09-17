var app = angular.module("hitham", []);

app.controller("songController",function($scope,$http) {
	
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

    playlist_id =   localStorage.getItem('playlist_id');
    songs_id =   localStorage.getItem('song_id');
    var songs_id_parsed = JSON.parse(songs_id);
	 
	res_play =   localStorage.getItem('res_playlists');
	var res1 = 	JSON.parse(res_play);
	var marvelHeroes = [];

	//function to the get the song details(raaga,singer,composer) of the recording assigned to a student
	$scope.search = function(nameKey, myArray){
			    				
	    for (i=0;i < myArray.length; i++) {
	        var marvelHeroes =  myArray.filter(function(hero) {
			return hero.song_id == nameKey;
			});
	        return marvelHeroes;
	             
	    }
							   
	}//end of function to the get the song details of the recording assigned to a student
			    			
	   
	   for(var i=0;i<res1.songslist.length;i++){
	   	
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

	   }

		for(var j=0;j<songs_id_parsed.length;j++){
		
	   	$scope.resultObject[j] = $scope.search(songs_id_parsed[j], $scope.search_array);					
			
		}
		
       $scope.selected_song = function(song_id,recording_name,song_color,song_img,raaga,taal,song_name,url,composer){
       	
       	localStorage.setItem("recording_name",recording_name);
       	localStorage.setItem("song_color",song_color);
       	localStorage.setItem("song_img",song_img);
       	localStorage.setItem("raaga",raaga);
       	localStorage.setItem("taal",taal);
       	localStorage.setItem("song_name",song_name);
       	localStorage.setItem("url",url);
       	localStorage.setItem("composer",composer);
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