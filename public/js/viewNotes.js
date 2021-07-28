let googleUser;
window.onload = (e) => {
    firebase.auth().onAuthStateChanged(function(user) {
        if(user) {
            console.log('Logged in as: ' + user.displayName);
            googleUser = user;
            console.log(user);
            getNotes(user.uid);
        } else {
            window.location = 'index.html'
        }
    });

};
function deleteNotes(cards) {
    for(const i = 0; i < cards.length;i++) {
        ref.child(i).remove();
    }
}

function getNotes(userID) {
    console.log("getting notes for", userID);
    const notesRef = firebase.database().ref(`users/${userID}`);
    notesRef.on('value',(db) => {
        const data = db.val();
        renderData(data);
    });
}

function renderData(data) {
    console.log(data);
    let html = '';
    for (const dataID in data) {
        const note = data[dataID];
        console.log(note);
        renderCard(note);
        const cardHtml = renderCard(note);
        html +=cardHtml
        // get card html
        
        // add card html to html variable
        
    }
    document.querySelector('#app').innerHTML = html;
    // add html to page
}

function renderCard(note) {
    // convert a note to html and return it
    /*const div = document.createElement('div');
    div.classList.add('column', 'is-one-quarter')

    div.appendChild(card);*/    
    const html = `
        <div class="column is-one-quarter">
            <div class="card">
                <header class="card-header">
                    <span class="card-header-title">Title: ${ note.title }</span>
                </header>
                <div class = "card-content">
                    <div class ="content">
                        Username: ${ note.username}
                    </div>
                </div>
                <div class="card-content">
                    <div class="content">Text: ${ note.text }</div>
                </div>
            </div>
        </div>
    `;

    return html;
}
const setBg = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
    color.innerHTML = "#" + randomColor;
    document.querySelector(innerHTML);  
}
