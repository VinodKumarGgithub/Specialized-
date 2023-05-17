localStorage.setItem("CardNumber", "111111111111");
localStorage.setItem("CVV", "123");
// localStorage.setItem("MobileNum","9999999999");

document.querySelector('form').addEventListener("submit", carddata);

function carddata() {
  event.preventDefault();
  
  let FullName = document.getElementById("name").value;
  let Email = document.getElementById('email').value;
  let address = document.getElementById('address').value;
  let city = document.getElementById('city').value;
  let state = document.getElementById('state').value;
  let zip = document.getElementById('zip').value;
  let cardName = document.getElementById('cardName').value;
  let cardNum = document.getElementById('cardNum').value;
  let expMon = document.getElementById('expMon').value;
  let expYr = document.getElementById("expYr").value;
  let cvv = document.getElementById("cvv").value;

//   if (!name || !date || !cvv || !cardNum || !mobile) {
//     alert("Fill all the details");
//     return;
//   }

  var cdNumber = localStorage.getItem("CardNumber");
  var cv = localStorage.getItem("CVV");
//   var mob = localStorage.getItem("MobileNum");

  if (cdNumber === cardNum && cv === cvv) {

    localStorage.setItem("PaymentDetails", JSON.stringify({FullName, Email, address, city,state, zip, cardName, cardNum, expMon, expYr, cvv}));


    var btn = document.getElementById("btn");
    btn.setAttribute("onclick", "window.location.href = 'otp.html'");
  } else {
    alert("Not getting account details. Try this: CardNo.111111111111, CVV.123");
  }
}

