const tagName = document.getElementsByTagName('html')[0];
tagName.setAttribute("data-theme", "light");


// fetch all list Category 
const listAllCategory = () =>{
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => showCategoryButton(data.categories))
}

const showCategoryButton = (buttons) =>{
   const buttonField = document.getElementById('button-field');
   buttons.forEach(ele => {
     const items = document.createElement('div');
     items.innerHTML=`
        <div onclick="showTargetItem('${ele.strCategory}')" class="border p-2 rounded-xl hover:bg-slate-100">
        <img class="rounded-xl mb-2" src="${ele.strCategoryThumb}"/>
        <button class="h-16 w-36 rounded-xl  hover:bg-slate-100">${ele.strCategory}</button>
        </div>
     `;
     buttonField.appendChild(items)
   });
}


const showTargetItem =async (id , showALL) =>{
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`);
    const data = await response.json();
    // if(showALL){
        allMealCard(data.meals);
    // }else{
    //     allMealCard(data.meals.slice(0, 12))

    // }
    
}


// // // fetch all mealCategory 
const allMealCategory = (show) => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => {
            if (show) {
                allMealCard(data.categories)
            }
            else {
                allMealCard(data.categories.slice(0, 12))

            }
        })
}

// // set all meal card to the card 
const allMealCard = (meals ) => {
   
    const favoriteCard = document.getElementById('favorite-card');
    favoriteCard.innerHTML = ''
    meals.forEach(ele => {
        const div = document.createElement('div');
        div.innerHTML = `
              <div class=" bg-base-100 border rounded-2xl  flex flex-col h-96 justify-center items-center text-center gap-5" >
                    <div class="w-10/12">
                        <img class="rounded-2xl full" src="${ele.strCategoryThumb ? ele.strCategoryThumb : ele.strMealThumb}" alt="">
                    </div>
                    <div class="w-10/12">
                        <div class="">
                            <h2 class="font-bold text-titleColor text-2xl">${ele.strCategory ? ele.strCategory : ele.strMeal}</h2>
                        </div>          

                    </div>
                </div>

        `;
        favoriteCard.appendChild(div);
    });
    // 

}



// click show all btn and show all meals category
const showAllBtn = () => {
    // showTargetItem (true)
    allMealCategory(true)

}

// initially show popular meals card 
const fetchPopularMeal = () =>{
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=f')
        .then(res => res.json())
        .then(data => mealCardById(data.meals))
}


// // // search first latter and find the list all meal by api 
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
  

    const favoriteCard = document.getElementById('favorite-mils-card');
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








// // click view details button and fetch the api and see details
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
                    <dialog  class=" my_modal3 modal modal-bottom sm:modal-middle">
                    <div class="modal-box">
                      <h3 class="text-xl font-bold py-3">${ele.strMeal}</h3>
                      <div class="divider"></div>
                      <img class="rounded-xl w-full" src="${ele.strMealThumb}" alt="">
                      <h5 class=" font-bold pt-5">Category :${ele.strCategory} </h5>
                      <h5 class=" font-bold py-1">Area :${ele.strArea} </h5>
                      <p class="py-4 ">Instructions : ${ele.strInstructions}</p>
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
       
            Element.querySelector(".my_modal3").showModal();
        })
        
        // Element.quarySelector.showModal();
    }







listAllCategory()
allMealCategory()
fetchPopularMeal()