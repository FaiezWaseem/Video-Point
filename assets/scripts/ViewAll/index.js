const container = document.querySelector('.Recomendation_Container');

firebase.database().ref("video/all").on("child_added", function(snapshot){
  
    const drive = "https://drive.google.com/thumbnail?id="
    const url = drive +snapshot.val().thumbnail;
    let new_url = snapshot.val().gif;
    new_url = new_url.replace('https://drive.google.com/uc?export=download&id=',drive) 
    container.innerHTML += `  <div class="box" data-id="${snapshot.key}" onclick="clickvid(this)">
    <div class="video">
        <video src="" poster="${url}" id="${snapshot.key}" preview="${new_url}" onmouseover="vidMouseOver(this);" onmouseout="vidMouseOut(this)">
    </div>
   <div class="v-details">
        <h2 id="v-details">${snapshot.val().title}</h2>
        <h3 id="v-details">${snapshot.val().username}</h3>
        <h5 id="v-details">${snapshot.val().view} views</h5>
    </div>
  </div>`
})




//----------------
// video OnMouse Hover 
function vidMouseOver($){
    let preview = $.getAttribute('preview')
    const  src = $.getAttribute('poster')
    preview = preview.replace(/\s/g, '');
   $.poster = preview
   $.setAttribute('preview',src);
   
   }
   // video OnMouse Hover 
   function vidMouseOut($){
    let preview = $.getAttribute('preview')
    const  src = $.getAttribute('poster')
    preview = preview.replace(/\s/g, '');
    $.poster = preview
   $.setAttribute('preview',src);
   console.log('Mouse Out \n'+$)
   }
   function clickvid(key2){
    var id = key2.getAttribute("data-id");
    window.location.href = '../video view/video.html?page='+id;
  }