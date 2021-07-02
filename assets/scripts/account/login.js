var email , pass;
const auth = firebase.auth();

function getvalue(){
    email = document.getElementById('signin-email ').value;
    pass= document.getElementById('signin-password').value;
}
function login(){
    email = document.getElementById('signin-email').value;
    pass= document.getElementById('signin-password').value;
    c(email,"\n",pass)

    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch(e => alert(e.message));
    return false;
}
auth.onAuthStateChanged(function(user){
		
    if(user){
  
        var email = user.email;
       var  userid = user.uid;
                localStorage.setItem("uid",userid);
                localStorage.setItem("mail",email);    
                a("Login Succedfully")
                window.location.replace('../index.html')
    }else{
        console.log("No Active User");
        //no user is signed in
    }
    
  });
// outSign();
  function outSign(){
		
    auth.signOut();
    c("Signed Out");
    
}