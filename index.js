
document.addEventListener("DOMContentLoaded",(e)=>{
    console.log('DOM fully loaded and parsed')

})

function getRandom(min,max){
    return Math.round(Math.random() *(max-min) + min);
}
//send an email containing clients details//
function sendEmail (){
    Email.send({
        Host:"smtp.elasticemail.com",
        Username:"francisca.orwa@student.moringaschool.com",
        Password:"29803F21E7091103198AF8C956EBB1054750",
        To:"francisca.orwa@student.moringaschool.com",
        From :document.getElementById("email").value,
        Subject : "New Contact Form Enquiry",
        Body: "Name: " + document.getElementById("name").value
              + "<br> Email: " + document.getElementById("email").value
              + "<br> Phone no: " + document.getElementById("phone").value
              + "<br> Date: " + document.getElementById("date").value
              + "<br> Time: " + document.getElementById("time").value
              + "<br> Message: " + document.getElementById("message").value

    }).then(
        function(message) {
            console.log(message);
           return alert("Appointment Booked Successfully")
        }
        

    );
    
}
//post new data to db.json//
function send(){
fetch("http://localhost:3000/bookings",{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    },
    body:JSON.stringify({
        id:getRandom(1,1000),
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        phone:document.getElementById("phone").value,
        date:document.getElementById("date").value,
        time:document.getElementById("time").value,
        message:document.getElementById("message").value,
    }),
}).then((res)=>res.json())
  .then(function(data){
    console.log(data)
  })
}
let formEl =document.getElementById("form")

 
formEl.addEventListener('submit',function(e){
    e.preventDefault();
   send();
    sendEmail (); formEl.reset (); return false;
})

function viewBooking(e){
    e.preventDefault();
    getBookings();
}

function getBookings(){
    fetch('http://localhost:3000/bookings?email='+document.getElementById('view').value)
    .then((res)=>res.json())
    .then((data)=>{
        let form="";
        data.forEach(function(bookings){
            form +=`
            <div>
            <p> ${bookings.name}</p>
            <p> ${bookings.email}</p>
            <p> ${bookings.phone}</p>
            <p> ${bookings.date}</p>
            <p> ${bookings.time}</p>
            <p> ${bookings.message}</p>
            <p><button type="button" onclick="deleteBooking(${bookings.id})">Delete</button></p>
            </div>
            `    
            document.querySelector("#display").innerHTML=form

        })
    })

}  

function deleteBooking(id){
    fetch(`http://localhost:3000/bookings/${id}`,{
        method:'DELETE',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        }
    }).then((res)=>res.json())
        .then((data)=>console.log(data))
        reset(' ')
}