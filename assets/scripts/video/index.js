//-----------!important variables -----------------//
var key, islogin = false, fuserid , myliked=false ,Username , Profile;
key = localStorage.getItem('key');
const auth = firebase.auth();
// --------------Checking Login Info--------------//
auth.onAuthStateChanged(function(user){
		
  if(user){

      var email = user.email;
     var  userid = user.uid;
              localStorage.setItem("uid",userid);
         islogin = true;
         c("Registered User")

         firebase.database().ref("users/"+userid).once('value').then(function (snapshot) {
         
         get('#comment_profile').src = snapshot.val().profile;
         Username = snapshot.val().name;
         Profile = snapshot.val().profile;
      
        })
  }else{
    islogin = false;
      console.log("Anonymous User");
      //no user is signed in
  }
  
});

fuserid = localStorage.getItem('uid');
// -------------------------------------VIDEO PROPERTIES------------------------------------------------//
var player , btnPlayPause , btnMute , progressBar , volumeBar; 
const menu = document.querySelector('#menu');
const sidebar = document.querySelector('.sidebar');
menu.addEventListener('click', function () {
  sidebar.classList.toggle('show-sidebar');
});
var i = setInterval(function() {
	if(player.readyState > 0) {
		var minutes = parseInt(player.duration / 60, 10);
		var seconds = player.duration % 60;
console.log(Math.round(minutes),"min",Math.round(seconds),"sec")
		// (Put the minutes and seconds in the display)

		clearInterval(i);
	}
}, 200);
// Get a handle to the player
player = document.getElementById('video-element');
	btnPlayPause = document.getElementById('btnPlayPause');
	btnMute      = document.getElementById('btnMute');
	progressBar  = document.getElementById('progress-bar');
  volumeBar    = document.getElementById('volume-bar');
  // Update the video volume
  volumeBar.addEventListener("change", function(evt) {
		player.volume = evt.target.value;
	});
  
	// Add a listener for the timeupdate event so we can update the progress bar
	player.addEventListener('timeupdate', updateProgressBar, false);
	
	// Add a listener for the play and pause events so the buttons state can be updated
	player.addEventListener('play', function() {
		// Change the button to be a pause button
		changeButtonType(btnPlayPause, 'pause');
	}, false);
  
	player.addEventListener('pause', function() {
		// Change the button to be a play button
		changeButtonType(btnPlayPause, 'play');
	}, false);
function initializeVideo() {
  const time = formatTime( Math.round(player.duration));
  const time2 = formatTime( Math.round(player.currentTime));

  get('#video_time').innerText = time2.minutes+"m : "+time2.seconds+"s"  +"/"+time.minutes+"m : "+time.seconds+"s";
  player.play();
  changeButtonType(btnPlayPause, 'pause');
}

	player.addEventListener('loadedmetadata', initializeVideo);
	player.addEventListener('volumechange', function(e) { 
		// Update the button to be mute/unmute
		if (player.muted) changeButtonType(btnMute, 'unmute');
		else changeButtonType(btnMute, 'mute');
	}, false);	
  
	player.addEventListener('ended', function() { this.play(); }, false);	
  
  progressBar.addEventListener("click", seek);

  function seek(e) {
      var percent = e.offsetX / this.offsetWidth;
      player.currentTime = percent * player.duration;
      e.target.value = Math.floor(percent / 100);
      e.target.innerHTML = progressBar.value + '% played';
  }

  function playPauseVideo() {
  	if (player.paused || player.ended) {
  		// Change the button to a pause button
  		changeButtonType(btnPlayPause, 'pause');
      play_vid();
  	}
  	else {
  		// Change the button to a play button
  		changeButtonType(btnPlayPause, 'play');
      pause_vid()
  	}
  }

  document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
      playPauseVideo();
    }
  })
  function play_vid()
{
 player.play();
}
function pause_vid()
{
 player.pause();
}
  // Stop the current media from playing, and return it to the start position
  function stopVideo() {
  	player.pause();
  	if (player.currentTime) player.currentTime = 0;
  }
  
  // Toggles the media player's mute and unmute status
  function muteVolume() {
  	if (player.muted) {
  		// Change the button to a mute button
  		changeButtonType(btnMute, 'mute');
  		player.muted = false;
  	}
  	else {
  		// Change the button to an unmute button
  		changeButtonType(btnMute, 'unmute');
  		player.muted = true;
  	}
  }
  
  // Replays the media currently loaded in the player
  function replayVideo() {
  	resetPlayer();
  	player.play();
  }
  function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
  
    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2),
    };
  }
  // Update the progress bar
  function updateProgressBar() {
  	// Work out how much of the media has played via the duration and currentTime parameters
  	var percentage = Math.floor((100 / player.duration) * player.currentTime);
  	// Update the progress bar's value
  	progressBar.value = percentage;
  	// Update the progress bar's text (for browsers that don't support the progress element)
  	progressBar.innerHTML = percentage + '% played';
    const time = formatTime( Math.round(player.duration));
    const time2 = formatTime( Math.round(player.currentTime));

    get('#video_time').innerText = time2.minutes+"m : "+time2.seconds+"s"  +"/"+time.minutes+"m : "+time.seconds+"s";
  }
  
  // Updates a button's title, innerHTML and CSS class
  function changeButtonType(btn, value) {
  	btn.title     = value;
  	btn.innerHTML = value;
  	btn.className = value;
  }
  
  function resetPlayer() {
  	progressBar.value = 0;
  	// Move the media back to the start
  	player.currentTime = 0;
  	// Set the play/pause button to 'play'
  	changeButtonType(btnPlayPause, 'play');
  }  
  
  function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
  }
  
  function toggleFullScreen() {
    //var player = document.getElementById("player");

    if (player.requestFullscreen)
        if (document.fullScreenElement) {
            document.cancelFullScreen();
        } else {
            player.requestFullscreen();
        }
        else if (player.msRequestFullscreen)
        if (document.msFullscreenElement) {
            document.msExitFullscreen();
        } else {
            player.msRequestFullscreen();
        }
        else if (player.mozRequestFullScreen)
        if (document.mozFullScreenElement) {
            document.mozCancelFullScreen();
        } else {
            player.mozRequestFullScreen();
        }
        else if (player.webkitRequestFullscreen)
        if (document.webkitFullscreenElement) {
            document.webkitCancelFullScreen();
        } else {
            player.webkitRequestFullscreen();
        }
    else {
        alert("Fullscreen API is not supported");
        
    }
  }
