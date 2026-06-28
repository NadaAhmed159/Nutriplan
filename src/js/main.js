const baseURL = "https://nutriplan-api.vercel.app/api";
let loadingOverlay = document.getElementById("app-loading-overlay");
let navLinks = document.querySelectorAll(".navList");
let currentNav = document.getElementById("Meals-Recipes");
let currentSection = document.getElementById("Meals");
let mainSection = document.getElementById("Meals");
//&&&&&&&&&&&&&&&&&&&& Meals & Recipes global variables
const searchInput = document.getElementById("search-input");
let serchSection = document.getElementById("search-filters-section");
let mealCategoriesSection = document.getElementById("meal-categories-section");
let allRecipesSection = document.getElementById("all-recipes-section");

let currentBtnArea = document.getElementById("allRecipesBtn");
let currentBtnCategory = document.getElementById("all-types-div");
let chosenArea = currentBtnArea.getAttribute("data-value");
let cat = currentBtnCategory.getAttribute("data-category");

let toggleView = [...document.getElementById("view-toggle").children];
let currentDisplayView = document.getElementById("grid-view-btn");
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
let areas = [];
let categories = [];
let meals = [];

//&&&&&&&&&&&&&&&&&&&& Meal details variables
let mealDetailsSection = document.getElementById("meal-details");
const modal = document.getElementById("log-Modal");
const modalIncrement = document.getElementById("increment-modal");
const modalDecrement = document.getElementById("decrement-modal");
const logMealBtn = document.getElementById("log-meal-btn");
const currentServing = document.getElementById("current-serving");

//&&&&&&&&&&&&&&&&&&&& Food scan variables
const addProductLogModal = document.getElementById("add-product-log");
const cancelProductModal = document.getElementById("cancel-product-log");
const productModal = document.getElementById("product-modal");

let productsScanSection = document.getElementById("products-section");
const productSearchInput = document.getElementById("product-search-input");
const productSearchBtn = document.getElementById("search-product-btn");
const productBarcodeInput = document.getElementById("barcode-input");
const productBarcodeBtn = document.getElementById("lookup-barcode-btn");
const productsGrid = document.getElementById("products-grid");
const productCategories = document.getElementById("product-categories");

const ProductCategoryStyles = {
  "breakfast-cereals": {
    style:
      "from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-400",
    icon: "fa-solid fa-wheat-awn",
  },
  beverages: {
    style: "from-red-50 to-rose-50 border-red-200 hover:border-red-400",
    icon: "fa-solid fa-bottle-water",
  },
  snacks: {
    style: "from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400",
    icon: "fa-solid fa-cookie",
  },
  dairies: {
    style:
      "from-orange-50 to-amber-50 border-orange-200 hover:border-orange-400",
    icon: "fa-solid fa-cheese",
  },
  cheeses: {
    style:
      "from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-400",
    icon: "fa-solid fa-cheese",
  },
  yogurts: {
    style: "from-teal-50 to-cyan-50 border-teal-200 hover:border-teal-400",
    icon: "fa-solid fa-jar",
  },
  chocolates: {
    style:
      "from-green-50 to-emerald-50 border-green-200 hover:border-green-400",
    icon: "fa-solid fa-mug-hot",
  },
  biscuits: {
    style: "from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-400",
    icon: "fa-solid fa-cookie-bite",
  },
  "ice-creams": {
    style: "from-rose-50 to-red-50 border-rose-200 hover:border-rose-400",
    icon: "fa-solid fa-ice-cream",
  },
  breads: {
    style:
      "from-yellow-50 to-amber-50 border-yellow-200 hover:border-yellow-400",
    icon: "fa-solid fa-bread-slice",
  },
  fruits: {
    style: "from-slate-50 to-gray-50 border-slate-200 hover:border-slate-400",
    icon: "fa-solid fa-apple-whole",
  },
  vegetables: {
    style:
      "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700",
    icon: "fa-solid fa-carrot",
  },
};
const nutriScoreFilter = document.querySelectorAll(".nutri-score-filter");
let currentProducts = [];
const nutriScoreColors = {
  a: "bg-green-500",
  b: "bg-lime-500",
  c: "bg-yellow-500",
  d: "bg-orange-500",
  e: "bg-red-500",
};
const novaColors = {
  1: "#22c55e",
  2: "#84cc16",
  3: "#fb923c",
  4: "#ef4444",
};

