

    let sumMRP=0;
    let data= JSON.parse(localStorage.getItem("cart-list")) || []

    // data.push(obj);
    // console.log(data);

    let cartItem=document.querySelector("#cart");
    let sum=0;
function displayCart(data){
    document.querySelector("#cart").textContent="";
    console.log(data,sum);
    data.map((ele,i)=>{
        
        let div=document.createElement("div");
        div.id="mainDiv";
        let divImg=document.createElement("div");
        divImg.id="imgDiv";
        let img=document.createElement("img");
        img.src=ele.img;
        let divDetails=document.createElement("div");
        divDetails.id="detail";
        let productdescriptionname=document.createElement("h4");
        productdescriptionname.textContent=ele.productdescriptionname
        let code=document.createElement("p");
        code.textContent="2456155";
        let MRP=document.createElement("p");
        MRP.textContent="€ "+ele.mrp 
        MRP.id="displayMRPCart";
        let mrp=document.createElement("p");
        mrp.textContent="€ "+ele.price 
        mrp.id="displayMRPfynl";

        let qty=document.createElement("div");
        
        let disc=document.createElement("button");
        disc.textContent="-";
        
        let qnty=document.createElement("input");
        qnty.value="1";
        let add=document.createElement("button");
        add.textContent="+";
        
        let divFinalmrp=document.createElement("div");
        let finmrp=document.createElement("p");

          sum+=ele.price; 
          sumMRP+=ele.mrp
        finmrp.textContent="€ "+ ele.price *qnty.value ;
        // sum+=finmrp;0
        disc.addEventListener('click',function(){
            if(qnty.value==1){
                alert("Minimum Quantity could be 1")
            }else {
                qnty.value--;
                sum-=ele.price 
                sumMRP-=ele.mrp
                finmrp.textContent="€ "+ ele.price *qnty.value ;
                localStorage.setItem("cart_Value",sum);
                // final price
        document.getElementById("displayMRP").textContent= "€" + sumMRP 
        document.getElementById("finalmrp").textContent= "€" +sum 
            }
        }) 

        add.addEventListener('click',function(){
            qnty.value++;
            sum+=ele.price 
            sumMRP+=ele.mrp
            finmrp.textContent="€ "+ ele.price*qnty.value ;   
            // final price
        document.getElementById("displayMRP").textContent= "€" + sumMRP 
        document.getElementById("finalmrp").textContent= "€" +sum 
        localStorage.setItem("cart_Value",sum);
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
        document.getElementById("displayMRP").textContent= "€" + sumMRP 
        document.getElementById("finalmrp").textContent= "€" +sum 
            displayCart(data);  
        });

        // append________________
        divImg.append(img);
        del.append(delimg);
        divDetails.append(productdescriptionname, code, MRP, mrp);
        qty.append(disc,qnty,add);
        divFinalmrp.append(finmrp);
        delet.append(del);
        div.append(divImg, divDetails, qty, divFinalmrp, delet);
        cartItem.append(div);     
        // console.log(sum)     
        localStorage.setItem("cart_Value",sum);

        // final price
        document.getElementById("displayMRP").textContent= "€" + sumMRP 
     document.getElementById("finalAmt").textContent= "€" +sum 
    });

} 
displayCart(data);


function home(){
    location.href = "../index.html"
}