
import PassPage from "./otp.js";
import { otpPage, loginPage } from "./otp.js";

// Checking login ?
let log_status = localStorage.getItem("logged") || "";

// logout

let user = [];
let url = `https://specialized.onrender.com/users` || "";

getdata(url);
async function getdata(url) {
  try {
    let res = await fetch(url);
    user = await res.json();
    document.getElementById("login_btn").addEventListener("click", function () {
      verify(user);
    });
  } catch (error) {
    console.log(error);
  }
}


// ____________Login work from her________

// Registraion/Login


function verify(user) {
  document.getElementById("box").style.display = "block";
console.log(user);
  // OTP & PASSWORD Generate
  let Otp = "",
    password = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUYWXYZ0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&";
  for (let i = 0; i < 4; i++) Otp += Math.floor(Math.random() * 10);
  for (let i = 0; i < 6; i++)
    password += str.charAt(Math.floor(Math.random() * str.length));
  console.log(Otp, password);

  let input = document.getElementById("ph_number").value;
  let size = input.length;
  let wrong_cred = document.querySelector("#ph_number+span");
// console.log(object);
  let obj = {
    firstName: "",
    lastName: "",
    Gender: "",
    DOB: "",
    ph: "",
    mail: "",
    Password: "",
    login_status: false,
    address: [],
    cart: [],
    wishList: [],
  };
  let c = 0;
  if (input.includes("@gmail.com") || Number.parseInt(input)&&input.length>9) {
    // check existing customer
    user.filter(function (ele) {
      if (ele.mail == input || ele.ph == input) {
        document.getElementById("box").innerHTML = PassPage();
        document.getElementById("box").style.display = "block";
        document.getElementById("mail").innerText = input;
        c++;
        return;
      }
    });
  }else if(input.length<9){
       document.querySelector("#ph_number+span").style.display="flex"
       return;
  }



  //    New User's
  if (c == 0) {
    if (input.includes("@gmail.com")) {
      console.log("email... :" ,Otp);
      document.getElementById("box").innerHTML = PassPage();
      document.getElementById("box").style.display = "block";
      document.getElementById("mail").innerText = input;
      document.getElementById("OTP").innerText = input;
      document.querySelector("#mail_sent").style.display = "block";
      //  email for new user
      Email.send({
        SecureToken: "dc989647-f40e-45dc-b708-b7b85e1361bf",
        Host: "smtp.elasticemail.com",
        Username: "vkvinu.com@gmail.com",
        Password: "ACC273AEBA34E7CF3972E72EE92CDF34107D",
        To: `${input}`,
        From: "vkvinu.com@gmail.com",
        Subject: "Hola! Welcome to specialized!",

        Body: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
            </head>
            <body>
           
              <p>Hello,</p>
              <p><span> We're thrilled you liked our collection!</span></p>
              <p><span>To make your future shopping experience super quick and easy, we created a specialized account for you.</span></p>
              <p>EMAIL ID: *${input}*</p>
              <p>PASSWORD: *${password}*</p>
              <p>This password is auto generated and can be changed by going onto your profile.</p>
            </body>
            </html>`,
      }).then((message) => {
        console.log(message);
        if (message == "OK") {
          obj.mail = input;
          obj.Password = password;

          // post new user
          user.push(obj);
          postdata(obj);
          localStorage.setItem("user-list", JSON.stringify(user));
          localStorage.setItem("login", input);

          // window.location.href="index.html-----------"
        } else {
          alert(message);
        }
      }).catch((err)=>{
        alert(err)
     return;
      });
    } else if (Number.parseInt(input)) {
      if (size != 10) {
        wrong_cred.style.display = "block";
      } else {
        obj.ph = input;
        obj.Password = password;
        obj.login_status =true
        user.push(obj);
      }
      //   post data {number}
      postdata(obj);
     

      localStorage.setItem("user-list", JSON.stringify(user));
      localStorage.setItem("login", input);
      wrong_cred.style.display = "none";
      document.getElementById("box").innerHTML = otpPage();
      document.getElementById("box").style.display = "block";
      document.getElementById("mail").textContent = `+91 ${input}`;
      alert(`Your OTP is: - ${Otp}`);
      wrong_cred.style.display = "none";
    }else{
      alert("wrong creditional..!")
    }
  } else {
    wrong_cred.style.display = "block";
  }

  // password verify or OTP verify
  let login_btn = document.getElementById("login_btn") || document.getElementById("OTP_btn");
  login_btn.addEventListener("click", passValidation);
  console.log(Otp);

  function passValidation() {
    // password
    // console.log();
    let wrong_pass = document.querySelector("#OTP+span");
    let enterd_pass = document.getElementById("OTP").value;
    let flag = false;
    console.log(user,"passvalid....");

    user.map(function (ele) {
      if ( (ele.mail == input && ele.Password == enterd_pass) || (ele.ph == input && ele.Password == enterd_pass) ) {
        console.log("succfull login...", ele.Password, enterd_pass);
        flag = true;
        let id = ele.id || user.length;
        localStorage.setItem("logged", `${id}`);
        console.log(id);
        postdata();
        async function postdata() {
          try {
            let res = await fetch(
              `https://specialized.onrender.com/users/${id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  login_status: true,
                }),
              }
            );
            window.location.href="index.html"
          } catch (error) {
            console.log(error);
          }
        }
       
        return;
      }
    });

    if (!flag) {
      wrong_pass.style.display = "block";
      console.log("invalid Password");
    }

    //otp verify
    if (Otp == enterd_pass) {
      wrong_pass.style.display = "none";
      alert(`Your Temporary password :- ${password}`);
      localStorage.setItem("logged", user.length);
      window.location.href="index.html"
    }
  }
}

if (!log_status) {
  // close
  document.getElementById("login_skip").addEventListener("click", closePopup);
  document.getElementById("close").addEventListener("click", closePopup);

  function closePopup() {
    document.getElementById("box").style.display = "none";
    document.querySelector("#ph_number+span").style.display = "none";
  }


  // show
  document.querySelector(".profile").addEventListener("click",showPopup);
  function showPopup() {
    document.querySelector("#ph_number+span").style.display = "none";
    document.getElementById("box").style.display = "block";
  }
}else{
  document.querySelector(".profile").addEventListener("click",foo);

  function foo(){
    let pop = document.getElementById("notification_pop")
    pop.setAttribute("id","notification")
    // alert(`already logeed`)
  }
}


async function postdata(obj) {
  try {
    let res = await fetch(
      `https://specialized.onrender.com/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );
  } catch (error) {
    console.log(error);
  }
}




// card____-slider

