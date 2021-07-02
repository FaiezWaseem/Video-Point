var Username , email , pass , uid;
const auth = firebase.auth();

function getValue(){
Username = getvalue('#signup-name');
email = getvalue('#signup-email')
pass= getvalue('#signup-password');
}
function signup(){
    getValue()
if(Username === "" || email === "" || pass === ""){
    alert("Fill out all field");
 }else{
     const promise = auth.createUserWithEmailAndPassword(email, pass).then(function(){

         uid = firebase.auth().currentUser.uid;
         console.log(uid);
         
         info();
         alert("Account Created");
     
     
    }).catch(function(error){
        alert(error);
    });   
    
get('#signup-name').value = "";
get('#signup-email').value = "";
 get('#signup-password').value = "";
     // prevent form from submitting
     
    }
    // info();
    return false;
}
function info(){
    firebase.database().ref('users/'+uid).set({
      "name": Username,
      "email": email,
      "pass": pass,
      "uid": uid


    });

}