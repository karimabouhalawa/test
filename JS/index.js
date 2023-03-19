
let searchBtn = document.getElementById("search");
  
searchBtn.addEventListener("click", () => { showSearchInputs(); closeSideNav();
 })


let categoriesBtn = document.getElementById("categories");
  
categoriesBtn.addEventListener("click", () => { getCategories(); closeSideNav();
 })

let areaBtn = document.getElementById("area");
  
 areaBtn.addEventListener("click", () => { getArea(); closeSideNav();
 })

let ingredientsBtn = document.getElementById("ingredients");
  
ingredientsBtn.addEventListener("click", () => { getIngredients(); closeSideNav();
})

let contactsBtn = document.getElementById("contact");
  
contactsBtn.addEventListener("click", () => { Contacts(); closeSideNav();})



let boxContainer = document.getElementById("contents");
let submitBtn;



$(document).ready(() => {
    getMeals().then(() => {
        $(".loading").fadeOut(500)
        $("body").css("overflow", "visible")

    })
});


function openSideNav() {
    $("#sideBar").animate({
        left: 0 }, 500)


    $(".side-icon-i i").removeClass("fa-align-justify");
    $(".side-icon-i i").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".side-content li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let sideBarPosition = $(".sideBar .side-content").outerWidth()
    $("#sideBar").animate({
        left: -sideBarPosition
    }, 500)

    $(".side-icon-i i").addClass("fa-align-justify");
    $(".side-icon-i i").removeClass("fa-x");


    $(".side-content li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$("#show").click(() => {
    if ($("#sideBar").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})

async function getMeals(){
    
        boxContainer.innerHTML = ""
        $(".inner-loading").fadeIn(500)
        
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
        response = await response.json()
    
        displayMeals(response.meals)
        $(".inner-loading").fadeOut(500)
    
    

 }


function displayMeals(arr) {
    let box = "";

    for (let i = 0; i < arr.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    boxContainer.innerHTML = box;
};

async function getCategories() {
    boxContainer.innerHTML = ""
    $(".inner-loading").fadeIn(500)
    

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading").fadeOut(500)

}

function displayCategories(arr) {
    let box = "";

    for (let i = 0; i < arr.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    boxContainer.innerHTML = box;
}

async function getArea() {
    boxContainer.innerHTML = ""
    $(".inner-loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    displayArea(response.meals);
    $(".inner-loading").fadeOut(500)

}

function displayArea(arr) {
    let box = "";

    for (let i = 0; i < arr.length ; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    boxContainer.innerHTML = box;
}

async function getIngredients() {
    boxContainer.innerHTML = ""
    $(".inner-loading").fadeIn(400)

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()

    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)

}


function displayIngredients(arr) {
    let box = "";

    for (let i = 0; i < arr.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    boxContainer.innerHTML = box
}

async function getCategoryMeals(category) {
    boxContainer.innerHTML = ""
    $(".inner-loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)

}
async function getAreaMeals(area) {
    boxContainer.innerHTML = ""
    $(".inner-loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)

}
async function getIngredientsMeals(ingredients) {
    boxContainer.innerHTML = ""
    $(".inner-loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)

}
async function getMealDetails(mealID) {
    closeSideNav()
    boxContainer.innerHTML = ""
    $(".inner-loading").fadeIn(300)

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    MealDetails(respone.meals[0])
    $(".inner-loading").fadeOut(300)

}





function MealDetails(meal) {

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let box = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bold">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bold">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    boxContainer.innerHTML = box
}



function showSearchInputs() {
     boxContainer.innerHTML = `   <div class="col-md-6 ">
     <input  class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
 </div>
 <div class="col-md-6">
     <input  maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
 </div> 
 `
}



 function Contacts() {
    boxContainer.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput"  type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    
}