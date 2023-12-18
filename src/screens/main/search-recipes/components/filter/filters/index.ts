const diet = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
];

const cuisines = [
  "Asian",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

const dishTypes = [
  "main course",
  "side dish",
  "dessert",
  "appetizer",
  "salad",
  "bread",
  "breakfast",
  "soup",
  "beverage",
  "sauce",
  "marinade",
  "fingerfood",
  "snack",
  "drink",
];

const difficulty = [
  "Under 1 hour",
  "Under 45 minutes",
  "Under 30 minutes",
  "Under 15 minutes",
];

const intolerances = [
  "Dairy",
  "Egg",
  "Gluten",
  "Grain",
  "Peanut",
  "Seafood",
  "Sesame",
  "Shellfish",
  "Soy",
  "Sulfite",
  "Tree Nut",
  "Wheat",
];

const calories = ["500", "550", "600", "650", "700"];

const searchFilterSectionData = [
  { key: "diet", data: diet },
  {
    key: "difficulty",
    data: difficulty,
  },
  {
    key: "caloriesUnder",
    data: calories,
  },
  { key: "cuisines", data: cuisines },
  { key: "dishTypes", data: dishTypes },
  {
    key: "intolerances",
    data: intolerances,
  },
];

const searchFilterSections = [
  { key: "diet", title: "Diet" },
  {
    key: "difficulty",
    title: "Difficulty",
  },
  {
    key: "caloriesUnder",
    title: "Calories Under",
  },
  { key: "cuisines", title: "Cuisines" },
  { key: "dishTypes", title: "Dish Types" },
  {
    key: "intolerances",
    title: "Intolerances",
  },
];

export { searchFilterSectionData, searchFilterSections };
