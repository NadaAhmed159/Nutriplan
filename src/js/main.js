const baseURL = "https://nutriplan-api.vercel.app/api";
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
  if (ingredient || cusine || (category && category !== "All")) {
    res = await fetch(
      `${baseURL}/meals/filter?ingredient=${ingredient ? ingredient : ""}&limit=25&category=${category !== undefined && category !== "All" ? category : ""}&area=${cusine ? cusine : ""}`,
    );
    console.log(
      `${baseURL}/meals/filter?ingredient=${ingredient ? ingredient : ""}&limit=25&category=${category !== undefined && category !== "All" ? category : ""}&area=${cusine ? cusine : ""}`,
    );
  } else {
    res = await fetch(`${baseURL}/meals/random?count=25`);
    console.log(`${baseURL}/meals/random?count=25`);
  }
  console.log(ingredient, category, cusine);
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

    //apply event listener to meal details
    recipesGrid.append(recipeCard);
  }
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
