const exeptedCharsForUsername = /^[a-zA-Z0-9@_-]*$/;
const exeptedCharsForPassword = /^[a-zA-Z0-9]*$/;
const exeptedCharsForEmail = /^[a-zA-Z0-9@._-]*$/;

const isUserValid = (user) => {
    if(!user.username.match(exeptedCharsForUsername)){return {error: 'Username can only contain letters and numbers'};}
    if(!user.email.match(exeptedCharsForEmail)){return {error: 'Email can only contain letters and numbers'};}
    if(!user.password.match(exeptedCharsForPassword)){return {error: 'Password can only contain letters and numbers'};}
    
    return true;
};