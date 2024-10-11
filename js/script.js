const tagName = document.getElementsByTagName('html')[0];
tagName.setAttribute("data-theme", "light");

// // fetch all mealCategory 
const allMealCategory = () =>{
   fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => allMealCard(data.categories))
}

// set all meal card to the card 
const allMealCard = (meals ) =>{
    meals.forEach(ele => {
        const favoriteCard = document.getElementById('favorite-card');
        const div = document.createElement('div');
        div.innerHTML = `
              <div class=" bg-base-100 border rounded-2xl  flex justify-between items-center gap-10" >
                    <div class="w-10/12">
                        <img class="rounded-2xl full" src="${ele.strCategoryThumb}" alt="">
                    </div>
                    <div class="w-10/12">
                        <div class=" space-y-5 my-5">
                            <h2 class="font-bold text-titleColor text-2xl">${ele.strCategory}</h2>
                        <p class="text-titleColor overflow-hidden h-16">${ele.strCategoryDescription}</p>
                        <a onclick=viewDetails('${ele.categories}')  class="text-btnColor block underline underline-offset-4 cursor-pointer font-bold">View Details</a>
                        </div>          

                    </div>
                </div>

        `;
        favoriteCard.appendChild(div);
    });
    // 

}

// search first latter and find the list all meal by api 
document.getElementById('input-field').addEventListener('keyup', function (e) {
    e.preventDefault;
    const firstLetter = document.getElementById('input-field').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
        .then(res => res.json())
        .then(data => {
            mealCardById(data.meals);
        });
})

const mealCardById = (mils) => {

    const favoriteCard = document.getElementById('favorite-card');
    favoriteCard.innerHTML = ''
    mils.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
              <div class=" bg-base-100 border rounded-2xl  flex justify-between items-center gap-10" >
                    <div class="w-10/12">
                        <img class="rounded-2xl full" src="${item.strMealThumb}" alt="">
                    </div>
                    <div class="w-10/12">
                        <div class=" space-y-5 my-5">
                            <h2 class="font-bold text-titleColor text-2xl">${item.strMeal}</h2>
                        <p class="text-titleColor overflow-hidden h-16">${item.strInstructions}</p>
                        <a onclick=viewDetails('${item.idMeal}')  class="text-btnColor block underline underline-offset-4 cursor-pointer font-bold">View Details</a>
                        </div>          
                        
                    </div>
                </div>
        
        `;
        favoriteCard.appendChild(div);

    })

}


// click view details button and fetch the api and see details
const viewDetails =(id) =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => console.log(data))
}









allMealCategory()