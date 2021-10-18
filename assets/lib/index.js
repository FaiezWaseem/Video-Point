/*
Copyright : FaiezWaseem
Github : https://github.com/faiezwaseem
Email: fazufaiez11@gmail.com
*/
/*-------------------------Playing With DOM-----------------------------*/
var $x = 0;
function a(message){alert(message);}
function c(message){console.log(message);}
function sumUP(n){return (n/2) * (1+ n);}
function get(element){return  document.querySelector(element);}
function getall(element){return document.querySelectorAll(element);}
function getvalue(element){return  get(element).value;}
function hide(element){;get(element).style.display = 'none'}
function show(element){get(element).style.display = 'flex'}
function DomEvent(element, type,  output) {get(element).addEventListener(type,output);}
function rand(val) {return Math.floor((Math.random() * val)+1)}
function toggle(val){
  if( get(val).style.display == 'block'){ 
    hide(val)
  }else if(get(val).style.display == 'none'){
  show(val) 
  }else{
    get(val).style.display = 'none';
  }

}
function toggle2(val){if( $x == 0 ){ get(val).style.display = 'block';  $x =1;}else{show(val); --$x;}}
function Attr(elem,val) { return get(elem).getAttribute(val);}
function interval($ , num){window.setInterval($,num);}
function timeout($,num) {return setTimeout($, num);}
/*---------------------------CSS----------------------------------*/
class Css{
    constructor(element){this.element = get(element);}
  bg(val){this.element.style.background= val;}
  color(val){this.element.style.color= val;}
 mg(val){this.element.style.margin= val+"px";}
 pd(val){this.element.style.padding= val+"px";}
  none(){this.element.style.display= 'none';}
 block(){this.element.style.display= 'block';}
 addClass(value){this.element.classList.add(value);}
removeClass(value){this.element.classList.remove(value);}
border( bcolor, val ){this.element.style.border=  val+"px solid "+bcolor ;}
cssProperty(prop,val){this.element.style+"."+prop+"="+val;}

}
/* ------------------------- EXtra --------------------------------*/
//get video Duration in min hour day sec
function videoDuration(duration){
    var _$hour = parseInt((duration) / 3600);
                    if (_$hour<10) { _$hour = "0" + _$hour;}
                    var _$minute = parseInt((duration % 3600) / 60);
                    if (_$minute<10) {_$minute = "0" + _$minute;}
                    var _$second = Math.ceil(duration % 60);
                    if (_$second<10) {_$second = "0" + _$second;}
                    var _$filetime = _$hour + ":" + _$minute + ":" + _$second;
                    return _$filetime;
}
//Get File Size
function FileSize(size) {
 var $_i = Math.floor( Math.log(size) / Math.log(1024) );
return ( size / Math.pow(1024, $_i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][$_i];
};
function WindowWidth() {return window.innerWidth}
function WindowHeight() {return window.innerHeight}
function  setFetch(url) {
  var result;
  fetch(url)
  .then(res => res.json )
  .then(data =>  { return data})
  .catch( error => {result = error ; c("ERROR2")})
  return result;
}

function ASBL(Arr) {
return Arr.sort((a, b) => b - a);
}
function ASBS(Arr) {
return Arr.sort((a, b) => a - b);
}
function copytext(text) {
  var input = document.createElement('textarea');
  input.innerHTML = text;
  document.body.appendChild(input);
  input.select();
  var resultCopy = document.execCommand("copy");
  document.body.removeChild(input);
  return resultCopy;
}
function startVideo(video){
  navigator.getUserMedia(
      { video:{}},
      stream => video.srcObject = stream,
      err  => c(err)
  )
}
function setfetch(elem){
  fetch(elem) .then(result => result.json()).then(data => { c(data.ip);return data});

}
const encrypt = (text) => {
  const passphrase = "faiez";
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

const decrypt = (ciphertext) => {
  const passphrase = "faiez";
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
function getTimeinMilli(){
  var d = new Date();
  return  d.getTime();
}

function convertTime(time){
  var date =  Math.abs(new Date(time).getTime()/1000).toFixed(0);
  var currentDate =  Math.abs(new Date().getTime()/1000).toFixed(0);
   var diff = currentDate - date;

   var day = Math.floor(diff/86400);
   var hour = Math.floor(diff/3600)% 24;
   var min = Math.floor(diff/60) % 60;
   var sec =  diff % 60;
  //  console.log(day+"Day "+hour+"Hour "+min+"min "+sec+"sec ");
   var output = day+"Day"+hour+"Hour "+min+"min  ago";
  //  convertTime(time);
    return output;
}
function viewCount(type , view , key){
    firebase.database().ref("video/all/"+key).update({
      "view":++view
    })
    firebase.database().ref(`video/${type}/`+key).update({
      "view":++view
    })
    firebase.database().ref("views/"+key).set({
      "view":++view,
      'key':key
    });
}

