var url = new URL(window.location.href);
var key = url.searchParams.get("page");
function firebaseGetData(val){
    firebase.database().ref("video/"+val).once('value').then(function (snapshot) {
      var url = snapshot.val().video;
      var id_here = url.replace('https://drive.google.com/uc?export=download&id=',"")
      id_here = id_here.replace(/\s/g, '')
      const video_link = `https://www.googleapis.com/drive/v3/files/${id_here}?alt=media&key=AIzaSyCNRerZNkFQS4NMgupkvqpuvq-wdTQWm9E`
    document.getElementById('video').src = video_link;
    document.getElementById('video').poster = 'https://drive.google.com/thumbnail?id='+id_here; 
    });
  }
  firebaseGetData(key);