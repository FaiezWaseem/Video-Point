//------Variables -------------------//

var isvideo = false;
var videoMilliSec = 0;
var video_Time ;
var fileSize;
var isFileSize = true;
var thumb;
var videoPicked;
var videoTitle;
var title , des , type , emp=false;
var uid , Username, avatar;
uid = localStorage.getItem("uid");
c(uid);
firebase.database().ref("users/"+uid).once('value').then(function (snapshot) {
  Username = snapshot.val().name;
  avatar = snapshot.val().profile;
  c(Username)
})
function inputVal(){
  title = getvalue('#title')
  des = getvalue('#des')
  type = getvalue('#type')
  if(title == "" || des == ""  || type == ""){
      a("Please Fill out all fields");
      emp = false;
  }else{emp=true}
}

var myVideos = [];
window.URL = window.URL || window.webkitURL;
document.getElementById('fileUp').onchange = setFileInfo;
var canvas = document.getElementById('canvas-element');
var video2 = document.getElementById('video');
//Select File
function setFileInfo() {
  var files = this.files;
  myVideos.push(files[0]);
  var video = document.createElement('video');
  video.preload = 'metadata';

  video.onloadedmetadata = function() {
    window.URL.revokeObjectURL(video.src);
    var duration = video.duration;
    myVideos[myVideos.length - 1].duration = duration;
    updateInfos();
  }
  document.getElementById('canvas-prop').style.display = 'block';
  video.src = URL.createObjectURL(files[0]);
  video2.src = URL.createObjectURL(files[0]);
  videoPicked = files[0];
}
// save Canvas image
function save(){
    inputVal();
    if(isvideo){
        if(isFileSize){
            if(emp){
         uploadVideo();
          }
        }else{a("file Size Too Big")}
    }else{a("Please Pick A Video File")}
}
//working with metaData of video
function updateInfos() {
  var infos = document.getElementById('infos');
  videoMilliSec = myVideos[0].duration;
  video_Time = videoDuration(myVideos[0].duration);
  fileSize = FileSize(myVideos[0].size);
  videoTitle = myVideos[0].name;
  infos.textContent = "";
  if(myVideos[0].type == "video/mp4"){
   isvideo = true;
  }
  isSizeBig(videoMilliSec);
  infos.textContent =  videoDuration(myVideos[0].duration) +" " +FileSize(myVideos[0].size); 
}
function isSizeBig(size){
    if(size > 53000000){
       isFileSize = false
    }
}
function uploadVideo(){
 //firebase cloud storage
 var uploadTask = firebase.storage().ref('vid/'+rand(1000)+videoTitle).put(videoPicked);

 uploadTask.on('state_changed', function(snapshot){
      var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
   c(progress);
   on();
 },
 //error catching
 function(error){
    a(error);
 },

 //on upload success
 function(){
     uploadTask.snapshot.ref.getDownloadURL().then(function(url){
   DBUpload(url);
  });
  //realtime db
  off();
   alert("Upload Successfull");
 }
 
 );

}
function DBUpload(url){
  // Get a key for a new Post.
  var t = getTimeinMilli();
var newPostKey = firebase.database().ref().child('video').push().key;
  firebase.database().ref("video/"+newPostKey).set({
    "video":url,
    "title": title,
    "videoSize": fileSize,
    "VideoMillisec": videoMilliSec,
    "duration":video_Time,
    "view": "0",
    "type": type,
    "des": des,
     "likes":"0",
     "uid": uid,
     "time":t,
     "key":newPostKey,
     "username":Username,
     "profile":avatar

  })
  firebase.database().ref("Userposts/"+uid+"/"+newPostKey).set({
    "video":url,
    "title": title,
    "videoSize": fileSize,
    "VideoMillisec": videoMilliSec,
    "duration":video_Time,
    "view": "0",
    "type": type,
    "des": des,
     "likes":"0",
     "uid": uid,
     "time":t,
     "key":newPostKey,
     "username":Username,
     "profile":avatar

  })
}
function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}