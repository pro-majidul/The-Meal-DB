const tagName = document.getElementsByTagName('html')[0];
tagName.setAttribute("data-theme" , "light");

// fetch all mealCategory 
const allMealCategory = () =>{
   fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => allMealCard(data.categories))
}

// set all meal card to the card 
const allMealCard = (meals) =>{
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
                        <a class="text-btnColor block underline underline-offset-4 cursor-pointer font-bold">View Details</a>
                        </div>
                        
                    </div>
                </div>
        
        `;
        favoriteCard.appendChild(div);
    });
   
}

// click view details button and fetch the api and see details 
const viewDetails =(id) =>{
    fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => console.log(data))
}

allMealCategory()