const novaColorsLight = {
  1: "#dcfce7",
  2: "#ecfccb",
  3: "#ffedd5",
  4: "#fee2e2",
};
const nutriScoreColorsLight = {
  a: "#dcfce7",
  b: "#ecfccb",
  c: "#fef9c3",
  d: "#ffedd5",
  e: "#fee2e2",
};
//&&&&&&&&&&&&&&&&&&&& Food Log variables
let mealLogsSection = document.getElementById("foodlog-section");
let caloriesSpan = document.getElementById("total-log-calaroies");
let protienSpan = document.getElementById("total-log-protien");
let carbsSpan = document.getElementById("total-log-carbs");
let fatSpan = document.getElementById("total-log-fat");

let logedItemsCount = document.getElementById("logedItemsCount");
const clearAllLogBtn = document.getElementById("clear-foodlog");

let logedItems = JSON.parse(localStorage.getItem("logedItems")) || [];
let logedStat = JSON.parse(localStorage.getItem("logedStat")) || {
  totalLogCalaroies: 0,
  totalLogProtien: 0,
  totalLogCarbs: 0,
  totalLogFat: 0,
  totalLogCalaroiesP: 0,
  totalLogProtienP: 0,
  totalLogCarbsP: 0,
  totalLogFatP: 0,
};
const itemsOfWeek = document.getElementById("items-of-week");
itemsOfWeek.innerText = logedItems.length + " items";
//&&&&&&&&&&&&&&&&&&&& start functions

async function searchMeal(term) {
  const res = await fetch(`${baseURL}/meals/search?q=${term}&page=1&limit=25`);
  const data = await res.json();
  meals = data.results;
  displayMeals(meals);
  console.log(meals);
}

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
  history.pushState(null, "home", "home");

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
    return;
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

    recipesGrid.append(recipeCard);
  }
  //   const productCards = document.querySelectorAll(".product-card");
  // console.log(productCards);

  // productCards.forEach((element) => {
  //   element.addEventListener("click", async function (e) {

  //     const product = await getProductByBarCode(
  //       e.target.getAttribute("data-barcode"),
  //     );
  //     displayProductModal(product);
  //   });
  // });
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
  currentSection = document.getElementById("meal-details");
  const mealId = e.currentTarget.getAttribute("data-meal-id");
  const res = await fetch(`${baseURL}/meals/${mealId}`);
  const data = await res.json();
  const meal = data.result;
  const nut = await getMealMacros(meal);
  const mealMacros = {
    calories: nut.perServing.calories,
    protein: nut.perServing.protein,
    carbs: nut.perServing.carbs,
    fat: nut.perServing.fat,
    fiber: nut.perServing.fiber,
    sugar: nut.perServing.sugar,
    saturatedFat: nut.perServing.saturatedFat,
  };

  const percentageMacros = calcMacrosPercentage(mealMacros);
  mainSection.classList.add("hidden");
  mealDetailsSection.classList.remove("hidden");
  history.replaceState(
    null,
    null,
    `meal/${meal.name.trim().toLowerCase().replace(/\s+/g, "-")}`,
  );

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
                      ? meal.tags
                          .map(
                            (tag) =>
                              `<span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">${tag}</span>`,
                          )
                          .join("")
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
              id="modal-btn"
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
    history.pushState(null, "home", "home");

    mainSection.classList.remove("hidden");
    mealDetailsSection.classList.add("hidden");
  });

  const modalBtn = document.getElementById("modal-btn");
  let item = {
    itemName: meal.name,
    itemThumbnail: meal.thumbnail,
    mealMacros: mealMacros,
    percentageMacros: percentageMacros,
  };
  modalBtn.addEventListener("click", function () {
    displayModal(item);
  });
}

