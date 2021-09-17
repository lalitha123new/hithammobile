var app = angular.module("hitham", []);

app.controller("selected_songController",function($scope,$http) {


      var audio_state="";
      var time1 = 0;
      var time2 = 0.0;

    $(document).ready(function(){
    //sqlite_db_data();
    console.log("in the selected song page");
   
    });

      //code to create and/insert selected playlist_id and song_id when the user clicks on any playlist(old code - data is saved in localstorage)
    /*function sqlite_db_data(){
    var db = window.openDatabase("database", "1.0", "Hitham_Db", 200000);
    db.transaction(populateDB1, errorCB, successCB1);
    }
    function populateDB1(tx) {
      console.log("SELECTED SONG PAGE");
    }

    function successCB1() {
    var db = window.openDatabase("database", "1.0", "Hitham_Db", 200000);
    db.transaction(queryDB1, errorCB);
    }
    function queryDB1(tx) {
    tx.executeSql('SELECT * FROM song WHERE  recording_id = '+recording_id+'', [], querySuccess2_new, errorCB);
    }
    function querySuccess2_new(tx, results){
    console.log(results);
    onDeviceReady($scop);
    onDeviceReady1();


    }*/

      
       $scope.data1 =   localStorage.getItem('recording_name');
       $scope.data2 =   localStorage.getItem('song_color');
       $scope.data3 =   localStorage.getItem('song_img');
       $scope.data4 =   localStorage.getItem('raaga');
       $scope.data5 =   localStorage.getItem('taal');
       $scope.data6 =   localStorage.getItem('url');
      
       //assign the song_url to audio player
       document.getElementById('player').src =  $scope.data6;
       $scope.data7 =   localStorage.getItem('song_name');
       $scope.data8 =   localStorage.getItem('composer');
       student_pk =  localStorage.getItem('student_pk');
       recording_id =  localStorage.getItem('reco_id');
       console.log(recording_id);

       var audio_data = document.getElementById("player");





$('audio').on('playing', function() {
  $scope.getCurTime();
});
 $scope.getCurTime = function() { 
  audio_state = "PLAY";
  time1 =audio_data.currentTime;
  time2 = Math.round((audio_data.currentTime) * 100) / 100.0;
  $scope.activity(audio_state,time2);
  
} 

$('audio').on('pause', function() {
       
      $scope.getCurTime1();

});
   

  $scope.getCurTime1 = function() { 
  audio_state = "PAUSED";
  time1 =audio_data.currentTime;
  time2 = Math.round((audio_data.currentTime) * 100) / 100.0;
  $scope.activity(audio_state,time2);
  
}     
        var uri = $scope.data6;
        var fileURL =  "file:///storage/emulated/0/Download/"+$scope.data7+".mp3";
        


     
//begin code to download file to device if not exists when the user is directed to the selected song page
document.addEventListener("deviceready", onDeviceReady, false);



function onDeviceReady() {
    onDeviceReady1();

    window.resolveLocalFileSystemURL(fileURL, appStart, downloadAsset);
}

function appStart(){
  console.log("FILE EXISTS");
}

function downloadAsset(){
    alert("Downloading.Please wait...");
    console.log("DOWNLOADING FILE")
    var fileTransfer = new FileTransfer();
    fileTransfer.download(
        uri, fileURL, function(entry) {
        alert("Downloaded");
       console.log("DOWNLOAD COMPLETE: " + entry.toURL());
    },
            
    function(error) {
      console.log("download error source " + error.source);
      console.log("download error target " + error.target);
      console.log("download error code" + error.code);
    },
            
    false, {
         headers: {
         "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
         }
      }
   );
  
}
//end of code to download mp3 file to device if not exists

//begin code to download img file to device if not exists
//document.addEventListener("deviceready", onDeviceReady1, false);

     var uri1 = $scope.data3;
    var str = $scope.data3;
    var str1 = str.split("http://ehrcapps.iiitb.ac.in/hitham/images/").pop();
    console.log(str1);
     var fileURL1 =  "file:////storage/emulated/0/Download/"+str1+".png";

function onDeviceReady1() {
      window.resolveLocalFileSystemURL(fileURL1, appStart1, downloadAsset1);
}

function appStart1(){
        console.log("IMAGE EXISTS");
}

function downloadAsset1(){
      notify();
      console.log("DOWNLOADING IMAGE")
      //alert("image file does not exist");
      var fileTransfer = new FileTransfer();
      fileTransfer.download(
        uri1, fileURL1, function(entry) {
        //alert("Downloaded");
      console.log("DOWNLOAD COMPLETE: " + entry.toURL());
      },
            
      function(error) {
      console.log("download error source " + error.source);
      console.log("download error target " + error.target);
      console.log("download error code" + error.code);
      },
            
      false, {
         headers: {
         "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
         }
      }
   );
  
}

//function to notify user that the file is downloaded to the device
function notify(){
  cordova.plugins.notification.local.schedule({
    title: 'Hitham message',
    text: 'Downloaded file',
    foreground: true
});
}
//end of code to download img file to device if not exists

//begin code to play song and display image from the device storage if offline
 document.addEventListener("offline", onOffline, false);
 
function onOffline() {
    console.log("NO NETWORK CONNECTION");
    $scope.uploadFile();
}

$scope.uploadFile = function() {
   document.getElementById('player').src =  "file:///storage/emulated/0/Download/"+$scope.data7+".mp3";
  document.getElementById('img_id').src =  "file:///storage/emulated/0/Download/"+str1+".png";
    
}  
//end of code to play song and display image from the device storage if offline  


//begin code for student activity
$scope.activity = function(act_status,time_act){
  console.log(student_pk);
  console.log(recording_id);
  console.log(act_status);
  console.log(time_act);
  
      $http({


                url : URL+ '/webapi/studentActivity/logActivity',
                method : "POST",
                headers : {
                'Content-Type' : 'application/json',
                },
                data: JSON.stringify({
                student_pk: student_pk,
                recording_id: recording_id,
                student_activity_type:act_status,
                student_activity_time:time_act
                }),

                }).success(function(res) {
                    //alert("success");
                }).error(function(res) {
                //alert("error");
                });
      }
      //end of code for student activity

      $scope.logout = function(){
      window.location.href = "index.html";
      }    
                         
      });//end of app.controller function