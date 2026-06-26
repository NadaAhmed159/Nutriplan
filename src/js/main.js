const baseURL = "https://nutriplan-api.vercel.app/api";
let serchSection = document.getElementById("search-filters-section");
let mealCategoriesSection = document.getElementById("meal-categories-section");
let allRecipesSection = document.getElementById("all-recipes-section");
let mealDetailsSection = document.getElementById("meal-details");

let loadingOverlay = document.getElementById("app-loading-overlay");
let currentBtnArea = document.getElementById("allRecipesBtn");
let currentBtnCategory = document.getElementById("all-types-div");

currentBtnArea.addEventListener("click", await toggelAreaBtn);
currentBtnCategory.addEventListener("click", await toggleCategory);

let chosenArea = currentBtnArea.getAttribute("data-value");
let cat = currentBtnCategory.getAttribute("data-category");

let toggleView = [...document.getElementById("view-toggle").children];
let currentDisplayView = document.getElementById("grid-view-btn");

let areas = [];
let categories = [];
let meals = [];
const categoryStyles = {
  All: {
    style:
      "from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-400",
    activeStyle:
      "from-emerald-500 to-green-500 text-white border-emerald-500 hover:border-emerald-600",
  },
  Beef: {
    style: "from-red-50 to-rose-50 border-red-200 hover:border-red-400",
    activeStyle:
      "from-red-500 to-rose-500 text-white border-red-500 hover:border-red-600",
    icon: "fa-solid fa-drumstick-bite",
    iconStyle: "from-red-400 to-rose-500",
  },

  Chicken: {
    style: "from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400",
    activeStyle:
      "from-amber-500 to-orange-500 text-white border-amber-500 hover:border-amber-600",
    icon: "fa-solid fa-drumstick-bite",
    iconStyle: "from-amber-400 to-orange-500",
  },

  Dessert: {
    style: "from-pink-50 to-rose-50 border-pink-200 hover:border-pink-400",
    activeStyle:
      "from-pink-500 to-rose-500 text-white border-pink-500 hover:border-pink-600",
    icon: "fa-solid fa-cake-candles",
    iconStyle: "from-pink-400 to-rose-500",
  },

  Lamb: {
    style:
      "from-orange-50 to-amber-50 border-orange-200 hover:border-orange-400",
    activeStyle:
      "from-orange-500 to-amber-500 text-white border-orange-500 hover:border-orange-600",
    icon: "fa-solid fa-drumstick-bite",
    iconStyle: "from-orange-400 to-amber-500",
  },

  Miscellaneous: {
    style: "from-slate-50 to-gray-50 border-slate-200 hover:border-slate-400",
    activeStyle:
      "from-slate-500 to-gray-500 text-white border-slate-500 hover:border-slate-600",
    icon: "fa-solid fa-bowl-rice",
    iconStyle: "from-slate-400 to-gray-500",
  },

  Pasta: {
    style:
      "from-yellow-50 to-amber-50 border-yellow-200 hover:border-yellow-400",
    activeStyle:
      "from-yellow-500 to-amber-500 text-white border-yellow-500 hover:border-yellow-600",
    icon: "fa-solid fa-bowl-food",
    iconStyle: "from-yellow-400 to-amber-500",
  },

  Pork: {
    style: "from-rose-50 to-red-50 border-rose-200 hover:border-rose-400",
    activeStyle:
      "from-rose-500 to-red-500 text-white border-rose-500 hover:border-rose-600",
    icon: "fa-solid fa-bacon",
    iconStyle: "from-rose-400 to-red-500",
  },

  Seafood: {
    style: "from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-400",
    activeStyle:
      "from-cyan-500 to-blue-500 text-white border-cyan-500 hover:border-cyan-600",
    icon: "fa-solid fa-fish",
    iconStyle: "from-cyan-400 to-blue-500",
  },

  Side: {
    style:
      "from-green-50 to-emerald-50 border-green-200 hover:border-green-400",
    activeStyle:
      "from-green-500 to-emerald-500 text-white border-green-500 hover:border-green-600",
    icon: "fa-solid fa-plate-wheat",
    iconStyle: "from-green-400 to-emerald-500",
  },

  Starter: {
    style: "from-teal-50 to-cyan-50 border-teal-200 hover:border-teal-400",
    activeStyle:
      "from-teal-500 to-cyan-500 text-white border-teal-500 hover:border-teal-600",
    icon: "fa-solid fa-utensils",
    iconStyle: "from-teal-400 to-cyan-500",
  },

  Vegan: {
    style:
      "from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-400",
    activeStyle:
      "from-emerald-500 to-green-500 text-white border-emerald-500 hover:border-emerald-600",
    icon: "fa-solid fa-leaf",
    iconStyle: "from-emerald-400 to-green-500",
  },
};

