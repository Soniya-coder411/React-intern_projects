const recipesContainer = document.getElementById("recipes");

/* Search Recipe By Ingredient */

async function searchRecipe() {
  const ingredient = document.getElementById("ingredient").value.trim();

  if (ingredient === "") {
    recipesContainer.innerHTML = `<div class="loading">
        Please enter an ingredient
        </div>`;

    return;
  }

  recipesContainer.innerHTML = `<div class="loading">
    Loading Recipes...
    </div>`;

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    );

    const data = await response.json();

    displayRecipes(data.meals);
  } catch (error) {
    recipesContainer.innerHTML = `<div class="loading">
        Error loading recipes
        </div>`;
  }
}

/* Display Recipes */

function displayRecipes(meals) {
  recipesContainer.innerHTML = "";

  if (!meals) {
    recipesContainer.innerHTML = `<div class="loading">
        No Recipes Found
        </div>`;

    return;
  }

  meals.forEach((meal) => {
    recipesContainer.innerHTML += `

        <div class="card">

            <img
            src="${meal.strMealThumb}"
            alt="${meal.strMeal}">

            <div class="card-content">

                <h3>${meal.strMeal}</h3>

                <p>
                Recipe ID:
                ${meal.idMeal}
                </p>

                <span class="badge">
                Popular Recipe
                </span>

                <br>

                <button
                onclick="recipeDetails('${meal.idMeal}')"
                style="
                margin-top:10px;
                padding:8px 12px;
                border:none;
                background:#ff6b35;
                color:white;
                border-radius:5px;
                cursor:pointer;">
                View Details
                </button>

            </div>

        </div>
        `;
  });
}

/* Recipe Details */

async function recipeDetails(id) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );

    const data = await response.json();

    const meal = data.meals[0];

    alert(
      "Recipe Name: " +
        meal.strMeal +
        "\n\nCategory: " +
        meal.strCategory +
        "\n\nArea: " +
        meal.strArea +
        "\n\nInstructions:\n" +
        meal.strInstructions.substring(0, 300) +
        "...",
    );
  } catch (error) {
    alert("Unable to load recipe details");
  }
}

/* Category Filter */

async function filterCategory(category) {
  recipesContainer.innerHTML = `<div class="loading">
    Loading Category...
    </div>`;

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    );

    const data = await response.json();

    displayRecipes(data.meals);
  } catch (error) {
    recipesContainer.innerHTML = `<div class="loading">
        Error loading category
        </div>`;
  }
}

/* Load Default Recipes */

window.onload = async function () {
  recipesContainer.innerHTML = `<div class="loading">
    Loading Featured Recipes...
    </div>`;

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`,
    );

    const data = await response.json();

    displayRecipes(data.meals);
  } catch (error) {
    recipesContainer.innerHTML = `<div class="loading">
        Failed to load recipes
        </div>`;
  }
};
function galleryView() {
  alert("Gallery View");
}

function listView() {
  alert("List View");
}

function tableView() {
  alert("Table View");
}
