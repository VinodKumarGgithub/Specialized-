


let url = `https://specialized.onrender.com/products`
const fetchdata =async (path)=>{
   try {
    let res = await fetch(`${path}`)
        res = await res.json();
       return res;
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

function displaydata(data){
    document.querySelector("#products").textContent=""
    data.map(function(ele,i){
        if(i==0){
            return
        }
        let box = document.createElement("div")
        box.addEventListener("click",()=>{
            localStorage.setItem("item",ele.id);
            // window.location.href="#"
        })
        let img = document.createElement("img")
        img.src=ele.img
        let title = document.createElement("p")
        title.textContent=ele.productdescriptionname
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
        wish_btn.innerHTML=`<i class="fa-regular fa-heart fa-xl"></i>`
        wish_btn.addEventListener("click",()=>{
            console.log(ele.id);
        })
        let compare_btn = document.createElement("button")
        compare_btn.innerHTML=`<i class="fa-solid fa-code-compare fa-xl"></i>`
        button_box.append(wish_btn,compare_btn)
        box.append(img,title,price,button_box)
        document.querySelector("#products").append(box)
    
    })
    }


    // _____________debouncing_________________
    
    document.getElementById("search").addEventListener("keyup",()=>{
        search(event)
    })
let timer
function search(event){
    clearTimeout(timer)
    let query =document.getElementById("search").value
    // console.log(event.key)
    timer = setTimeout(async ()=>{
        // console.log(query);
      let data =await fetchdata(`https://specialized.onrender.com/products?q=${query}`)
        // console.log(data);
        suggetion_box(data)
        if(event.key=="Enter")
        displaydata(data)
        localStorage.setItem("product-list",JSON.stringify(data))
    },400)
}



// _________suggetion box_________-
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
        //   window.location.href="item.page"
        })

        document.getElementById("sugge_box").append(box)
    }
    }) : document.getElementById("sugge_box").append(boxe)
}

document.querySelector("body").addEventListener("click",()=>{
    document.getElementById("sugge_box").style.display="none"
})


// ________________filter___________

document.getElementById("select").addEventListener("change",sort)

async function sort(){
   let s= document.getElementById("select").value;
   if(s=="l-h"){
   let data = await fetchdata(`https://specialized.onrender.com/products?_sort=price&_order=asc`)
   displaydata(data)
   }else if(s=="h-l"){
    let data = await fetchdata(`https://specialized.onrender.com/products?_sort=price&_order=desc`)
    displaydata(data)
   }else if(s=="relevance"){
    let data = await fetchdata(`https://specialized.onrender.com/products`)
    displaydata(data)
   }
}