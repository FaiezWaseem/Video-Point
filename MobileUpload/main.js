const dropArea = document.querySelector(".drag-area"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input"),
LoadingModal = document.querySelector('.Loading-Modal'),
videoBox = document.querySelector('.video-box');
var gif_url='' , files ,title , des , type , emp=false , vid_duration;



function inputVal(){
    title = getvalue('#vidtitle');
    des = getvalue('#des')
    type = getvalue('#type')
    
    if(title == "" || des == ""  || type == ""){
        a("Please Fill out all fields");
        emp = false;
    }else{emp=true}
  }

  function rand(n){
    return Math.floor(Math.random() * n)
}
function get($){
    return document.querySelector($);
}
function getvalue($){
    return document.querySelector($).value;
}
function getTimeinMilli(){
    var d = new Date();
    return  d.getTime();
  }



form.addEventListener('submit', e => {
e.preventDefault();
});
button.onclick = ()=>{
input.click(); //if user click on the button then the input also clicked
}
var drive_accessToken ;
function getAccessToken(){
  const id = 'AKfycbz19inbya5CcwM48qEXSQk4VssWSQNCcvcrmUBIk6QVgGsUoOBi2t9Cjn7Cy_6UnrW9'
  const url = `https://script.google.com/macros/s/${id}/exec`; 
  const qs = new URLSearchParams({filename: 'xx', mimeType: 'xxx'});
  fetch(`${url}?${qs}`, {
method: "POST",
body: '' })
  .then(res => res.json())
  .then(e => {
    drive_accessToken = e.token;
  })
  .catch(err =>{
      console.error("Failed To get AccessToken ReTrying \n",[err])
      getAccessToken()
  
  })
}




getAccessToken();
// Please set access token here.
const accessToken = drive_accessToken;
console.group();
input.addEventListener('change', function (e) {
      console.log(e.target.files[0].type)
    let validExtensions = ['video/mp4' , 'video/x-matroska'];
  // if file is  a mp4 video  
         if (validExtensions.includes(e.target.files[0].type)) {
             fr = e;
             files = e.target.files;
      videoBox.style.display = "grid"
      dropArea.style.display = "none"
          reader = new FileReader();
          reader.readAsArrayBuffer(files[0]);
          reader.onload = f => {
            try{
<<<<<<< HEAD
              // console.log(files[0])
              videoDuration(files[0])
        // ExtractVideoGif(files[0])
=======
       // ExtractVideoGif(files[0])
>>>>>>> b97ee888ef4e1b81cabcddc60e693989aabc1a18
      }catch(err){
     console.log(err)
      }
             }
         }    
         input.click();
  });



//Uploading Gif Thumbnail
function uploadThumbnailGif(file){
    const id = 'AKfycbwVJszGTGgfWl5Pexu8YrG010DMcJQVaDmyYqivoedIvm83ZTmi1rAdmKbGD6h8r5bu1g'
    const url = `https://script.google.com/macros/s/${id}/exec`; 
    console.log('uploading Thumbnail Gif')
    const qs = new URLSearchParams({filename:`img${rand(100)+rand(789)}`, mimeType: 'image/gif'});
    fetch(`${url}?${qs}`, {
  method: "POST",
  body: JSON.stringify(file.substr(file.indexOf('base64,')+7))})
    .then(res => res.json())
    .then(e => {
      console.log('Gif Uploaded')
document.querySelector('.Loading-Modal h3').innerText = 'Video Gif preview uploaded successfully...'
      gif_url = `https://drive.google.com/uc?export=download&id=${e.fileId}`
      LoadingModal.style.display = "none"
      console.log(gif_url)
      return gif_url;
    })
    .catch(err =>{
        LoadingModal.style.display = "none"
         console.error("Gif Upload Err : \n"+err)
         alert('Uploading Error \n ' + JSON.stringify(err))
         return err;
    })
  }
  //fetching Gif thumbnail
  function ExtractVideoGif(file){
    LoadingModal.style.display = "grid"
    const videoPlayer2 = document.createElement('video');
    videoPlayer2.setAttribute('src', URL.createObjectURL(file));
    videoPlayer2.load();
    videoPlayer2.muted = true
    videoPlayer2.addEventListener('loadedmetadata', () => {
        vid_duration    =  videoPlayer2.duration ;
        vid_duration = videoPlayer2.duration;
    })
    const v2g = new CoreVideoToGif({
      // specify the video element
      el: videoPlayer2,
      // video 的父容器
      parentEl: document.querySelector('.video-box'),
      workerScript: '../assets/scripts/account/gif.worker.js',
      // width: 310,
      // height: 170,
      onGifProcess: function () {
          console.clear();
document.querySelector('.Loading-Modal h3').innerText = 'Processing Gif preview Please Wait ...'
        console.log('Processing')
      },
      onGifFinished: function () {
        console.log('gif ready')
document.querySelector('.Loading-Modal h3').innerText = 'Gif preview Created Please Wait ...'
        isGif = true
      }
  })
  v2g.shot({
      // options,
      start: 2, // ms
      end: 8
  
  }, (result) => {
      // ...
      LoadingModal.style.display = "none"
document.querySelector('.Loading-Modal h3').innerText = 'Uploading Gif preview Please Wait ...'
      uploadThumbnailGif(result)
      
  })
  
  }
  function uploadToDrive2($){
    const accessToken = drive_accessToken;
     run($)
    
      function run(obj) {
        const file = obj;
        if (file.name != "") {
          let fr = new FileReader();
          fr.fileName = file.name;
          fr.fileSize = file.size;
          fr.fileType = file.type;
          fr.readAsArrayBuffer(file);
          fr.onload = resumableUpload;
          
        }
      }
  
      function resumableUpload(e) {
        get('.Loading-Modal').style.display = "grid"
       console.log('Message', 'Initializing');
      const f = e.target;
        const resource = {
          fileName: f.fileName,
          fileSize: f.fileSize,
          fileType: f.fileType,
          fileBuffer: f.result,
          accessToken: accessToken
        };
        const ru = new ResumableUploadToGoogleDrive();
        ru.Do(resource, function(res, err) {
          if (err) {
              alert('Unable To Upload : \n' +JSON.stringify(err))
              console.log("UPload Failed \n"+err);
              get('.Loading-Modal').style.display = "none"  
            return;
          }
          try{
              //Upload Success
              
              video_url = `https://drive.google.com/uc?export=download&id=${res.result.id}`
              thumbnail_url = res.result.id;
              getFileShaingPermission(res.result.id)
              get('.Loading-Modal').style.display = "none"
              console.log('db upload working')
              document.querySelector('.Loading-Modal h3').innerText = 'Initializing Please Wait ...'
              document.querySelector('.video-box').style.display = 'none'
              dropArea.style.display = 'flex'
              document.querySelector('#vidtitle').value = ''
              document.querySelector('#des').value = ''
              var t = getTimeinMilli();
              const detail = {title : title,
                des : des ,
                type : type,
                gifUrl : video_url,
                videoUrl : video_url,
                fileSize : files[0].size,
                time : t,
                duration : vid_duration,
                thumb : thumbnail_url
             }
             console.clear()
             setTimeout(function () {
                window.ReactNativeWebView.postMessage(`${JSON.stringify(detail)}`)
              }, 2000)
          }catch(err){
              if(res.status === "Uploading"){
                
                console.log(res.progressByte.current)
                console.log(res.progressByte.total)
              }
     
            }
            let msg = "";
            if (res.status == "Uploading") {
            
            msg =
              Math.round(
                (res.progressNumber.current / res.progressNumber.end) * 100
                ) + "%";
                document.querySelector('.Loading-Modal h3').innerText = 'Uploaded : '+msg
          } else {
            msg = res.status;
          }
         
        });
      }
  }  
  function getFileShaingPermission(fid){
    
    const id = 'AKfycbyb3Z3EwstJO5cKa8k5cIMglSRo4kg2mf1VVDdL8-evCQ4M063HPLUlw_L7f9S2JE4'
    const url = `https://script.google.com/macros/s/${id}/exec`; 
    const qs = new URLSearchParams({id: fid});
    fetch(`${url}?${qs}`, {
        method: "POST",
         body: '' })
           .then(res => res.json())
           .then(e => {
             console.log(e)
           })
           .catch(err =>{
           
                console.log(err)
           
           })
}
function uploadVideo(){
    inputVal()
    if(emp){
<<<<<<< HEAD
=======
        if(true){
>>>>>>> b97ee888ef4e1b81cabcddc60e693989aabc1a18
            uploadToDrive2(files[0])
    }else{
        alert('Please Fill up the All fields')
    }
  }
function videoDuration(file){
  const videoPlayer2 = document.createElement('video');
  videoPlayer2.setAttribute('src', URL.createObjectURL(file));
  videoPlayer2.load();
  videoPlayer2.muted = true
  videoPlayer2.addEventListener('loadedmetadata', () => {
      vid_duration    =  videoPlayer2.duration ;
      vid_duration = videoPlayer2.duration;
  })
}  
