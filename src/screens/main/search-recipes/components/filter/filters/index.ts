const diet = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "High-Protein",
  "High-Fiber",
];

const cuisines = [
  "American",
  "Asian",
  "Barbecue",
  "British",
  "Brazilian",
  "Bulgogi",
  "Chinese",
  "Cajun & Creole",
  "Central Europe",
  "Cuban",
  "Caribbean",
  "Eastern Europe",
  "French",
  "Filipino",
  "Greek",
  "German",
  "Hawaiian",
  "Hungarian",
  "Irish",
  "Indian",
  "South East Asian",
  "Jamaican",
  "Korean",
  "Kosher",
  "Kimchi",
  "Mexican",
  "Mediterranean",
  "Middle Eastern",
  "Moroccan",
  "Nordic",
  "Portuguese",
  "Spanish",
  "Swedish",
  "Thai",
  "Turkish",
  "Vietnamese",
];

const dishTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];

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
