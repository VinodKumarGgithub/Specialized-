
const id= localStorage.getItem("item") || 1;
let cart = JSON.parse(localStorage.getItem("cart-list")) || []



const getdata= async () => {
    let url=`https://specialized.onrender.com/products?id=${id}`;
    
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    displayproduct(data);
    smallimagesdisplay();
}
getdata();

function displayproduct(data){
    document.getElementById("mainimage").innerHTML=""
    data.map(elem =>{
        let image= document.createElement("img");
        image.src = elem.image.img1;
        
        let image1= document.createElement("img");
        image1.src = elem.image.img1;
        image1.classList.add('active');

        let image2 = document.createElement("img");
        image2.src = elem.image.img2;
        //document.getElementById("smallimages").append(image2);

        let image3 = document.createElement("img");
        image3.src = elem.image.img3;
        //document.getElementById("smallimages").append(image3);

        let image4 = document.createElement("img");
        image4.src = elem.image.img4;

        let image5 = document.createElement("img");
        image5.src = elem.image.img5;

        let image6 = document.createElement("img");
        image6.src = elem.image.img6;

        document.getElementById("smallimages").append(image1,image2,image3, image4, image5);
       
        document.getElementById("mainimage").append(image);

        //right div code

        let name = document.createElement("h2");
        name.innerText= elem.productdescriptionname;

        let starDiv = document.createElement("div");
        starDiv.innerHTML = '<span class="star-icon filled">★</span>' +
        '<span class="star-icon filled">★</span>' +
        '<span class="star-icon filled">★</span>' +
        '<span class="star-icon filled">★</span>' +
        '<span class="star-icon">★</span>' +
        '<span class="reviews-text"> 4.9</span>';

        let colorandsizediv = document.createElement("div");
        colorandsizediv.setAttribute('class', 'colorandsizediv');
        let colordiv= document.createElement("div");
        let colortext= document.createElement("p");
        colortext.textContent="Color";
        var brownButton = document.createElement("div");
        brownButton.classList.add("circle-button", "brown-button");
    
        // Create the black circle button
        var blackButton = document.createElement("div");
        blackButton.classList.add("circle-button", "black-button");


        //
        let sizediv = document.createElement("div")
        sizediv.setAttribute("class", "sizediv")

        sizetext= document.createElement("p")
        sizetext.textContent="Size";
        var xsBox = document.createElement("div");
        xsBox.textContent = "XS";
        xsBox.classList.add("xsmall-box");
    
        var sBox = document.createElement("div");
        sBox.textContent = "S";
        sBox.classList.add("small-box");
    
        var mBox = document.createElement("div");
        mBox.textContent = "M";
        mBox.classList.add("M-box");

        let sizeboxdiv= document.createElement("div");
        sizeboxdiv.setAttribute("class", "sizeboxdiv");
        sizeboxdiv.append(xsBox, sBox, mBox)
        sizediv.append(sizetext,sizeboxdiv)

        colordiv.append(colortext, brownButton, blackButton);
        colorandsizediv.append(colordiv, sizediv)

        //price code

        let mrp= document.createElement("h4");
        mrp.innerText="$" + elem.mrp;
        mrp.setAttribute("class", "mrp")
        mrp.style.textDecoration = "line-through";
        let price= document.createElement("h3");
        price.innerText= "$" + elem.price;
        price.setAttribute("class", "price")
        
        let pricediv= document.createElement("div");
        pricediv.append(mrp, price)

        let hr= document.createElement("hr");
        hr.setAttribute("class", "hr");
        let hr2= document.createElement("hr");
        hr2.setAttribute("class", "hr2");
        let addtocartandquickorderdiv= document.createElement("div");
        addtocartandquickorderdiv.setAttribute("class", "addtocartandquickorderdiv")
        let addtocartbtn= document.createElement("button");
        addtocartbtn.setAttribute("class","addtocartbtn");
        addtocartbtn.addEventListener("click", 
        function(){
            addtoCart(elem, addtocartbtn);
        } );
        addtocartbtn.textContent = "ADD TO CART";

        let quickorderbtn= document.createElement("button");
        quickorderbtn.setAttribute("class","quickorderbtn");
        quickorderbtn.textContent="QUICK ORDER"

        let wishlistbtn= document.createElement("button");
        wishlistbtn.setAttribute("class","wishlistbtn");
        wishlistbtn.addEventListener("click", 
        function(){
            
            addtoWishlist(elem);
        } );

        let heartIcon = document.createElement("i");
        heartIcon.setAttribute("class", "fas fa-heart");
        wishlistbtn.appendChild(heartIcon);

        addtocartandquickorderdiv.append(addtocartbtn,quickorderbtn, wishlistbtn);

        document.getElementById("innerrightdiv").append(name, starDiv, colorandsizediv,pricediv,hr,addtocartandquickorderdiv, hr2)

    })}

    function smallimagesdisplay(){
        let smallImages = document.querySelectorAll('#smallimages img');
        let mainImage = document.querySelector('#mainimage img');
    
        smallImages.forEach(smallImage => {
            smallImage.addEventListener('click', () => {
                console.log(smallImage)
            mainImage.src = smallImage.src;
        
            smallImages.forEach(img => img.classList.remove('active'));
            smallImage.classList.add('active');
            });
        });
    }

// const showMoreBtn = document.getElementById("showMoreBtn");
// const moreDivs = document.querySelectorAll(".more");

// showMoreBtn.addEventListener("click", function() {
//     moreDivs.forEach(function(div) {
//     div.classList.toggle("show");
//     });
// });


const readMoreLink = document.getElementById("readMoreLink");
const moreParagraph = document.querySelector("#description .more");

readMoreLink.addEventListener("click", function(event) {
  event.preventDefault();
  moreParagraph.classList.toggle("show");
  readMoreLink.textContent = moreParagraph.classList.contains("show") ? "- Read Less" : "+ Read More";
});


function addtoCart(elem,addtocartbtn){
    cart.push(elem)
    localStorage.setItem("cart-list",JSON.stringify(cart))
    addtocartbtn.textContent = "ADDING...";
    console.log(addtocartbtn.textContent)
    setTimeout(function() {
        addtocartbtn.textContent = "ADDED ✔";

        var popup = document.getElementById("order-summary-popup");
        popup.querySelector(".product-name").textContent = elem.productdescriptionname;


        // Show the popup
        popup.style.display = "flex";

        // Add an event listener to the "Proceed to Cart" button that will redirect to the cart page
        var proceedToCartBtn = document.getElementById("proceed-to-cart-btn");
        proceedToCartBtn.addEventListener("click", function() {
            window.location.href = "./order_page/order.html";
            console.log("hi...");
        });

        setTimeout(function() {
            addtocartbtn.textContent = "ADD TO CART";
            popup.style.display = "none";
        }, 3000);
    }, 2000);
}

let wishlistitem = JSON.parse(localStorage.getItem("wishlistitem")) || [];

function addtoWishlist(elem) {
  wishlistitem.push(elem);
  console.log(wishlistitem);
  localStorage.setItem("wishlistitem", JSON.stringify(wishlistitem));
}
function home(){
    location.href="index.html"
}