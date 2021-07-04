//-----------Variables---------------//
var islogin = false;
const auth = firebase.auth();
var random = rand(6);
var  $profile;
var  mapName = [];
var  mapProfile = [];
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
const menu = document.querySelector('#menu');
const sidebar = document.querySelector('.sidebar');
menu.addEventListener('click', function () {
  sidebar.classList.toggle('show-sidebar');
});

DomEvent('#upload', "click", function(){
  if(islogin){
  window.location.href = '/Video-Point/UserPanel/userpanel.html'}
  else{
    a("You need to Login To Upload a video");
  }
})
DomEvent('#account','click',function()
{
  if(islogin){
    window.location.href = '/Video-Point/UserPanel/userpanel.html';
  }else{
    window.location.href = '/Video-Point/Account/signup.html';
  }
})


getVideos();

function getVideos(){
  var ul = get('.videos__container');
  var ul2 = get('#Latest');
  var ul3 = get('#comedy');
  var ul4 = get('#love');
  var ul5 = get('#sad');
  if(random >= 4 ){
  firebase.database().ref('video').limitToFirst(3).on('child_added',function(snapshot){
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
}else{
  firebase.database().ref('video').limitToLast(3).on('child_added',function(snapshot){
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

});
}
  firebase.database().ref('video').limitToLast(3).on('child_added',function(snapshot){

    ul2.innerHTML += `          <div class="video"  data-id="${snapshot.key}" onclick="videoClicked(this)">
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
  
  });
  firebase.database().ref('video').orderByChild('type').equalTo('comedy').limitToLast(6).on('child_added',function(snapshot){

    ul3.innerHTML += `          <div class="video" data-id="${snapshot.key}"  onclick="videoClicked(this)">
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
  
  });
  firebase.database().ref('video').orderByChild('type').equalTo('love').limitToLast(6).on('child_added',function(snapshot){

    ul4.innerHTML += `          <div class="video" data-id="${snapshot.key}" onclick="videoClicked(this)">
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
  
  });
  firebase.database().ref('video').orderByChild('type').equalTo('sad').limitToLast(6).on('child_added',function(snapshot){

    ul5.innerHTML += `          <div class="video" data-id="${snapshot.key}" onclick="videoClicked(this)">
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
  
  });
}
//----------------user if loggined---------------------//
auth.onAuthStateChanged(function(user){
		
  if(user){
    isUserLogin(true)
      var email = user.email;
     var  userid = user.uid;
              localStorage.setItem("uid",userid);
              localStorage.setItem("mail",email);    
  }else{
    isUserLogin(false)
      console.log("No Active User");
      //no user is signed in
  }
  
});
function isUserLogin(value){
if(value){islogin=true}else{islogin=false}
};

function videoClicked(vid){
  var id = vid.getAttribute("data-id");
  //  c(id);
  // localStorage.setItem('key',id);
  window.location.href = '/Video-Point/video view/video.html?page='+id;
}
var element = get('.videos')
var _x = 0
DomEvent('.videos','scroll',function(){
  if (element.scrollHeight - element.scrollTop === element.clientHeight)
  {
    c("reached end");
    var ul = get('.videos__container');
    if(_x < 1){
      firebase.database().ref('video').limitToLast(6).on('child_added',function(snapshot){
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
      
      });
      _x++;
    }
  }
})



// --------Search Video -------------//
DomEvent('#srch','click',function(){
  var search = getvalue('#srh');
  var Cap = search.toUpperCase();
  var low = search.toLowerCase();
  var ul = get('.videos__container');
  ul.innerHTML = "";
  firebase.database().ref('video').orderByChild('title').startAt(Cap).endAt(low+'\uf8ff').on('child_added',function(snapshot){
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
  
    console.clear();
  })
})
