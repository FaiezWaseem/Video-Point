var uid , Username, avatar;
uid = localStorage.getItem("uid");
c(uid);
//---------- variables----------/
var edit = document.getElementsByClassName('edit');
var select = document.getElementById('select');
var upload = document.getElementById('upload');
var nameS = document.getElementById('uname');
var emailS = document.getElementById('uemail');
var myprog = document.getElementById('myProgress');
var i = 0 , fr;
var img , imgURL;
var files = [] , fileName;
var reader;
const auth = firebase.auth();
var c = console.log;
var userid , name1;
userid=localStorage.getItem("uid");
var myVideo = [];
var  mapName = [];
var  mapProfile = [];
var isvideo = false;
var videoMilliSec = 0;
var video_Time ;
var fileSize;
var isFileSize = true;
var thumb;
var videoPicked;
var videoTitle;
var title , des , type , emp=false;
var thumbnail_url  , video_url


firebase.database().ref("users/"+uid).once('value').then(function (snapshot) {
    Username = snapshot.val().name;
    avatar = snapshot.val().profile;
c( get('#uname').textContent)
    get('#avatar').src = avatar;
    get('#tab_icon').href = avatar;
    get('#uname').textContent= Username;
    get('#title').textContent= Username;
    get('#uemail').textContent= snapshot.val().email;

  })
  function GoTOHome(){
    window.location.replace("../index.html");
}
function editClick(){

    if(i == 0){
       select.classList.remove("none");
       upload.classList.remove("none");
      
       i++;i++;
   }else{
      
       i--;i--;
       select.className += " none";
       upload.className += " none";
       
    }
}
//-------Selection Process -----------------//
select.onclick = function(e){
    var  input = document.createElement('input');
    input.type = 'file';
   

   input.onchange = e =>{
       files = e.target.files;
       fileName = e.target.files[0].name;
       c(e.target.files[0].name);
       reader = new FileReader();
       reader.onload = function(){
           document.getElementsByClassName('avatar').src = reader.result;
           document.getElementsByTagName('img').src = reader.result;
           

              alert("file picked click upload button");
       }
       reader.readAsDataURL(files[0]);
   }    
   input.click();

}

//----------UPLOAD PROCESS-----------------//


upload.onclick = function (){
    myprog.classList.remove("none");
   img = "avatar";
 
   //firebase cloud storage
   var uploadTask = firebase.storage().ref('Profile/'+img+rand+'.png').put(files[0]);

   uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        document.getElementsByName('h4').innerHTML = "upload"+progress+"%";
     c(progress);
     move(progress);

   },
   //error catching
   function(error){
      alert(error);
   },

   //on upload success
   function(){
       uploadTask.snapshot.ref.getDownloadURL().then(function(url){
     imgURL = url;
     c(imgURL);
     firebase.database().ref('users/'+uid).update({
          
         "profile" : imgURL
 
     });
    });
    //realtime db
    myprog.className += " none";
     alert("Upload Successfull \n REFRESH THE PAGE");
   }
   
   );


}

