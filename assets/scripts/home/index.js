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
//------upload clicked----------//
DomEvent('#upload', "click", function(){
  if(islogin){
  window.location.href = 'UserPanel/userpanel.html'}
  else{
    a("You need to Login To Upload a video");
  }
})
//----Profile Icon Clicked Goto UserPanel---------//
DomEvent('#account','click',function()
{
  if(islogin){
    window.location.href = 'UserPanel/userpanel.html';
  }else{
    window.location.href = 'Account/signup.html';
  }
})
//------Loading Videos--------//
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
//-------VideoClicked ---Go TO Video Page-------------------//
function videoClicked(vid){
  var id = vid.getAttribute("data-id");
  window.location.href = 'video view/video.html?page='+id;
}

//---------onscrolled to bottom load more video----------///
var element = get('.videos')
var _x = 0
DomEvent('.videos','scroll',function(){
  if (element.scrollHeight - element.scrollTop === element.clientHeight)
  {
    c("reached end");
    var ul = get('.videos__container');
    if(_x < 1){
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
      _x++;
    }
  }
})

//---------------------------------------------------------------------------//
//--------------------------SIDE BAR  CLICKS --------------------------------//
//--------------------------------------------------------------------------//
// --------Search Video -------------//
DomEvent('#srch','click',function(){
  var search = getvalue('#srh');
  if(search === ""){a('Enter Something To seacrh')}else{
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
}
})

DomEvent('#home','click',function () {
  get('.home').style.display = "block";
  get('.trending_vid').style.display = "none";
})

//--------Video Trend Logic---------//
DomEvent('#trend','click',function () {
  get('.home').style.display = "none";
  get('.trending_vid').style.display = "block";
    trend(views)            
})
var views = [];
firebase.database().ref('views').on('child_added',function(snapshot){
  var obj = {
     'view':snapshot.val().view,
     'key':snapshot.val().key
  }
  views.push(obj);
  views.sort(function (x, y) {
    return y.view - x.view;
  }) 
});


function trend(views) {
  var ul = get('#trending');
  ul.innerHTML= "";
  for(let i = 0 ; i <= views.length-1; i++){
    c(i);
    let pkey = views[i].key;
    firebase.database().ref('video/'+pkey).once('value').then(function (snapshot){
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
}
//-----Clicked sidebar menu myvideo---------------//
DomEvent('#myvideos','click',function()
{
  if(islogin){
    window.location.href = 'UserPanel/userpanel.html';
  }else{
    window.location.href = 'Account/signup.html';
  }
})
//-----Clicked sidebar menu myvideo---------------//
DomEvent('#watch_later','click',function()
{
  if(islogin){
    window.location.href = 'UserPanel/userpanel.html';
  }else{
    window.location.href = 'Account/signup.html';
  }
})
//-----Clicked sidebar menu login---------------//
DomEvent('#login','click',function()
{
  if(islogin){
     a('Already Logged in');
  }else{
    window.location.href = 'Account/signup.html';
  }
})
//-----Clicked sidebar menu logout--------------//
DomEvent('#logout','click',function()
{
  if(islogin){
    auth.signOut();
    a("Signed Out");
  }else{
    a("You are not signed in\nHow can you SignOut")
  }
})