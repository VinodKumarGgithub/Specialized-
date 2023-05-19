
let url = `https://specialized.onrender.com/products`
const fetchdata =async (path)=>{
   try {
    let res = await fetch(`${path}`)
        res = await res.json();
        return res
   } catch (error) {
    console.log(error);
   }
}

const main = async ()=>{
    let data = await fetchdata(url)
    displaydata(data);
    localStorage.setItem("product-list",JSON.stringify(data))
}
main()
let wishArr = JSON.parse(localStorage.getItem("wishlistitem")) || []
function catPage(){
    window.location.href ="category/category.html"
}
function displaydata(data){
document.querySelector(".h_bcycles").textContent=""
data.map(function(ele,i){
    
    let box = document.createElement("div")
    let img = document.createElement("img")
    
    let title = document.createElement("p")
     title.addEventListener("click",()=>{
        localStorage.setItem("item",ele.id);
        window.location.href="itempage.html"
    })
    if(i==0 || i==11){
        img.src="./logos/s-works1.png"
        title.textContent = "S-Works Shiv TT Disc"
    }else if(i==1 || i==29){
        img.src="./logos/s-work2.png"
        title.textContent = "S-works tarmac sl7"
    }else if(i==2 || i==12){
        img.src="./logos/s-work3.png"
        title.textContent = "Turbo Levo Pro"
    }else{
        img.src=ele.img
        title.textContent=ele.productdescriptionname
    }
    let price = document.createElement("p")
    price.textContent= `€ ${ele.price}`
    price.setAttribute("id","price")
    if(ele.mrp){
    let mrp = document.createElement("p")
    mrp.textContent= ele.mrp
    mrp.style.textDecoration = "line-through"
    }
    let button_box = document.createElement("div")
    let wish_btn =document.createElement("button")
    wish_btn.innerHTML=`<i class="fa-regular fa-heart fa-lg"></i>`
    wish_btn.style.color="black"
    wish_btn.addEventListener("click",()=>{
        if(wish_btn.style.color=="black"){
            wish_btn.style.color="red"
            wishArr.push(ele)
            localStorage.setItem("wishlistitem",JSON.stringify(wishArr))
        }else if(wish_btn.style.color=="red"){
            wish_btn.style.color="black"
            wishArr.splice(i,1);
            localStorage.setItem("wishlistitem",JSON.stringify(wishArr))
        }
        
    })
    let compare_btn = document.createElement("button")
    compare_btn.innerHTML=`<i class="fa-solid fa-code-compare"></i>`
    compare_btn.style.color="black"
    compare_btn.addEventListener("click",()=>{
        compare_btn.style.color= compare_btn.style.color=="black"? "green":"black"
    })
    button_box.append(wish_btn,compare_btn)
    box.append(img,title,price,button_box)
    if(i<3){
    document.querySelector(".h_bcycles").append(box)
   }else if(i==29 || i>10&&i<13) {
    document.querySelector("#bikesDis").append(box)
  }
})
}






// slider
let slider = document.getElementsByName("slider")
let slide_c=0

setInterval(()=>{
    slider[slide_c].checked=true
if(slide_c==slider.length-1){
    slide_c=0;
}else{
    slide_c++;
}
},4000)








// _____________Search_box____________
document.getElementById("search").addEventListener("keyup",search)
let timer
function search(event){
    clearTimeout(timer)
    let query =document.getElementById("search").value
    console.log(event.key);
    timer = setTimeout(async ()=>{
        // console.log(query);
      let data =await fetchdata(`https://specialized.onrender.com/products?q=${query}`)
        console.log(data);
        suggetion_box(data)
        if(event.key=="Enter")
         location.href="category/category.html"
        localStorage.setItem("product-list",JSON.stringify(data))
    },400)
}



// __________suggetion box__________-
function suggetion_box(data){
    document.getElementById("sugge_box").textContent=""
    document.getElementById("sugge_box").style.display="block"
    let boxe = document.createElement("div")
    boxe.textContent= "No result!"
   data.length? data.map(function(ele,i){
        if(i<=5){
        let box = document.createElement("div")
        box.textContent= ele.productdescriptionname
        box.addEventListener("click",()=>{
          localStorage.setItem("item",ele.id)
          window.location.href="itempage.html"
        })

        document.getElementById("sugge_box").append(box)
    }
    }) : document.getElementById("sugge_box").append(boxe)
}

document.querySelector("body").addEventListener("click",()=>{
    document.getElementById("sugge_box").style.display="none"
})

function notification(){
    let show = document.getElementById("notification")
    if(show)
      show.setAttribute("id","notification_pop")
  }

  function logout() {
    localStorage.clear("logged");
    window.location.href="index.html"
}  