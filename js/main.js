var title = document.querySelector("#title");
var price = document.querySelector("#price");
var taxes = document.querySelector("#taxes");
var ads = document.querySelector("#ads");
var discount = document.querySelector("#discount");
var total = document.querySelector("#total");
var count = document.querySelector("#count");
var category = document.querySelector("#category");
var submit = document.querySelector("#submit");
var mood = "create";
var temp;

//////  Get Total
function getTotal(){
    if(price.value != ''){          
        total.innerHTML = (+price.value + +taxes.value + +ads.value) - (+discount.value);   
        total.style.backgroundColor = "#198754"
    }
    else{
        total.innerHTML = '';
        total.style.background = "#dc3545"
    }
}
//////  Create Product
var dataProduct ;
    if(localStorage.products != null){
        dataProduct = JSON.parse(localStorage.products);
        showData();
    }
    else{
        dataProduct = [];
    }
function addProduct(){
    var newProduct ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    };
    if(title.value != '' && price.value != '' && category.value != ''){ 
        if(mood === "create"){
            if(newProduct.count > 1){   
                for(var i = 0 ; i < newProduct.count ; i++){
                    dataProduct.push(newProduct);
                }
            }
            else{
                dataProduct.push(newProduct);
            }
        }
        else{
            dataProduct[temp] = newProduct;
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }
    clearData();          
    } ;
    localStorage.setItem("products",JSON.stringify(dataProduct));    //Save Local Storage
    showData();    
};
//////  Clear Inputs
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
};
//////  Show Data
function showData(){
    var table = '';
        for ( var i = 0 ; i < dataProduct.length ; i ++){
            table += `
            <tr class="text-center">
                <td>${i+1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick = "updateData(${i})" class="btn btn-outline-info" id="update">update</button></td>
                <td><button onclick = "deleteProduct(${i})" class="btn btn-outline-danger" id="delete">delete</button></td>
            </tr> ` ;
        }
    document.getElementById("tbody").innerHTML = table;
//////  count      
    var btnDelete = document.getElementById("deleteAll");
        if(dataProduct.length > 0){
            btnDelete.innerHTML = `<button onclick="deleteAll()" class="btn btn-primary w-25">Delete All ( ${dataProduct.length} )</button>`;
        }else{
            btnDelete.innerHTML = '';
        }
    getTotal();
};
//////  Delete Product 
function deleteProduct(i){
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
};
//////  Delete All
function deleteAll(){
    localStorage.clear();
    dataProduct.splice(0);
    showData();
};
//////  Update
function updateData(i){
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    category.value = dataProduct[i].category;
    count.style.display = 'none';       
    submit.innerHTML = "Update";   
    mood = "update";
    temp = i;
    scroll({
        top : 0 ,
        behavior : "smooth",
    })
};
//////  Search
var searchMood="title";
function getSearch(id){
    var search = document.getElementById("search");
    if(id == "SearchTitle"){
        searchMood="title";
    }else{
        searchMood="category";
    }
    search.placeholder = `SearchBy${searchMood}`;
    search.focus();
    search.value = "";
    showData();
};
function searchData(value){
    var table = '';
    for(var i = 0 ; i < dataProduct.length ; i++){
        if(searchMood == "title"){
            if(dataProduct[i].title.toLowerCase().includes(value.toLowerCase())){
                table += `
                    <tr class="text-center">
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick = "updateData(${i})" class="btn btn-outline-info" id="update">update</button></td>
                        <td><button onclick = "deleteProduct(${i})" class="btn btn-outline-danger" id="delete">delete</button></td>
                    </tr> ` ;
            }
        }
        else{
            if(dataProduct[i].category.toLowerCase().includes(value.toLowerCase())){
                    table += `
                    <tr  class="text-center">
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick = "updateData(${i})" class="btn btn-outline-info" id="update">update</button></td>
                        <td><button onclick = "deleteProduct(${i})" class="btn btn-outline-danger" id="delete">delete</button></td>
                    </tr> ` ;
            }
        }
    }    
    document.getElementById("tbody").innerHTML = table;
};