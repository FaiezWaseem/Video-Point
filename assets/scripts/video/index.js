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
  document.getElementById('btnFullScreen').disabled = true;
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
	
	player.addEventListener('volumechange', function(e) { 
		// Update the button to be mute/unmute
		if (player.muted) changeButtonType(btnMute, 'unmute');
		else changeButtonType(btnMute, 'mute');
	}, false);	
  
	player.addEventListener('ended', function() { this.pause(); }, false);	
  
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
  
  // Update the progress bar
  function updateProgressBar() {
  	// Work out how much of the media has played via the duration and currentTime parameters
  	var percentage = Math.floor((100 / player.duration) * player.currentTime);
  	// Update the progress bar's value
  	progressBar.value = percentage;
  	// Update the progress bar's text (for browsers that don't support the progress element)
  	progressBar.innerHTML = percentage + '% played';
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

  function sharelink(){
    var url2 = new URL(window.location.href);
    copytext(url2);
  }

// --------Getting Url Parameeters
  var url = new URL(window.location.href);
  var c2 = url.searchParams.get("page");
if(c2 === ""){

}else{
  key = c2;
}

//-------------------------------------------------------------------------------

firebaseGetData(key);

firebase.database().ref('video').limitToLast(7).on('child_added',function(snapshot){
  let ul = get('.item2');
  ul.innerHTML += `             <div class="box" data-id="${snapshot.key}" onclick="clickvid(this)">
  <div class="video">
      <video src="${snapshot.val().video}" >
  </div>
 <div class="v-details">
      <h2 id="v-details">${snapshot.val().title}</h2>
      <h3 id="v-details">${snapshot.val().username}</h3>
  </div>
</div>`
})

function clickvid(key){
  id = key.getAttribute('data-id')
  firebaseGetData(id);
}

DomEvent('#font_like', 'click', function(){
 if(islogin){
   if(myliked){myliked = false;CheckUnLiked()}else{ myliked = true;CheckLiked()}
 
 }else{
   a('Please Login To Use this Service')
 }
})


// ---------Like Logic-----------//
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
//Clicked Liked
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
//Clicked Unliked
function CheckUnLiked(){
  var like_id = document.getElementById("like_count");
  var likes= like_id.innerText--;
  
 
 firebase.database().ref('video/'+key).update({
  "likes" : --likes,
 })
 firebase.database().ref('video/'+key+'/liked/').child(fuserid).remove();
 document.getElementById('font_like').textContent="favorite_border";
 
}

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
                <video src="${snapshot.val().video}" >
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
  viewCount( snapshot.val().VideoMillisec,  snapshot.val().view, snapshot.val().key)
  likedList(snapshot.val().key)
  });
}

DomEvent('#click_Comment','click',function(){
  get('.comment_box').classList.toggle("block");
})
DomEvent('#comment_send','click',function(){
  if(islogin){
    var t = getTimeinMilli();
    var newPostKey = firebase.database().ref().child('commentDB').push().key;
firebase.database().ref('commentDB/'+newPostKey).set({
   'msg': getvalue('#comment'),
     'key':newPostKey,
     'uid': fuserid,
     'time':t,
     'profile':Profile,
     'name':Username

})
  }else{a("You need to Login Before Commenting")}
})