//----------------X----V-I-D-E-O--L-O-G-I-C----E-N-D---X----


// --------Getting Url Parameeters
var url = new URL(window.location.href);
var c2 = url.searchParams.get("page");
if(c2 === ""){

}else{
key = c2;
}

  //-----------------Onshare CLick DropDownList---------------//
  function dropDownList() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  window.onclick = function(event) {
    if (!event.target.matches('#font_share')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  //--------Get Video Share Link
  function sharelink(){
    var url2 = new URL(window.location.href);
    copytext(url2+key);
  }

//------------------DATABASE WORKING STARTED---------------------------------------------//

firebaseGetData(key);
//------Loading Video Recommendation
firebase.database().ref('video').limitToLast(7).on('child_added',function(snapshot){
  let ul = get('.item2');
  ul.innerHTML += `             <div class="box" data-id="${snapshot.key}" onclick="clickvid(this)">
  <div class="video">
      <video src="${snapshot.val().video}" id="${snapshot.key}" onmouseover="hover(this);" onmouseout="hoverout(this)">
  </div>
 <div class="v-details">
      <h2 id="v-details">${snapshot.val().title}</h2>
      <h3 id="v-details">${snapshot.val().username}</h3>
  </div>
</div>`
})

//---CLicked a Recommended Video------//
function clickvid(key2){
  id = key2.getAttribute('data-id');
  key = id;
  firebaseGetData(key);
  loadComment(key);
}

//CLicked Liked /Unliked
DomEvent('#font_like', 'click', function(){
 if(islogin){
   if(myliked){myliked = false;CheckUnLiked()}else{ myliked = true;CheckLiked()}
 
 }else{
   a('Please Login To Use this Service')
 }
})


// ---------Load Post Total Like-----------//
function likedList(data){
  var id = data;
  var x = 0;
firebase.database().ref('video/'+id+'/liked/').on('child_added',function(snapshot){
  if(snapshot.val().liked){
    x++
    get('#like_count').innerText = x;
  }else{

  }
  if(islogin){
  if(snapshot.key === localStorage.getItem("uid")){
      console.log("my liked post");
      myliked = true;
      document.getElementById('font_like').textContent = "favorite"; 
  }else{
    myliked= false;
    console.log("not liked");
    document.getElementById('font_like').textContent="favorite_border";
  }}
})
}
// OnLiked 
function CheckLiked(){
 var like_id = document.getElementById("like_count");
 var likes= like_id.innerText++;
 
 firebase.database().ref('video/'+key).update({
  "likes" : ++likes
 })

  firebase.database().ref('video/'+key+'/liked/'+fuserid).set({
      liked : true,
      "uid": fuserid
 }) 
 // post liked now setting like button to invisible
document.getElementById('font_like').textContent="favorite";
}
//On Unliked
function CheckUnLiked(){
  var like_id = document.getElementById("like_count");
  var likes= like_id.innerText--;
  
 
 firebase.database().ref('video/'+key).update({
  "likes" : --likes,
 })
 firebase.database().ref('video/'+key+'/liked/').child(fuserid).remove();
 document.getElementById('font_like').textContent="favorite_border";
 
}

/*----------Check If User Scrolled to bottom
-----------and Load More Videos
*/
var element = get('.container')
var _x = 0
DomEvent('.container','scroll',function(){
  if (element.scrollHeight - element.scrollTop === element.clientHeight)
      {
        if(_x < 1){
          firebase.database().ref('video').limitToFirst(7).on('child_added',function(snapshot){
            let ul = get('.item2');
            ul.innerHTML += `<div class="box" data-id="${snapshot.key}" onclick="clickvid(this)">
            <div class="video">
                <video src="${snapshot.val().video} id="${snapshot.key}" onmouseover="hover(this);" onmouseout="hoverout($)" >
            </div>
           <div class="v-details">
                <h2 id="v-details">${snapshot.val().title}</h2>
                <h3 id="v-details">${snapshot.val().username}</h3>
            </div>
          </div>`
          })
          _x++;
        }

      }

})
//-----Get Video Data------------//
function firebaseGetData(val){
  firebase.database().ref("video/"+val).once('value').then(function (snapshot) {
    var url = snapshot.val().video;
  get('#video-element').src = url;
  get("#vid_title").textContent = snapshot.val().title;
  get("#title").textContent = snapshot.val().title;
  get("#like_count").textContent = snapshot.val().likes;
  get("#views").textContent = snapshot.val().view+"view";
  get("#username").textContent = snapshot.val().username;
  get("#avatar").src = snapshot.val().profile;
  get("#tab_icon").href = snapshot.val().profile;
  get('#date').innerHTML = convertTime(snapshot.val().time);
  get('#des').innerHTML = snapshot.val().des;
  viewCount( snapshot.val().VideoMillisec,  snapshot.val().view, snapshot.val().key)
  likedList(snapshot.val().key)
  });
}
//------User Click on Comment heading to Toggle------//
DomEvent('#click_Comment','click',function(){
  get('.comment_box').classList.toggle("block");
})
//--------User write a comment on post---------//
DomEvent('#comment_send','click',function(){
  if(islogin){
    if(!(getvalue('#comment')==="")){
    var t = getTimeinMilli();
    var newPostKey = firebase.database().ref().child('commentDB').push().key;
firebase.database().ref('commentDB/'+key+"/"+newPostKey).set({
   'msg': getvalue('#comment'),
     'key':newPostKey,
     'uid': fuserid,
     'time':t,
     'profile':Profile,
     'name':Username

})
get('#comment').value = "";}
  }else{a("You need to Login Before Commenting")}
})
//--------Login Side bar click----------//
DomEvent('#login','click',function()
{
  if(islogin){
     a('Already Logged in');
  }else{
    window.location.href = '/Video-Point/Account/signup.html';
  }
})

//-----Load Comment-----------//
function loadComment(post){
  var item = get('.comment_box');
  item.innerHTML += "";
  firebase.database().ref('commentDB/'+post).on('child_added',function(snapshot){
    c("comment load Running"+key);
  item.innerHTML += ` <div class="video_recieved_comment">
  <div class="comment_logo">
    <img src="${snapshot.val().profile}" alt="not found" width="40px" height="40px" >
  </div>
  <div class="comment_details">
    <div class="commenter">
      <h5>${snapshot.val().name} </h5>
      <p>${convertTime(snapshot.val().time)}</p>
    </div>
    <div class="message">
      <p>${snapshot.val().msg}</p>
    </div>
  </div>
 </div>`
  
  })
}
loadComment(key);


//------User Report a video--------//
DomEvent('#report','click',function () {
  var r = prompt("Please Enter a Reason of Report");

if (r != null) {
  firebase.database().ref('reports').push().set({
    "id":key,
    'reason':r
  })

  a("Reported")
}
})
//------User add video to watch Later------//
DomEvent('#watchLater','click',function () {
  if(islogin){
    var newPostKey = firebase.database().ref().child('video').push().key;
    firebase.database().ref('watchLater/'+fuserid+"/"+newPostKey).set({
      "key":newPostKey,
      'vid_key':key
    })

    a("added")
  }else{a("You need To Login First")}
})

//-------Desxcription------Toggle------//
DomEvent('#Description','click',function () {
   toggle('#des')

})
function hover($) {
  c("hover on video")
  var id;
  id = $.getAttribute('id');
  var tvideo = document.getElementById(id);
  c(tvideo);
  tvideo.play();
}
function hoverout($) {
  c("hoverout ")
  var id;
  id = $.getAttribute('id');
  var tvideo = document.getElementById(id);
  tvideo.pause();
}
//-----Click Home -----------//
DomEvent('#home', 'click',function(){
  window.location.replace('../index.html')
})