//--------SIDEBAR TOGGLES-----------------//
DomEvent('#vid','click', function(){
    get('.profile').style.display = 'none';
    get('.UploadFile').style.display = 'none';
    get('.videos').style.display = 'block';
    get('#watchlater').style.display = 'none';
    myVideos();
  })
  DomEvent('#profile','click', function(){
  get('#watchlater').style.display = 'none';
  get('.videos').style.display = 'none';
  get('.UploadFile').style.display = 'none';
  get('.profile').style.display = 'block';
})
DomEvent('#uploadx','click', function(){
  get('#watchlater').style.display = 'none';
    get('.videos').style.display = 'none';
    get('.profile').style.display = 'none';
    get('.UploadFile').style.display = 'block';
})
DomEvent('#watched','click',function () {
     get('.profile').style.display = 'none';
    get('.UploadFile').style.display = 'none';
    get('.videos').style.display = 'none';
    get('#watchlater').style.display = 'block'; 
    watchLaterVideos();
})
//--------------MY VIDEOS--------------//
function myVideos(){
  var $profile;
    var ul = get('.videos__container')
    ul.innerHTML = "";
    firebase.database().ref('Userposts/'+uid).on('child_added',function(snapshot){
      for(let d = 0 ; d<= mapProfile.length-1; d++){
        if(mapProfile[d].uid === snapshot.val().uid){
             $profile  = mapProfile[d].profile;
        }
      }
      const drive = "https://drive.google.com/thumbnail?id="
      const url = snapshot.val().thumbnail;
      const new_url = url.replace('https://drive.google.com/uc?export=download&id=',drive) 
        ul.innerHTML += `          <div class="video" data-id="${snapshot.key}" onclick="videoClicked(this)">
        <div class="video__thumbnail" data-id="${snapshot.key}">
        <img src="${new_url}" class="video__thumbnail">
        </div>
        <div class="video__details">
          <div class="author">
            <img
              src="${$profile}"
              alt=""
            />
          </div>
          <div class="title">
            <h3>${snapshot.val().title}</h3>
            <a href="">${snapshot.val().username}</a>
            <span>${snapshot.val().view}view • ${convertTime(snapshot.val().time)}</span>
          </div>
        </div>
      </div>`
    
      })
}
function watchLaterVideos() {
  var $profile;
  var ul = get('.videos_Watch_Later')
  ul.innerHTML = "";
  firebase.database().ref('watchLater/'+uid+"/").on('child_added',function(snapshot){

          var pkey = snapshot.val().vid_key;
          firebase.database().ref('video/'+pkey).once('value').then(function (snapshot){
            for(let d = 0 ; d<= mapProfile.length-1; d++){
              if(mapProfile[d].uid === snapshot.val().uid){
                   $profile  = mapProfile[d].profile;
              }
            }
      ul.innerHTML += `          <div class="video" data-id="${snapshot.key}"  onclick="videoClicked(this)">
      <div class="video__thumbnail" data-id="${snapshot.key}">
      <img src="${snapshot.val().thumbnail}" class="video__thumbnail">
      </div>
      <div class="video__details">
        <div class="author">
          <img
            src="${$profile}"
            alt=""
          />
        </div>
        <div class="title">
          <h3>${snapshot.val().title}</h3>
          <a href="">${snapshot.val().username}</a>
          <span>${snapshot.val().view}view • ${convertTime(snapshot.val().time)}</span>
        </div>
      </div>
    </div>`
  
    });
  });
}

function videoClicked(vid){
  var id = vid.getAttribute("data-id");
  //  c(id);
  // localStorage.setItem('key',id);
  window.location.href = '../video view/video.html?page='+id;
  }
function  getusersDetail() {
  firebase.database().ref('users').on('child_added',function(snapshot){
    var username = snapshot.val().name        
    var avatar = snapshot.val().profile        
    var _uid = snapshot.val().uid        
    data = {
              'name': username,
              'uid':_uid 
            }
    data2 = {
              'profile': avatar,
              'uid':_uid 
            }
            mapName.push(data)
            mapProfile.push(data2)
            
  });
}

getusersDetail();



//---------------VIDEO UPLOAD------------------//


  function inputVal(){
    title = getvalue('#vidtitle');
    des = getvalue('#des')
    type = getvalue('#type')
    
    if(title == "" || des == ""  || type == ""){
        a("Please Fill out all fields");
        emp = false;
    }else{emp=true}
  }
  const dropArea = get('.drag-area');
  const dragText = get('.header');
  
  let button = get('.button');
  let input = get('input');
  
  let file; 
button.onclick = () => {
  input.click();
};

// when browse
input.addEventListener('change', function (e) {
  dropArea.classList.add('active');   
    var video = get('#video');
  let validExtensions = ['video/mp4'];
// if file is  a mp4 video  
       if (validExtensions.includes(e.target.files[0].type)) {

    get('#upload_container').style.display = "none"
    get('.video-box').style.display = "block"
        files = e.target.files;
        fileName = e.target.files[0].name;
        reader = new FileReader();
        reader.readAsArrayBuffer(files[0]);
        reader.onload = f => {
    getVideoCover(files[0] , 1.5)
            fr = f;
           }
       }    
       input.click();
});

function isSizeBig(size){
  if(size > 53000000){
     isFileSize = false
  }
}

