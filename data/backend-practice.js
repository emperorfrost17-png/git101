//When you send a message to the backend this is called a Request because we are Requesting something from the backend

//When the backend receives our request it will send an HTTP message back to us and this is called a response

//The XMLHttpRequest object can be used to request data from a web server.
const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
//This is an asynchronous code

//that is why i created this event listener with 'load' because i need to wait for the response load before running the code

//This used to access the data returned by the backend server after an HTTP request has been completed
  console.log(xhr.response);
});
//.open() takes two paramters the First takes:
//'GET' or'POST', or 'PUT', or 'DELETE'
//for the second parameter it takes the url

//'GET' is for getting the information from the backend
//There is also 'POST', 'PUT', 'DELETE'
xhr.open("GET", "https://supersimplebackend.dev");
/*
After the request has been initialized and configured with .open(), calling .send() is the final step that physically sends the request across the internet to the specified URL
*/
xhr.send();

