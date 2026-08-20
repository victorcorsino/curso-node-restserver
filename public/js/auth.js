//function decodeJWT(token) {
//    let base64Url = token.split(".")[1];
//    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//    let jsonPayload = decodeURIComponent(
//    atob(base64)
//        .split("")
//        .map(function (c) {
//        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//        })
//        .join("")
//    );
//    return JSON.parse(jsonPayload);
//}

const miFormulario = document.querySelector('form');

miFormulario.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = {};

    for (let el of miFormulario.elements) {
        if (el.name.length > 0) {
            formData[el.name] = el.value
        }
    }

    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(({msg, token}) => {
        if (msg) {
            return console.log(msg);
        }

        localStorage.setItem('token', token);
        window.location = 'chat.html';
    })
    .catch(err => {
        console.log(err)
    })
})


function handleCredentialResponse(response) {
    //console.log("Encoded JWT ID token: " + response.credential);

    //const responsePayload = decodeJWT(response.credential);

    //console.log("Decoded JWT ID token fields:");
    //console.log("  Full Name: " + responsePayload.name);
    //console.log("  Given Name: " + responsePayload.given_name);
    //console.log("  Family Name: " + responsePayload.family_name);
    //console.log("  Unique ID: " + responsePayload.sub);
    //console.log("  Profile image URL: " + responsePayload.picture);
    //console.log("  Email: " + responsePayload.email);


    const body = { id_token: response.credential };

    fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })            .then(resp => resp.json())
        .then(({ token }) => {
            console.log(token);
            localStorage.setItem('token', token);
            window.location = 'chat.html';
        })
        .catch(console.warn);
}

const button = document.getElementById('google_signout');
button.onclick = () => {

    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload();
    });
}