function uploadVideo() {
  inputVal();
  if(emp){dbUpload()}
}
function dbUpload() {
  try{

    uploadToDrive(fr , files[0]);
  }catch(err){
   console.warn(err)
   get('.Loading-Modal').style.display = "none"
  }
}
function DBUpload(url){
  // Get a key for a new Post.
  var t = getTimeinMilli();
var newPostKey = firebase.database().ref().child('video').push().key;
  firebase.database().ref("video/"+newPostKey).set({
    "video":video_url,
    "thumbnail": thumbnail_url,
    "title": title,
    "videoSize": files[0].size,
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
    "video":video_url,
    "thumbnail": thumbnail_url,
    "title": title,
    "videoSize": files[0].size,
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
  get('.Loading-Modal').style.display = "none"
  get('.video-box').style.width = 'none';
  get('.UploadFile').style.width = 'block';
}
function getVideoCover(file, seekTo = 0.0) {
  console.log("getting video cover for file");
  get('.Loading-Modal').style.display = "grid"
      // load the file to a video player
      const videoPlayer = document.createElement('video');
      videoPlayer.setAttribute('src', URL.createObjectURL(file));
      videoPlayer.load();
      videoPlayer.addEventListener('error', (ex) => {
          console.error("error when loading video file", ex);
      });
      // load metadata of the video to get video duration and dimensions
      videoPlayer.addEventListener('loadedmetadata', () => {
          // seek to user defined timestamp (in seconds) if possible
          if (videoPlayer.duration < seekTo) {
              console.error("video is too short.");
              return;
          }
          // delay seeking or else 'seeked' event won't fire on Safari
          setTimeout(() => {
            videoPlayer.currentTime = seekTo;
          }, 200);
          // extract video thumbnail once seeking is complete
          videoPlayer.addEventListener('seeked', () => {
            videoMilliSec    =  videoPlayer.duration ;
            video_Time = videoPlayer.duration;
              console.log('video is now paused at %ss.', seekTo);
              const canvas = document.createElement("canvas");
              canvas.width = videoPlayer.videoWidth;
              canvas.height = videoPlayer.videoHeight;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
              ctx.canvas.toBlob(
                blob => {
                  thumb = canvas.toDataURL("image/jpeg");
                    return   thumb = uploadThumbnail(thumb);
                  },
                  "image/jpeg",
                  0.75 /* quality */
              );
          });
      });

}
function uploadThumbnail(file){
  const id = 'AKfycbwVJszGTGgfWl5Pexu8YrG010DMcJQVaDmyYqivoedIvm83ZTmi1rAdmKbGD6h8r5bu1g'
  const url = `https://script.google.com/macros/s/${id}/exec`; 
  console.log('uploading Thumbnail')
  const qs = new URLSearchParams({filename:`img${rand(100)+rand(789)}`, mimeType: 'image/jpeg'});
  fetch(`${url}?${qs}`, {
method: "POST",
body: JSON.stringify(file.substr(file.indexOf('base64,')+7))})
  .then(res => res.json())
  .then(e => {
    console.log('Thumbnail Uploaded')
    thumbnail_url = ` https://drive.google.com/uc?export=download&id=${e.fileId}`
    get('.Loading-Modal').style.display = "none"
    return thumbnail_url;
  })
  .catch(err =>{
    get('.Loading-Modal').style.display = "none"
       console.error(err)
       alert('Uploading Error \n ' + JSON.stringify(err))
       return err;
  })
}
function uploadToDrive(f , file){
  get('.Loading-Modal').style.display = "grid"
  const id = 'AKfycbxfwq0PGdYnf6LYsFj9Rog5veT00jukFHZPL_l5WipFH_8ApxLgoiEtSGfpsGA2NNGc'
  const url = `https://script.google.com/macros/s/${id}/exec`; 
  console.log('uploading Video')
  const qs = new URLSearchParams({filename: file.name, mimeType: file.type});
  fetch(`${url}?${qs}`, {
method: "POST",
body: JSON.stringify([...new Int8Array(f.target.result)])})
  .then(res => res.json())
  .then(e => {
     console.log('Video Uploaded')
       video_url = ` https://drive.google.com/uc?export=download&id=${e.fileId}`
     console.log("Thuhmnail Url : " + thumbnail_url + "\n Video Url" + video_url)
     DBUpload(video_url) ; 
  })
  .catch(err =>{
    get('.Loading-Modal').style.display = "none"
      console.error(err)
       alert('Uploading Error \n ' + JSON.stringify(err))
  })
}
//-----------------------File Upload finished ---------------------------// 