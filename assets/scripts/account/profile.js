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


DomEvent('#vid','click', function(){
    get('.profile').style.display = 'none';
    get('.videos').style.display = 'block';
})
DomEvent('#profile','click', function(){
    get('.videos').style.display = 'none';
    get('.profile').style.display = 'block';
})
function myVideos(){
    var ul = get('.videos__container')
    firebase.database().ref('Userposts/'+uid).on('child_added',function(snapshot){
        ul.innerHTML += `          <div class="video" data-id="${snapshot.key}" onclick="videoClicked(this)">
        <div class="video__thumbnail" data-id="${snapshot.key}">
        <video src="${snapshot.val().video}" class="video__thumbnail">
        </div>
        <div class="video__details">
          <div class="author">
            <img
              src="${snapshot.val().profile}"
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
myVideos();
function videoClicked(vid){
    var id = vid.getAttribute("data-id");
    c(id);
    localStorage.setItem('key',id);
    window.location.replace('/video view/index.html');
  }