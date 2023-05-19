let obj=[
    {
       "name":"S-WORKS TURBO KENEVO SL",
       "img":"https://www.shutterstock.com/image-photo/yellow-black-29er-mountainbike-thick-260nw-1498702814.jpg",
       "id":7895647,
       "amt": 35000, 
       "fyamt": 15000, 

    },
    {
        "name":"S-WORKS TURBO KENEVO SL",
       "img":"https://www.shutterstock.com/image-photo/yellow-black-29er-mountainbike-thick-260nw-1498702814.jpg",
       "id":7895648,
       "amt": 20000, 
       "fyamt": 12000, 

    },        {
        "name":"S-WORKS TURBO KENEVO SL",
       "img":"https://www.shutterstock.com/image-photo/yellow-black-29er-mountainbike-thick-260nw-1498702814.jpg",
       "id":7895649,
       "amt": 15000, 
       "fyamt": 7000, 

    },        {
        "name":"S-WORKS TURBO KENEVO SL",
       "img":"https://www.shutterstock.com/image-photo/yellow-black-29er-mountainbike-thick-260nw-1498702814.jpg",
       "id":78956,
       "amt": 80000, 
       "fyamt": 60000, 

    }    
]

    localStorage.setItem("cart",JSON.stringify(obj));
    let sumMRP=0;
    let data= JSON.parse(localStorage.getItem("cart")) || []

    // data.push(obj);
    // console.log(data);

    let cartItem=document.querySelector("#cart");
    let sum=0;
function displayCart(data){
    document.querySelector("#cart").textContent="";
    
    data.map((ele,i)=>{
        
        let div=document.createElement("div");
        div.id="mainDiv";
        let divImg=document.createElement("div");
        divImg.id="imgDiv";
        let img=document.createElement("img");
        img.src=ele.img;
        let divDetails=document.createElement("div");
        divDetails.id="detail";
        let name=document.createElement("h5");
        name.textContent=ele.name
        let code=document.createElement("p");
        code.textContent=ele.id;
        let MRP=document.createElement("p");
        MRP.textContent="€ "+ele.amt +"/-";
        MRP.id="displayMRPCart";
        let amt=document.createElement("p");
        amt.textContent="€ "+ele.fyamt +"/-";
        amt.id="displayMRPfynl";

        let qty=document.createElement("div");
        
        let disc=document.createElement("button");
        disc.textContent="-";
        
        let qnty=document.createElement("input");
        qnty.value="1";
        let add=document.createElement("button");
        add.textContent="+";
        
        let divFinalAmt=document.createElement("div");
        let finamt=document.createElement("p");

          sum+=ele.fyamt; 
          sumMRP+=ele.amt
          console.log(sum);
        finamt.textContent="€ "+ ele.fyamt *qnty.value + "/-";
        // console.log(elem.amt);
        // sum+=finamt;0
        disc.addEventListener('click',function(){
            if(qnty.value==1){
                alert("Minimum Quantity could be 1")
            }else {
                qnty.value--;
                sum-=ele.fyamt 
                sumMRP-=ele.amt
                console.log(sum)
                finamt.textContent="€ "+ ele.fyamt *qnty.value + "/-";
                // final price
        document.getElementById("displayMRP").textContent= "€" + sumMRP +" /-";
        document.getElementById("finalAmt").textContent= "€" +sum +" /-";
            }
        }) 

        add.addEventListener('click',function(){
            qnty.value++;
            sum+=ele.fyamt 
            sumMRP+=ele.amt
            finamt.textContent="€ "+ ele.fyamt*qnty.value + "/-";   
            // final price
        document.getElementById("displayMRP").textContent= "€" + sumMRP +" /-";
        document.getElementById("finalAmt").textContent= "€" +sum +" /-";
        });



        let delet=document.createElement("div");
        let del=document.createElement("button");
        
        del.id="delcart";
        let delimg=document.createElement("img");
        delimg.src="delet.svg";
        delimg.id="dellogo";

        del.addEventListener("click",function(){
            data.splice(i, 1);
            localStorage.setItem("cart",JSON.stringify(data));
            // final price
        document.getElementById("displayMRP").textContent= "€" + sumMRP +" /-";
        document.getElementById("finalAmt").textContent= "€" +sum +" /-";
            displayCart(data);  
        });

        // append________________
        divImg.append(img);
        del.append(delimg);
        divDetails.append(name, code, MRP, amt);
        qty.append(disc,qnty,add);
        divFinalAmt.append(finamt);
        delet.append(del);
        div.append(divImg, divDetails, qty, divFinalAmt, delet);
        cartItem.append(div);     
        console.log(sum)     

        // final price
        document.getElementById("displayMRP").textContent= "€" + sumMRP +" /-";
   document.getElementById("finalAmt").textContent= "€" +sum +" /-";
    });

} 
displayCart(data);