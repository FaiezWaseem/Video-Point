const container = document.querySelector('.Recomendation_Container');

firebase.database().ref("video/all").on("child_added", function(snapshot){
  
    const drive = "https://drive.google.com/thumbnail?id="
    const url = drive +snapshot.val().thumbnail;
    let new_url = snapshot.val().gif;
    new_url = new_url.replace('https://drive.google.com/uc?export=download&id=',drive) 
    container.innerHTML += `  <div class="box ${snapshot.key}" data-id="${snapshot.key}" onclick="clickvid(this)">
    <div class="video">
        <video src="" poster="${url}" id="${snapshot.key}" preview="${new_url}" onmouseover="vidMouseOver(this);" onmouseout="vidMouseOut(this)">
    </div>
   <div class="v-details">
        <h2 id="${snapshot.key}" data-id="${snapshot.key}">${snapshot.val().title}</h2>
        <h3 id="v-details">${snapshot.val().username}</h3>
        <h5 id="v-details">${snapshot.val().view} views</h5>
    </div>
  </div>`
})



//----Search Among Videos
let search = document.getElementById('srh')
search.addEventListener('keyup',function(){
  let h5 = document.querySelectorAll('.v-details h2');
  h5.forEach((h)=>{
    const searchvalue = search.value.toLowerCase()
    const text = h.innerText.toLowerCase();
    if(searchvalue == ""){
      const id = h.getAttribute("data-id")
      document.querySelector(`.${id}`).style.display = 'flex';
    }else{
    if(text.includes(searchvalue)){
      const id = h.getAttribute("data-id")
      document.querySelector(`.${id}`).style.display = 'flex';
    }else{
        const id = h.getAttribute("data-id")
    document.querySelector(`.${id}`).style.display = 'none';
  }
}
})

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