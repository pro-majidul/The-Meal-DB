const tagName = document.getElementsByTagName('html')[0];
tagName.setAttribute("data-theme", "light");

// // fetch all mealCategory 
const allMealCategory = (show) => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => {
            if (show) {
                allMealCard(data.categories)
            }
            else {
                allMealCard(data.categories.slice(0, 6))

            }
        })
}

// set all meal card to the card 
const allMealCard = (meals) => {
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
    favoriteCard.innerHTML = '';
    if (!mils) {
        favoriteCard.innerHTML = `
        <p class=" text-center font-bold text-5xl">NO Data found</p>
        `
        return;
    }

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





// click show all btn and show all meals category
const showAllBtn = () => {
    allMealCategory(true)

}


// click view details button and fetch the api and see details
const viewDetails = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => showDetails(data.meals));
       
}

const showDetails = (detail) => {
    
    const modalField = document.getElementById('show-modal');
        detail.forEach(ele => {
             const Element = document.createElement('div');
                Element.innerHTML = `
                <dialog id="my_modal3" class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box">
                      <h3 class="text-xl font-bold py-3">${ele.strMeal}</h3>
                      <div class="divider"></div>
                      <img class="rounded-xl w-full" src="${ele.strMealThumb}" alt="">
                      <h5 class=" font-bold pt-5">Category :${ele.strCategory} </h5>
                      <h5 class=" font-bold py-1">Area :${ele.strArea} </h5>
                      <p class="py-4">Instructions : ${ele.strInstructions}</p>
                      <a href="">Youtube : ${ele.strYoutube}</a>
                      <div class="modal-action">
                        <form method="dialog">
                          <button class="h-16 w-44 border rounded-xl bg-btnColor hover:bg-green-500">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
          `;
            modalField.appendChild(Element);
       
        })
        
        my_modal3.showModal();
}








allMealCategory()