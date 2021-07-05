var profile =  get('#profile-image');
var profile2 =  get('#profile2');
var admin_name = get('#admin_name');
var email = get('#admin_email');


firebase.database().ref("users/Altru4IFwuh0I7R0uXL8ri9yBHw2").once('value').then(function (snapshot) {
    profile.src = snapshot.val().profile;
    profile2.src = snapshot.val().profile;
	admin_name.textContent = snapshot.val().name;
	email.textContent = snapshot.val().email;
});