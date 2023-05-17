
const id=1;




const getdata= async () => {
    let url=`https://specializedcycle.onrender.com/products/?id=${id}`;
    //let url =`https://ballalamit.github.io/tata1mgjsonserver/db.json?id=${id}`;
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
        image.src = elem.image;
        
        let image1= document.createElement("img");
        image1.src = elem.image;
        image1.classList.add('active');

        let image2 = document.createElement("img");
        image2.src = elem.image2;
        //document.getElementById("smallimages").append(image2);

        let image3 = document.createElement("img");
        image3.src = elem.image3;
        //document.getElementById("smallimages").append(image3);

        let image4 = document.createElement("img");
        image4.src = elem.image4;

        let image5 = document.createElement("img");
        image5.src = elem.image5;

        let image6 = document.createElement("img");
        image6.src = elem.image6;

        document.getElementById("smallimages").append(image1,image2,image3, image4, image5);
       
        document.getElementById("mainimage").append(image);

        //right div code

        let name = document.createElement("h2");
        name.innerText= elem.name;

        let starDiv = document.createElement("div");
        starDiv.innerHTML = '<span class="star-icon filled">★</span>' +
        '<span class="star-icon filled">★</span>' +
        '<span class="star-icon filled">★</span>' +
        '<span class="star-icon filled">★</span>' +
        '<span class="star-icon">★</span>' +
        '<span class="reviews-text"> 4.9</span>';

        let colorandsizediv = document.createElement("div");
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
        var xsBox = document.createElement("div");
        xsBox.textContent = "XS";
        xsBox.classList.add("xsmall-box");
    
        var sBox = document.createElement("div");
        sBox.textContent = "S";
        sBox.classList.add("small-box");
    
        var mBox = document.createElement("div");
        mBox.textContent = "M";
        mBox.classList.add("M-box");

        sizediv.append(xsBox, sBox, mBox)

        colordiv.append(colortext, brownButton, blackButton);
        colorandsizediv.append(colordiv, sizediv)

        document.getElementById("innerrightdiv").append(name, starDiv, colorandsizediv)

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