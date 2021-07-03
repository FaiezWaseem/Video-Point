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
var i = 0;
var img , imgURL;
var files = [] , fileName;
var reader;
const auth = firebase.auth();
var c = console.log;
var userid , name1;
userid=localStorage.getItem("uid");
c(userid);
var rand1 = Math.floor((Math.random() * 99999999999) + 1);
var rand = Math.floor((Math.random() * rand1) + 1);
c(rand);
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
        ul.innerHTML += `          <div class="video" data-id="${snapshot.key}" onclick="videoClicked(this)">
        <div class="video__thumbnail" data-id="${snapshot.key}">
        <video src="${snapshot.val().video}" class="video__thumbnail">
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
      ul.innerHTML += `          <div class="video" data-id="${snapshot.key}" onclick="videoClicked(this)">
      <div class="video__thumbnail" data-id="${snapshot.key}">
      <video src="${snapshot.val().video}" class="video__thumbnail">
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
    c(id);
    localStorage.setItem('key',id);
    window.location.replace('/video view/index.html');
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
  // when file is inside drag area
dropArea.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropArea.classList.add('active');
  dragText.textContent = 'Release to Upload';
  // console.log('File is inside the drag area');
});

// when file leave the drag area
dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('active');
  // console.log('File left the drag area');
  dragText.textContent = 'Drag & Drop';
});

// when file is dropped
dropArea.addEventListener('drop', (event) => {
  event.preventDefault();
  // console.log('File is dropped in drag area');
  files = event.dataTransfer.files[0]; // grab single file even of user selects multiple files
  myVideo.push(files);
  videoPicked = files;
  displayFile();
});

function displayFile() {
  myVideo.push(files[0]);
  let fileType = files.type;
  console.log(fileType);
var video = get('#video');
  let validExtensions = ['video/mp4'];

  if (validExtensions.includes(fileType)) {
    // console.log('This is an image file');
    let fileReader = new FileReader();

    fileReader.onload = () => {
      let fileURL = fileReader.result;
      // console.log(fileURL);
      get('.video-box').style.display = 'block';
      get('#upload_container').style.display = 'none';
    get('#video').src = fileURL;   
    get('#video').onloadedmetadata = function() {
      videoMilliSec = video.duration;
      getFileinfo();
    }

    };

    fileReader.readAsDataURL(files);

  } else {
    alert('This is not a Video File');
    dropArea.classList.remove('active');
  }
}
button.onclick = () => {
  input.click();
};

// when browse
input.addEventListener('change', function () {
  files = this.files[0];
  myVideo.push(this.files[0]);
  videoPicked = files[0];
  dropArea.classList.add('active');
  displayFile();
});


function getFileinfo() {
  var infos = get('#infos');
  video_Time = videoDuration(video.duration);
  fileSize = FileSize(myVideo[0].size);
  videoTitle = myVideo[0].name;
  isSizeBig(videoMilliSec);
  c("Duration in Millisec :"+videoMilliSec)
  c("Duration in Time :"+video_Time)
  c("File Size :"+fileSize)
  c("File name :"+videoTitle)
  infos.innerHTML =  videoTitle + "  "+video_Time +"  "+ fileSize;

}

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
    //firebase cloud storage
 var uploadTask = firebase.storage().ref('vid/'+rand+videoTitle).put(files);

 uploadTask.on('state_changed', function(snapshot){
      var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
   c(progress);
get('.jquery').style.width = Math.floor(progress) +"%";
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
  get('.video-box').style.width = 'none';
  get('.UploadFile').style.width = 'block';
}
