let myData = document.getElementById("myData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(200)
        $("body").css("overflow", "visible")

    })
})

function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 200)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-side").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 200)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 200)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})




function displayMeals(arr) {
    let temp = "";
    for (let i = 0; i < arr.length; i++) {
        temp += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    myData.innerHTML = temp
}
async function getCategories() {
    myData.innerHTML = ""
    searchContainer.innerHTML = "";

    let res= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let data = await res.json()

    displayCategories(data.categories)
}
function displayCategories(arr) {
    let temp = "";

    for (let i = 0; i < arr.length; i++) {
        temp += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    myData.innerHTML = temp
}


async function getArea() {
    myData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(200)
    searchContainer.innerHTML = "";
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
   let  data = await res.json()
    console.log(data.meals);
    displayArea(data.meals)
    $(".inner-loading-screen").fadeOut(200)
}


function displayArea(arr) {
    let temp = "";
    for (let i = 0; i < arr.length; i++) {
        temp += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }
    myData.innerHTML = temp
}
    async function getIngredients() {
        myData.innerHTML = ""
        searchContainer.innerHTML = "";
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        respone = await respone.json()    
        displayIngredients(respone.meals.slice(0, 20))
    }
    function displayIngredients(arr) {
        let temp = "";
        for (let i = 0; i < arr.length; i++) {
            temp += `
            <div class="col-md-3 cursor-pointer">
                    <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center ">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3>${arr[i].strIngredient}</h3>
                            <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
            </div>
            `
        }
        myData.innerHTML = temp
    }
    async function getIngredientsMeals(ing) {
        myData.innerHTML = ""
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
        let data = await res.json()
        displayMeals(data.meals.slice(0, 20))    
    }
async function getCategoryMeals(cat) {
    myData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(200)

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
  let  data = await res.json()
    displayMeals(data.meals)
    $(".inner-loading-screen").fadeOut(200)
}



async function getAreaMeals(area) {
    myData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(200)
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let data = await res.json()
    displayMeals(data.meals)
    $(".inner-loading-screen").fadeOut(700)

}

async function getMealDetails(Id) {
    closeSideNav()
    myData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(200)
    searchContainer.innerHTML = "";
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Id}`);
   let data = await res.json();
    displayMealDetails(data.meals[0])
    $(".inner-loading-screen").fadeOut(200)
}


function displayMealDetails(meal) {
    searchContainer.innerHTML = "";
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="m-2 p-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")    
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let temp = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
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

            myData.innerHTML = temp
}


function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-black text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-white text-black" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
    myData.innerHTML = ""
}

async function searchByName(term) {
    closeSideNav()
    myData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(200)
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
  let  data = await res.json()
displayMeals(data.meals) 
    $(".inner-loading-screen").fadeOut(200)
}

async function searchByFLetter(term) {
    closeSideNav()
    myData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(200)
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    let data = await res.json()
    data.meals ? displayMeals(data.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(200)
}


function showContacts() {
    myData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-2">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValid()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValid()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@gmail.com
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValid()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValid()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValid()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum 8 characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValid()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Password must be Matched 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")
    document.getElementById("nameInput").addEventListener("focus", () => {
        myInputName = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        myInputEmail = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        myInputPhone = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        myInputAge = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        myInputPass = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        myInputRePass = true
    })
}
let myInputName = false;
let myInputEmail = false;
let myInputPhone = false;
let myInputAge = false;
let myInputPass = false;
let myInputRePass = false;
function inputsValid() {
    if (myInputName) {
        if (nameValid()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")
        }
    }
    if (myInputEmail) {
        if (emailValid()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (myInputPhone) {
        if (phoneValid()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (myInputAge) {
        if (ageValid()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
        }
    }
    if (myInputPass) {
        if (passwordValid()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (myInputRePass) {
        if (repasswordValid()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
        }
    }
    if (nameValid() &&
        emailValid() &&
        phoneValid() &&
        ageValid() &&
        passwordValid() &&
        repasswordValid()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}
function nameValid() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}
var Email_REGEX=/^([a-z0-9]+)@([a-z]+)(\.[a-zA-Z]{2,5})$/
function emailValid() {
    return Email_REGEX.test(document.getElementById("emailInput").value)
}
var Phone_Regx= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
function phoneValid() {
    return Phone_Regx.test(document.getElementById("phoneInput").value)
}
var ageRegx=/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
function ageValid() {
    return ageRegx.test(document.getElementById("ageInput").value)
}
var passwordRegx=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
function passwordValid() {
    return passwordRegx.test(document.getElementById("passwordInput").value)
}

function repasswordValid() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}