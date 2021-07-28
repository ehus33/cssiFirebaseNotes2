let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const username = document.querySelector('#username')
  const noteText = document.querySelector('#noteText');
  // 2. Format the data and write it to our database
  if(noteText != "" && username != "" && noteText != "") {
    console.log("requirements met");
    firebase.database().ref(`users/${googleUser.uid}`).push({
        title: noteTitle.value,
        text: noteText.value,
        username: username.value
    })

  // 3. Clear the form so that we can write a new note
    .then(() => {
        username.value = "";
        noteTitle.value = "";
        noteText.value = "";
    });
  }
}
