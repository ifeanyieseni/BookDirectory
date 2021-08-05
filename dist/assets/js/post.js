// Redirect to a new page
function newDoc() {
    let searchData = document.getElementById('search').value
    window.location ="books.html?search="+searchData
  }


 

//   Api Fetch 
const baseUrl ='https://secret-woodland-98197.herokuapp.com/';

async function postData(url = '', data = {}) {
        
    const response = await fetch(url, {
        method: 'POST', 
        cache: 'no-cache',  
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json(); 
}



// Register 
function register(){
    let firstName = document.getElementById('firstname').value;
    let lastName = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let gender = document.getElementById('gender').value;

    let userData = {
        firstName,
        lastName,
        email,
        password,
    }

    postData(baseUrl+'users', userData)
    .then(data => {
        console.log(data);
        if (data.success) {
            const fullName = `${data.responseMessage.firstName} ${data.responseMessage.lastName}`
            const token = `${data.token}`;

            const userData = {
                fullName, token
            };
        
            localStorage.setItem("userData", JSON.stringify(userData));
            window.location = "dash.html";
        }else{
            let error = data.responseMessage;
            document.getElementById('errorDiv').innerHTML = error
        }
        

        // console.log(localStorage.getItem( data.responseMessage.firstName))
    });
   

}



// Login 
function login(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let userData = {
        email,
        password
    }


    postData(baseUrl+'users/login', userData)
    .then(data => {
        console.log(data);
        if (data.success) {
            const fullName = `${data.responseMessage.firstName} ${data.responseMessage.lastName}`
            const token = `${data.token}`;

            const userData = {
                fullName, token
            };
        
            localStorage.setItem("userData", JSON.stringify(userData));
            window.location = "dash.html";
        }else{
           console.log(error)
        }
    
    });

}








