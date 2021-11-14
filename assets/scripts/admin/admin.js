
function  getVideoData() {
    var ul = get('#Allvideo');
    firebase.database().ref('video/all/').on('child_added',function (snapshot) {

 var table = document.getElementById("Allvideo");        let row = table.insertRow(0);
let cell1 = row.insertCell(0);
let cell2 = row.insertCell(1);
let cell3 = row.insertCell(2);
let cell4 = row.insertCell(3);
let cell5 = row.insertCell(4);
let cell6 = row.insertCell(5);
let cell7 = row.insertCell(6);
let cell8 = row.insertCell(7);

cell1.innerHTML = `<td class="cell" id="category">${snapshot.val().type}</td>`
cell2.innerHTML = `<td class="cell" id="title"><span class="truncate">${snapshot.val().title}</span></td>`;
cell3.innerHTML =  `<td class="cell" id="username">${snapshot.val().username}</td>`;
cell4.innerHTML = `<td class="cell" id="date"><span>${cTime(snapshot.val().time)}</span></td>`;
cell5.innerHTML = ` <td class="cell" id="status"><span class="badge bg-success">live</span></td>`;
cell6.innerHTML = ` <td class="cell" id="view">${snapshot.val().view}</td>`;
cell7.innerHTML = ` <td class="cell" id="link"><a class="btn-sm app-btn-secondary" href="/Video-Point/video view/video.html?page=${snapshot.key}">View</a></td>`;
cell8.innerHTML = ` <td class="cell" id="link"><a class="btn-sm app-btn-secondary" href="#" onclick="DeleteVideo('${snapshot.key}','${snapshot.val().type}','${snapshot.val().uid}')">Delete</a></td>`;
    })
}
getVideoData();



function UserReport(){
    firebase.database().ref('reports').on('child_added',function (snapshot) {
        var keey = snapshot.val().id;
        var reason = snapshot.val().reason
        firebase.database().ref("video/all/"+keey).once('value').then(function (snapshot) {
            var ul = get('#Users_report');
            let row = ul.insertRow(0);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            let cell6 = row.insertCell(5);
            let cell7 = row.insertCell(6);
            
            cell1.innerHTML = `<td class="cell" id="category">${snapshot.val().type}</td>`
            cell2.innerHTML = `<td class="cell" id="title"><span class="truncate">${snapshot.val().title}</span></td>`;
            cell3.innerHTML =  `<td class="cell" id="username">${snapshot.val().username}</td>`;
            cell4.innerHTML = `<td class="cell" id="date"><span>${cTime(snapshot.val().time)}</span></td>`;
            cell5.innerHTML = ` <td class="cell" id="status"><span class="badge bg-success">live</span></td>`;
            cell6.innerHTML = ` <td class="cell" id="view">${reason}</td>`;
            cell7.innerHTML = ` <td class="cell" id="link"><a class="btn-sm app-btn-secondary" href="/Video-Point/video view/video.html?page=${snapshot.key}">View</a></td>`;
             
        })
    
    })
}

function cTime(time){  
    const d = new Date(time);
   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",                        "November", "December"];
    const output = d.getDate() + '/'+months[d.getMonth()] +'/'+ d.getFullYear()
     return output;
      }

function DeleteVideo(key,type,uid){
    console.log(key,type)
    try {
        firebase.database().ref('video/all').child(key).remove();
        firebase.database().ref('video/'+type).child(key).remove();
        firebase.database().ref('Userposts/'+uid).child(key).remove();
        window.setTimeout(function(){alert('Video Removed Please Refresh the page to see changes')},1500)
    } catch (error) {
        console.log(error)
    }
}      
UserReport()