function displayModal(item) {
  const modalImage = document.getElementById("modal-img");
  const modalMealName = document.getElementById("modal-meal-name");
  const modalMealCalories = document.getElementById("modal-meal-calories");
  const modalMealProtien = document.getElementById("modal-meal-protien");
  const modalMealCarbs = document.getElementById("modal-meal-carbs");
  const modalMealFat = document.getElementById("modal-meal-fat");
  const cancelLogBtn = document.getElementById("cancel-log-btn");
  modal.classList.remove("hidden");
  modalImage.setAttribute("src", item.itemThumbnail);
  modalMealName.innerText = item.itemName;
  modalMealCalories.innerText = item.mealMacros.calories;
  modalMealProtien.innerText = item.mealMacros.protein;
  modalMealCarbs.innerText = item.mealMacros.carbs;
  modalMealFat.innerText = item.mealMacros.fat;

  logMealBtn.addEventListener("click", function () {
    modal.classList.add("hidden");
    item.quantity = Number(currentServing.innerText);
    item.loggedFrom = "Recipe";
    logItem(item, new Date());
    Swal.fire({
      title: "Meal Logged!",
      text: `${item.name}(${item.quantity}serving)has been added to you daily log.`,
      html: `
        <p class="text-emerald-600 font-medium">+${item.mealMacros.calories * item.quantity}calories</p>
  `,
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
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
async function displayProductCategorys() {
  const res = await fetch(`${baseURL}/products/categories`);
  const data = await res.json();
  const categories = data.results;
  for (let i = 0; i < 10; i++) {
    const btn = document.createElement("button");
    btn.className = `product-category-btn px-4 py-2 bg-gradient-to-br border ${ProductCategoryStyles[categories[i].id].style} text-gray-700 rounded-lg text-sm font-medium whitespace-nowrap   transition-all`;
    btn.setAttribute("target-category-id", categories[i].id);
    const icon = document.createElement("i");
    icon.className = `fa-solid ${ProductCategoryStyles[categories[i].id].icon}  mr-1.5`;
    btn.append(icon, categories[i].name);
    productCategories.append(btn);
  }
}
async function getProductByBarCode(barcode) {
  const res = await fetch(`${baseURL}/products/barcode/${barcode}`);
  const data = await res.json();
  currentProducts = [data.result];

  return data.result;
}
async function getProductByName(productName) {
  const res = await fetch(
    `${baseURL}/products/search?q=${productName}&page=1&limit=24`,
  );
  const data = await res.json();
  currentProducts = data.results;

  return data.results;
}
async function getProductByCategory(categoryName) {
  const res = await fetch(`${baseURL}/products/category/${categoryName}`);
  const data = await res.json();
  currentProducts = data.results;

  return data.results;
}
function filterProductByNutritionGrade(grade) {
  console.log(currentProducts, grade);
  if (grade === "") {
    displayProducts(currentProducts);
    return;
  }
  const filteredProducts = [];
  for (let i = 0; i < currentProducts.length; i++) {
    if (currentProducts[i].nutritionGrade === grade) {
      filteredProducts.push(currentProducts[i]);
    }
  }

  displayProducts(filteredProducts);
}
function displayProducts(products) {
  if (!(products.length > 0)) {
    productsGrid.className = "grid grid-cols-1 ";

    productsGrid.innerHTML = `
<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-box-open text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No products to display</p>
    <p class="text-gray-400 text-sm mt-2">Search for a product or browse by category</p>
</div>
    `;
    return;
  }
  productsGrid.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    productsGrid.className =
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5";

    const card = document.createElement("div");
    card.className =
      "product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group";
    card.setAttribute("data-barcode", products[i].barcode);

    const imgContainer = document.createElement("div");
    imgContainer.className =
      "relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden";

    const img = document.createElement("img");
    img.className =
      "w-full h-full object-contain group-hover:scale-110 transition-transform duration-300";
    img.src = products[i].image;
    img.alt = products[i].name;
    img.loading = "lazy";

    const nutriBadge = document.createElement("div");
    nutriBadge.className = `absolute top-2 left-2 ${nutriScoreColors[products[i].nutritionGrade] ?? "bg-gray-400"} text-white text-xs font-bold px-2 py-1 rounded uppercase`;
    nutriBadge.textContent = `Nutri-Score ${products[i].nutritionGrade}`;

    const novaBadge = document.createElement("div");
    novaBadge.style.backgroundColor = novaColors[products[i].novaGroup];

    novaBadge.className = `absolute top-2 right-2  text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center`;
    novaBadge.title = `NOVA ${products[i].novaGroup}`;
    novaBadge.textContent = products[i].novaGroup;

    imgContainer.append(img, nutriBadge, novaBadge);

    const body = document.createElement("div");
    body.className = "p-4";

    const brandEl = document.createElement("p");
    brandEl.className = "text-xs text-emerald-600 font-semibold mb-1 truncate";
    brandEl.textContent = products[i].brand;

    const nameEl = document.createElement("h3");
    nameEl.className =
      "font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors";
    nameEl.textContent = products[i].name;

    const meta = document.createElement("div");
    meta.className = "flex items-center gap-3 text-xs text-gray-500 mb-3";
    meta.innerHTML = `
    <span><i class="fa-solid fa-fire mr-1"></i>${products[i].nutrients.calories.toFixed(1)} kcal/100g</span>
  `;
    const macros = document.createElement("div");
    macros.className = "grid grid-cols-4 gap-1 text-center";
    [
      {
        val: products[i].nutrients.protein.toFixed(1),
        label: "Protein",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
      },
      {
        val: products[i].nutrients.carbs.toFixed(1),
        label: "Carbs",
        bg: "bg-blue-50",
        text: "text-blue-700",
      },
      {
        val: products[i].nutrients.fat.toFixed(1),
        label: "Fat",
        bg: "bg-purple-50",
        text: "text-purple-700",
      },
      {
        val: products[i].nutrients.sugar.toFixed(1),
        label: "Sugar",
        bg: "bg-orange-50",
        text: "text-orange-700",
      },
    ].forEach(({ val, label, bg, text }) => {
      const cell = document.createElement("div");
      cell.className = `${bg} rounded p-1.5`;
      const valEl = document.createElement("p");
      valEl.className = `text-xs font-bold ${text}`;
      valEl.textContent = val;
      const labelEl = document.createElement("p");
      labelEl.className = "text-[10px] text-gray-500";
      labelEl.textContent = label;
      cell.append(valEl, labelEl);
      macros.append(cell);
    });

    body.append(brandEl, nameEl, meta, macros);
    card.append(imgContainer, body);
    productsGrid.append(card);
  }
}

function displayProductModal(replace) {
  const productModalImage = document.getElementById("product-modal-img");
  const productModalBrand = document.getElementById("modal-brand");
  const productModalName = document.getElementById("modal-name");
  const productModalNutriGrade = document.getElementById("modal-nutri");
  const productModalNovagroup = document.getElementById("modal-nova");

  const productModalNutriGradeDiv = document.getElementById("nutriScoreDiv");
  const productModalNovagroupDiv = document.getElementById("novaScoreDiv");
  const productModalCalories = document.getElementById("modal-calories");
  const productModalProtien = document.getElementById("modal-protein");
  const productModalCarbs = document.getElementById("modal-carbs");
  const productModalFat = document.getElementById("modal-fat");
  const productModalSugar = document.getElementById("modal-sugar");
  const productModalFiber = document.getElementById("modal-fiber");
  const productModalSodium = document.getElementById("modal-sodium");
  productModal.classList.remove("hidden");
  productModalImage.setAttribute("src", replace.image);
  productModalImage.setAttribute("alt", replace.name);
  productModalBrand.innerText = replace.brand;
  productModalName.innerText = replace.name;
  productModalNutriGrade.innerText = replace.nutritionGrade;
  productModalNutriGrade.classList.add(
    nutriScoreColors[replace.nutritionGrade],
  );
  productModalNovagroup.innerText = replace.novaGroup;
  productModalNovagroup.style.backgroundColor = novaColors[replace.novaGroup];
  productModalNutriGradeDiv.style.backgroundColor =
    nutriScoreColorsLight[replace.nutritionGrade];
  productModalNovagroupDiv.style.backgroundColor =
    novaColorsLight[replace.novaGroup];
  if (replace.novaGroup === "unknown") {
    productModalNovagroupDiv.classList.add("hidden");
  }
  productModalCalories.innerText = replace.nutrients.calories.toFixed(1);
  productModalProtien.innerText = replace.nutrients.protein.toFixed(1);
  productModalCarbs.innerText = replace.nutrients.carbs.toFixed(1);
  productModalFat.innerText = replace.nutrients.fat.toFixed(1);
  productModalSugar.innerText = replace.nutrients.sugar.toFixed(1);
  productModalFiber.innerText = replace.nutrients.fiber.toFixed(1);
  productModalSodium.innerText = replace.nutrients.sodium.toFixed(1);
  replace.nutrients.saturatedFat = 0;
  const percentageMacros = calcMacrosPercentage(replace.nutrients);

  addProductLogModal.addEventListener("click", function () {
    productModal.classList.add("hidden");

    const item = {
      itemName: replace.name,
      itemThumbnail: replace.image,

      mealMacros: replace.nutrients,
      percentageMacros: percentageMacros,
    };
    item.quantity = 1;
    item.loggedFrom = "Product";

    logItem(item, new Date());
    Swal.fire({
      title: "Meal Logged!",
      text: `${item.name}(${item.quantity}serving)has been added to you daily log.`,
      html: `
        <p class="text-emerald-600 font-medium">+${item.mealMacros.calories * item.quantity}calories</p>
  `,
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  });
}

function logItem(item, date) {
  logedStat.totalLogCalaroies += item.mealMacros.calories * item.quantity;
  logedStat.totalLogProtien += item.mealMacros.protein * item.quantity;
  logedStat.totalLogCarbs += item.mealMacros.carbs * item.quantity;
  logedStat.totalLogFat += item.mealMacros.fat * item.quantity;

  logedStat.totalLogCalaroiesP += item.mealMacros.calories * item.quantity;
  logedStat.totalLogProtienP += item.percentageMacros.protein * item.quantity;
  logedStat.totalLogCarbsP += item.percentageMacros.carbs * item.quantity;
  logedStat.totalLogFatP += item.percentageMacros.fat * item.quantity;
  item.date = date;
  logedItems.push(item);
  itemsOfWeek.innerText = logedItems.length + " items";

  localStorage.setItem("logedItems", JSON.stringify(logedItems));
  localStorage.setItem("logedStat", JSON.stringify(logedStat));
  displayLogedItems();
}
function displayLogedItems() {
  const logedItemsList = document.getElementById("logged-items-list");
  logedItemsList.innerHTML = ``;
  caloriesSpan.innerText = logedStat.totalLogCalaroies;
  protienSpan.innerText = logedStat.totalLogProtien;
  carbsSpan.innerText = logedStat.totalLogCarbs;
  fatSpan.innerText = logedStat.totalLogFat;
  logedItemsCount.innerText = logedItems.length;
  if (logedItems.length == 0) {
    logedItemsList.innerHTML = `
                     <div
                  class="flex flex-col items-center justify-center py-10 gap-3"
                >
                  <div
                    class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <i class="fa-solid fa-utensils text-gray-300 text-2xl"></i>
                  </div>
                  <div class="text-center">
                    <p class="font-semibold text-gray-700">
                      No food logged today
                    </p>
                    <p class="text-sm text-gray-400 mt-1">
                      Start tracking your nutrition by logging meals or scanning
                      products
                    </p>
                  </div>
                  <div class="flex gap-3 mt-2">
                    <button id="browseToMeals"
                      class="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                    >
                      <i class="fa-solid fa-plus"></i> Browse Recipes
                    </button>
                    <button id="browseToscanProducts"
                      class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                    >
                      <i class="fa-solid fa-barcode"></i> Scan Product
                    </button>
                  </div>
                </div>
`;
    clearAllLogBtn.classList.add("hidden");

    const browseToMeals = document.getElementById("browseToMeals");

    browseToMeals.addEventListener("click", function () {
      history.pushState(null, "home", "home");

      currentNav.classList.add("text-gray-600", "hover:bg-gray-50");
      currentNav.classList.remove("bg-emerald-50", "text-emerald-700");
      currentNav.children[1].classList.remove("font-semibold");
      currentNav.children[1].classList.add("font-medium");
      currentSection.classList.add("hidden");

      currentSection = document.getElementById("Meals");
      currentNav = document.getElementById("Meals-Recipes");
      currentNav.classList.add("bg-emerald-50", "text-emerald-700");
      currentNav.classList.remove("text-gray-600", "hover:bg-gray-50");
      currentNav.children[1].classList.add("font-semibold");
      currentNav.children[1].classList.remove("font-medium");
      currentSection.classList.remove("hidden");
    });
    const browseToscanProducts = document.getElementById(
      "browseToscanProducts",
    );
    browseToscanProducts.addEventListener("click", function () {
      history.replaceState(null, null, "products");

      currentNav.classList.add("text-gray-600", "hover:bg-gray-50");
      currentNav.classList.remove("bg-emerald-50", "text-emerald-700");
      currentNav.children[1].classList.remove("font-semibold");
      currentNav.children[1].classList.add("font-medium");
      currentSection.classList.add("hidden");

      currentSection = document.getElementById("products-section");
      currentNav = document.getElementById("Product-Scanner");
      currentNav.classList.add("bg-emerald-50", "text-emerald-700");
      currentNav.classList.remove("text-gray-600", "hover:bg-gray-50");
      currentNav.children[1].classList.add("font-semibold");
      currentNav.children[1].classList.remove("font-medium");
      currentSection.classList.remove("hidden");
    });

    return;
  }
  for (let i = 0; i < logedItems.length; i++) {
    clearAllLogBtn.classList.remove("hidden");

    const item = document.createElement("div");
    item.className =
      "flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow";
    const img = document.createElement("img");
    img.src = logedItems[i].itemThumbnail;
    img.alt = logedItems[i].itemName;
    img.className = "w-14 h-14 rounded-lg object-cover flex-shrink-0";

    const info = document.createElement("div");
    info.className = "flex-1 min-w-0";

    const title = document.createElement("h3");
    title.className = "font-bold text-gray-900 text-sm truncate";
    title.textContent = logedItems[i].itemName;

    const meta = document.createElement("p");
    meta.className = "text-xs text-gray-400 mt-0.5";
    const recipeLink = document.createElement("span");
    recipeLink.className =
      "text-emerald-500 font-medium cursor-pointer hover:underline";
    recipeLink.textContent = logedItems[i].loggedFrom;
    recipeLink.classList.add(
      `${logedItems[i].loggedFrom == "Recipe" ? "text-emerald-600" : "text-blue-600"}`,
    );

    meta.append(`${logedItems[i].quantity} serving • `, recipeLink);

    const timeEl = document.createElement("p");
    timeEl.className = "text-xs text-gray-400 mt-0.5";
    timeEl.textContent = logedItems[i].date;

    info.append(title, meta, timeEl);

    const nutrition = document.createElement("div");
    nutrition.className = "flex items-center gap-4 flex-shrink-0";

    const kcalBlock = document.createElement("div");
    kcalBlock.className = "text-right";
    const kcalVal = document.createElement("span");
    kcalVal.className = "text-2xl font-bold text-emerald-500";
    kcalVal.textContent =
      logedItems[i].mealMacros.calories * logedItems[i].quantity;
    const kcalLabel = document.createElement("p");
    kcalLabel.className = "text-xs text-gray-400";
    kcalLabel.textContent = "kcal";
    kcalBlock.append(kcalVal, kcalLabel);

    const macros = document.createElement("div");
    macros.className = "flex gap-3 text-xs text-gray-400";
    [
      {
        val: logedItems[i].mealMacros.protein * logedItems[i].quantity,
        label: "P",
      },
      {
        val: logedItems[i].mealMacros.carbs * logedItems[i].quantity,
        label: "C",
      },
      {
        val: logedItems[i].mealMacros.fat * logedItems[i].quantity,
        label: "F",
      },
    ].forEach(({ val, label }) => {
      const span = document.createElement("span");
      const bold = document.createElement("span");
      bold.className = "font-semibold text-gray-600";
      bold.textContent = `${val}g`;
      span.append(bold, ` ${label}`);
      macros.append(span);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className =
      "text-gray-400 hover:text-red-500 transition-colors p-1";
    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash text-sm";
    deleteBtn.append(trashIcon);

    nutrition.append(kcalBlock, macros, deleteBtn);
    item.append(img, info, nutrition);
    logedItemsList.append(item);
    deleteBtn.addEventListener("click", function () {
      deleteFromLogs(i);
    });
  }
}

function deleteFromLogs(index) {
  logedStat.totalLogCalaroies -=
    logedItems[index].mealMacros.calories * logedItems[index].quantity;
  logedStat.totalLogProtien -=
    logedItems[index].mealMacros.protein * logedItems[index].quantity;
  logedStat.totalLogCarbs -=
    logedItems[index].mealMacros.carbs * logedItems[index].quantity;
  logedStat.totalLogFat -=
    logedItems[index].mealMacros.fat * logedItems[index].quantity;

  logedStat.totalLogCalaroiesP -=
    logedItems[index].mealMacros.calories * logedItems[index].quantity;
  logedStat.totalLogProtienP -=
    logedItems[index].percentageMacros.protein * logedItems[index].quantity;
  logedStat.totalLogCarbsP -=
    logedItems[index].percentageMacros.carbs * logedItems[index].quantity;
  logedStat.totalLogFatP -=
    logedItems[index].percentageMacros.fat * logedItems[index].quantity;

  logedItems.splice(index, 1);
  localStorage.setItem("logedItems", JSON.stringify(logedItems));
  localStorage.setItem("logedStat", JSON.stringify(logedStat));
  displayLogedItems();
}
function clearAllLogs() {
  Swal.fire({
    title: "Clear Today's Log?",
    text: "This will remove all logged food items for today.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#EF4444",
    cancelButtonColor: "#6B7280",
    confirmButtonText: "Yes, clear it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Cleared!",
        text: "Your food log has been cleared.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      logedItems = [];
      logedStat = {
        totalLogCalaroies: 0,
        totalLogProtien: 0,
        totalLogCarbs: 0,
        totalLogFat: 0,
        totalLogCalaroiesP: 0,
        totalLogProtienP: 0,
        totalLogCarbsP: 0,
        totalLogFatP: 0,
      };
      localStorage.removeItem("logedItems");
      localStorage.removeItem("logedStat");

      displayLogedItems();
    }
  });
}
await (async function () {
  loadingOverlay.classList.remove("loading");
  await getAllAreas();
  await getAllCategories();
  await getMeals();
  loadingOverlay.classList.add("loading");
  await displayProductCategorys();
})();
const recipeCards = document.querySelectorAll(".recipe-card");
let areaBtns = document.querySelectorAll(".areaBtn");
const categoryCards = document.querySelectorAll(".category-card");
const productCategoryBtns = document.querySelectorAll(".product-category-btn");

//&&&&&&&&&&&&&&&&&&&& start event listeners
navLinks.forEach((element) => {
  element.addEventListener("click", function (e) {
    currentNav.classList.add("text-gray-600", "hover:bg-gray-50");
    currentNav.classList.remove("bg-emerald-50", "text-emerald-700");
    currentNav.children[1].classList.remove("font-semibold");
    currentNav.children[1].classList.add("font-medium");
    currentSection.classList.add("hidden");
    currentNav = e.target.closest(".nav-link");
    currentSection = document.getElementById(
      currentNav.getAttribute("page-target"),
    );
    currentNav.classList.add("bg-emerald-50", "text-emerald-700");
    currentNav.classList.remove("text-gray-600", "hover:bg-gray-50");
    currentNav.children[1].classList.add("font-semibold");
    currentNav.children[1].classList.remove("font-medium");
    currentSection.classList.remove("hidden");
    if (currentNav.getAttribute("page-target") === "foodlog-section") {
      history.replaceState(null, null, "foodlog");
      displayLogedItems();
    } else if (currentNav.getAttribute("page-target") === "products-section") {
      history.replaceState(null, null, "products");
    } else history.pushState(null, "home", "home");
  });
});
searchInput.addEventListener("input", async function () {
  await searchMeal(searchInput.value);
});

currentBtnArea.addEventListener("click", await toggelAreaBtn);
currentBtnCategory.addEventListener("click", await toggleCategory);
areaBtns.forEach((element) => {
  element.addEventListener("click", toggelAreaBtn);
});
categoryCards.forEach((element) => {
  element.addEventListener("click", toggleCategory);
});
recipeCards.forEach((element) => {
  element.addEventListener("click", async function (e) {
    loadingOverlay.classList.remove("loading");
    await getMealDetails(e);
    loadingOverlay.classList.add("loading");
  });
});
toggleView.forEach((element) => {
  element.addEventListener("click", function (e) {
    currentDisplayView.classList.remove("bg-white", "rounded-md", "shadow-sm");
    currentDisplayView = e.currentTarget;
    currentDisplayView.classList.add("bg-white", "rounded-md", "shadow-sm");
    displayMeals();
  });
});
modalIncrement.addEventListener("click", function () {
  if (Number(currentServing.innerText) + 0.5 <= 10)
    currentServing.innerText = Number(currentServing.innerText) + 0.5;
});
modalDecrement.addEventListener("click", function () {
  if (Number(currentServing.innerText) - 0.5 >= 0.5) {
    currentServing.innerText = Number(currentServing.innerText) - 0.5;
  }
});
document.addEventListener("click", function (e) {
  if (
    (!modal.contains(e.target) && !e.target.closest("#modal-btn")) ||
    e.target.closest("#cancel-log-btn")
  ) {
    modal.classList.add("hidden");
  }
});
document.addEventListener("click", function (e) {
  if (
    (!productModal.contains(e.target) &&
      !e.target.closest("#add-product-log")) ||
    e.target.closest("#cancel-product-log")
  ) {
    productModal.classList.add("hidden");
  }
});
productsGrid.addEventListener("click", async function (e) {
  const card = e.target.closest(".product-card");
  if (!card) return;

  const barcode = card.getAttribute("data-barcode");
  const product = await getProductByBarCode(barcode);
  displayProductModal(product);
});
productSearchBtn.addEventListener("click", async function () {
  productsGrid.className = "grid grid-cols-1";
  productsGrid.innerHTML = `
<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
  `;
  const products = await getProductByName(productSearchInput.value);
  displayProducts(products);
  productSearchInput.value = "";
});
productBarcodeBtn.addEventListener("click", async function () {
  productsGrid.innerHTML = `
<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
  `;
  productsGrid.className = "grid grid-cols-1";

  const products = await getProductByBarCode(productBarcodeInput.value);
  displayProducts([products]);
  productBarcodeInput.value = "";
});
productCategoryBtns.forEach((element) => {
  element.addEventListener("click", async function (e) {
    productsGrid.innerHTML = `
<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
  `;
    productsGrid.className = "grid grid-cols-1";

    const products = await getProductByCategory(
      e.target
        .closest(".product-category-btn")
        .getAttribute("target-category-id"),
    );
    displayProducts(products);
  });
});
nutriScoreFilter.forEach((element) => {
  element.addEventListener("click", function (e) {
    filterProductByNutritionGrade(e.target.getAttribute("data-grade"));
  });
});
clearAllLogBtn.addEventListener("click", clearAllLogs);