async function getAllAreas() {
  const cuisineGrid = document.getElementById("cuisine-grid");
  const res = await fetch(`${baseURL}/meals/areas`);
  const data = await res.json();
  areas = data.results;
  for (let i = 0; i < 10; i++) {
    const areaBtn = document.createElement("button");
    areaBtn.className =
      "px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all areaBtn";
    areaBtn.textContent = areas[i].name;
    areaBtn.setAttribute("data-value", areas[i].name);
    areaBtn.addEventListener("click", await toggelAreaBtn);
    cuisineGrid.append(areaBtn);
  }
}

async function toggelAreaBtn(e) {
  currentBtnArea.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );
  currentBtnArea.classList.add(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  currentBtnArea = e.target;
  currentBtnArea.classList.add(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );
  currentBtnArea.classList.remove(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  chosenArea = currentBtnArea.getAttribute("data-value");

  cat = currentBtnCategory.getAttribute("data-category");

  currentBtnCategory.classList.remove(
    ...categoryStyles[cat].activeStyle.split(" "),
  );
  currentBtnCategory.classList.add(...categoryStyles[cat].style.split(" "));

  currentBtnCategory = document.getElementById("all-types-div");

  cat = currentBtnCategory.getAttribute("data-category");

  currentBtnCategory.classList.add(
    ...categoryStyles[cat].activeStyle.split(" "),
  );
  currentBtnCategory.classList.remove(...categoryStyles[cat].style.split(" "));

  loadingOverlay.classList.remove("loading");
  await getMeals();
  loadingOverlay.classList.add("loading");
}

async function getAllCategories() {
  let categoryGrid = document.getElementById("categories-grid");
  const res = await fetch(`${baseURL}/meals/categories`);
  const data = await res.json();
  categories = data.results;
  for (let i = 0; i < 11; i++) {
    const style = categoryStyles[categories[i].name];
    const categoryCard = document.createElement("div");
    categoryCard.className = `category-card bg-gradient-to-br rounded-xl p-3 border ${style.style} hover:shadow-md cursor-pointer transition-all group`;
    categoryCard.setAttribute("data-category", categories[i].name);

    const inner = document.createElement("div");
    inner.className = "flex items-center gap-2.5";

    const iconHolder = document.createElement("div");
    iconHolder.className = `text-white w-9 h-9 bg-gradient-to-br ${style.iconStyle} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`;

    const icon = document.createElement("i");
    icon.className = style.icon;
    iconHolder.append(icon);

    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.className = "text-sm font-bold text-gray-900";
    h3.textContent = categories[i].name;
    div.append(h3);

    inner.append(iconHolder, div);
    categoryCard.append(inner);

    categoryCard.addEventListener("click", await toggleCategory);
    categoryGrid.append(categoryCard);
  }
}
async function toggleCategory(e) {
  cat = currentBtnCategory.getAttribute("data-category");

  currentBtnCategory.classList.remove(
    ...categoryStyles[cat].activeStyle.split(" "),
  );
  currentBtnCategory.classList.add(...categoryStyles[cat].style.split(" "));

  currentBtnCategory = e.target.closest(".category-card");
  cat = currentBtnCategory.getAttribute("data-category");

  currentBtnCategory.classList.add(
    ...categoryStyles[cat].activeStyle.split(" "),
  );
  currentBtnCategory.classList.remove(...categoryStyles[cat].style.split(" "));

  currentBtnArea.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );
  currentBtnArea.classList.add(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  currentBtnArea = document.getElementById("allRecipesBtn");
  currentBtnArea.classList.add(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );
  currentBtnArea.classList.remove(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );

  chosenArea = "";
  loadingOverlay.classList.remove("loading");
  await getMeals();
  loadingOverlay.classList.add("loading");
}

async function getMeals(ingredient, category = cat, cusine = chosenArea) {
  let res;
  if (ingredient || cusine || (category && category !== "All"))
    res = await fetch(
      `${baseURL}/meals/filter?ingredient=${ingredient ? ingredient : ""}&limit=25&category=${category !== undefined && category !== "All" ? category : ""}&area=${cusine ? cusine : ""}`,
    );
  else res = await fetch(`${baseURL}/meals/random?count=25`);

  const data = await res.json();
  meals = data.results;
  displayMeals();
}

function displayMeals() {
  const recipesGrid = document.getElementById("recipes-grid");
  const recipesCount = document.getElementById("recipes-count");
  recipesGrid.innerHTML = "";
  recipesCount.textContent = `Showing ${meals.length} ${chosenArea !== "" ? chosenArea : ""}${cat && cat !== "All" ? cat : ""} recipes`;
  if (meals.length === 0) {
    recipesGrid.innerHTML = `
<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>
        `;
    recipesGrid.className = "grid grid-cols-1 gap-5";
  }
  const view = currentDisplayView.getAttribute("title");
  for (let i = 0; i < meals.length; i++) {
    const recipeCard = document.createElement("div");
    if (view === "Grid View") {
      recipesGrid.className = "grid grid-cols-4 gap-5";
      recipeCard.className =
        "recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group";
    } else {
      recipesGrid.className = "grid grid-cols-2 gap-4";
      recipeCard.className =
        "recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-row h-40";
    }

    recipeCard.setAttribute("data-meal-id", meals[i].id);

    const imgContainer = document.createElement("div");
    imgContainer.className = `relative overflow-hidden ${view === "Grid View" ? "h-48" : "w-48 h-full"}`;
    const image = document.createElement("img");
    image.className =
      "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500";
    image.setAttribute("src", meals[i].thumbnail);
    image.setAttribute("alt", meals[i].name);

    const layout = document.createElement("div");
    layout.className = `absolute bottom-3 left-3 flex gap-2 ${view === "Grid View" ? "" : "hidden"}`;

    const category = document.createElement("span");
    category.className =
      "px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700";
    category.textContent = `${meals[i].category}`;

    const cusine = document.createElement("span");
    cusine.className =
      "px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white";
    cusine.textContent = `${meals[i].area ? meals[i].area : " International"}`;
    layout.append(category, cusine);
    imgContainer.append(image, layout);

    const container = document.createElement("div");
    container.className = "p-4";

    const recipesName = document.createElement("h3");
    recipesName.className =
      "text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1";
    recipesName.textContent = meals[i].name;

    const p = document.createElement("p");
    p.className = "text-xs text-gray-600 mb-3 line-clamp-2";
    p.textContent = meals[i].instructions[0];

    const div = document.createElement("div");
    div.className = "flex items-center justify-between text-xs";

    const categorySpan = document.createElement("span");
    categorySpan.className = "font-semibold text-gray-900";
    categorySpan.innerHTML = `<i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${meals[i].category}`;

    const cuisineSpan = document.createElement("span");
    cuisineSpan.className = "font-semibold text-gray-500";
    cuisineSpan.innerHTML = `<i class="fa-solid fa-globe text-blue-500 mr-1"></i>${meals[i].area ? meals[i].area : " International"}`;
    div.append(categorySpan, cuisineSpan);
    container.append(recipesName, p, div);
    recipeCard.append(imgContainer, container);

    recipeCard.addEventListener("click", async function (e) {
      loadingOverlay.classList.remove("loading");
      await getMealDetails(e);
      loadingOverlay.classList.add("loading");
    });
    recipesGrid.append(recipeCard);
  }
}
async function getMealMacros(meal) {
  let ingredients = [];
  for (let i = 0; i < meal.ingredients.length; i++) {
    ingredients[i] =
      meal.ingredients[i].measure + " " + meal.ingredients[i].ingredient;
  }

  const postObject = {
    recipeName: meal.name,
    ingredients: ingredients,
  };
  const res = await fetch(`${baseURL}/nutrition/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "qeJZp5VC0A2gkO1Ebnl4mwBCgopccI5R4TIdUBY5",
    },
    body: JSON.stringify(postObject),
  });
  const data = await res.json();
  return data.data;
}

async function getMealDetails(e) {

  const mealId = e.currentTarget.getAttribute("data-meal-id");
  const res = await fetch(`${baseURL}/meals/${mealId}`);
  const data = await res.json();
  const meal = data.result;
  const nut = await getMealMacros(meal);
  const mealMacros = {
    protein: nut.perServing.protein,
    carbs: nut.perServing.carbs,
    fat: nut.perServing.fat,
    fiber: nut.perServing.fiber,
    sugar: nut.perServing.sugar,
    saturatedFat: nut.perServing.saturatedFat,
  };

  const percentageMacros = calcMacrosPercentage(mealMacros);
  serchSection.classList.add("hidden");
  mealCategoriesSection.classList.add("hidden");
  allRecipesSection.classList.add("hidden");
  mealDetailsSection.classList.remove("hidden");

  mealDetailsSection.innerHTML = `
        <div class="max-w-7xl mx-auto">
          <button
            id="back-to-meals-btn"
            class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
          >
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back to Recipes</span>
          </button>

          <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div class="relative h-80 md:h-96">
              <img
                src="${meal.thumbnail}"
                alt="${meal.name}"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${meal.category}</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${meal.area ? meal.area : "International"}</span
                  >
                  ${
                    meal.tags
                      ? meal.tags.map(
                          (tag) =>
                            `<span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">${tag}</span>`,
                        )
                      : ""
                  }
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  ${meal.name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">4 servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                    <span id="hero-calories">${nut.perServing.calories} cal/serving</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-3 mb-8">
            <button
              id="log-meal-btn"
              class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
              data-meal-id="${meal.id}"
            >
              <i class="fa-solid fa-clipboard-list"></i>
              <span>Log This Meal</span>
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Ingredients & Instructions -->
            <div class="lg:col-span-2 space-y-8">
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-list-check text-emerald-600"></i>
                  Ingredients
                  <span class="text-sm font-normal text-gray-500 ml-auto"
                    >${meal.ingredients.length} items</span
                  >
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${meal.ingredients
                  .map(
                    (ing) => `
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${ing.measure}</span>
                      ${ing.ingredient}
                    </span>
                  </div>                    
                    `,
                  )
                  .join("")}
                  
                </div>
              </div>

              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                  Instructions
                </h2>
                <div class="space-y-4">
                ${meal.instructions
                  .map(
                    (ins, index) => `
                    <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      ${index + 1}
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      ${ins}
                    </p>
                  </div>`,
                  )
                  .join("")}
                  
                </div>
              </div>

              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-video text-red-500"></i>
                  Video Tutorial
                </h2>
                <div
                  class="relative aspect-video rounded-xl overflow-hidden bg-gray-100"
                >
                  <iframe
                    src="https://www.youtube.com/embed/${extractYoutupeId(meal.youtube)}"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="
                      accelerometer;
                      autoplay;
                      clipboard-write;
                      encrypted-media;
                      gyroscope;
                      picture-in-picture;
                    "
                    allowfullscreen
                  >
                  </iframe>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  Nutrition Facts
                </h2>
                <div id="nutrition-facts-container">
                  <p class="text-sm text-gray-500 mb-4">Per serving</p>

                  <div
                    class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
                  >
                    <p class="text-sm text-gray-600">Calories per serving</p>
                    <p class="text-4xl font-bold text-emerald-600">${nut.perServing.calories}</p>
                    <p class="text-xs text-gray-500 mt-1">Total: ${nut.totals.calories} cal</p>
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                      </div>
                      <span class="font-bold text-gray-900">${nut.perServing.protein}</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-emerald-500 h-2 rounded-full"
                        style="width:${percentageMacros.proteinP > 100 ? 100 : percentageMacros.proteinP}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                      </div>
                      <span class="font-bold text-gray-900">${nut.perServing.carbs}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-blue-500 h-2 rounded-full"
                        style="width: ${percentageMacros.carbsP > 100 ? 100 : percentageMacros.carbsP}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                      </div>
                      <span class="font-bold text-gray-900">${nut.perServing.fat}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-purple-500 h-2 rounded-full"
                        style="width: ${percentageMacros.fatP > 100 ? 100 : percentageMacros.fatP}%"
                      ></div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                      </div>
                      <span class="font-bold text-gray-900">${nut.perServing.fiber}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-orange-500 h-2 rounded-full"
                        style="width: ${percentageMacros.fiberP > 100 ? 100 : percentageMacros.fiberP}%"
                      ></div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                      </div>
                      <span class="font-bold text-gray-900">${nut.perServing.sugar}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-pink-500 h-2 rounded-full"
                        style="width: ${percentageMacros.sugarP > 100 ? 100 : percentageMacros.sugarP}%"
                      ></div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <span class="text-gray-700">Saturated Fat</span>
                      </div>
                      <span class="font-bold text-gray-900">${nut.perServing.saturatedFat}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-red-500 h-2 rounded-full"
                        style="width: ${percentageMacros.saturatedFatP > 100 ? 100 : percentageMacros.saturatedFatP}%"
                      ></div>
                    </div>
                  </div>
                  <div class="mt-6 pt-6 border-t border-gray-100">
                    <h3 class="text-sm font-semibold text-gray-900 mb-3">
                      Other
                    </h3>
                    <div class="grid grid-cols-2 gap-3 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Cholesterol</span>
                        <span class="font-medium">${nut.perServing.cholesterol}mg</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Sodium</span>
                        <span class="font-medium">${nut.perServing.sodium}mg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  `;

  const backToMealsBtn = document.getElementById("back-to-meals-btn");
  backToMealsBtn.addEventListener("click", function () {
    serchSection.classList.remove("hidden");
    mealCategoriesSection.classList.remove("hidden");
    allRecipesSection.classList.remove("hidden");
    mealDetailsSection.classList.add("hidden");
  });
}

function extractYoutupeId(url) {
  return url.split("v=")[1];
}
function calcMacrosPercentage(macro) {
  const protein = 50;
  const carbs = 250;
  const fat = 65;
  const fiber = 25;
  const sugar = 50;
  const saturatedFat = 20;
  const percentageMacro = {
    proteinP: (macro.protein / protein) * 100,
    carbsP: (macro.carbs / carbs) * 100,
    fatP: (macro.fat / fat) * 100,
    fiberP: (macro.fiber / fiber) * 100,
    sugarP: (macro.sugar / sugar) * 100,
    saturatedFatP: (macro.saturatedFat / saturatedFat) * 100,
  };
  return percentageMacro;
}
(async function () {
  loadingOverlay.classList.remove("loading");
  await getAllAreas();
  await getAllCategories();
  await getMeals();
  loadingOverlay.classList.add("loading");
})();
toggleView.forEach((element) => {
  element.addEventListener("click", function (e) {
    currentDisplayView.classList.remove("bg-white", "rounded-md", "shadow-sm");
    currentDisplayView = e.currentTarget;
    currentDisplayView.classList.add("bg-white", "rounded-md", "shadow-sm");
    displayMeals();
  });
});
