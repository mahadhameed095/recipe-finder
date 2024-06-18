"use server";

import weaviate, { WeaviateClient } from "weaviate-client";
import { RecipeType } from "./types";

async function InstantiateClient(){
  const client = await weaviate.connectToWeaviateCloud(process.env.WCS_URL!!, {
      authCredentials: new weaviate.ApiKey(process.env.WCS_API_KEY!!),
      headers: {
        "X-Cohere-Api-Key": process.env.COHERE_APIKEY!!,
      },
    });
  return client;
}

async function GetRecipeReference(){
  const client = await InstantiateClient();
  return client.collections.get<RecipeType>("Recipe");
}

export async function findRecipesByArgument(searchTerm: string, alpha: number) {
  const Recipe = await GetRecipeReference();
  // Weaviate's hybrid search functionality to get top 20 most relevant recipes 
  const { objects : recipes } = await Recipe.query.hybrid(searchTerm, {
    limit: 20,
    alpha,
    returnMetadata: ["score"],
  });
  return recipes;
}

export async function findRecipeByTitle(title : string){
  const Recipe = await GetRecipeReference();
  const { objects } = await Recipe.query.fetchObjects({ filters : Recipe.filter.byProperty("title").equal(title)})
  if(objects.length === 0) throw `A recipe with title : ${title} was not found with in the database.`;
  return objects[0];
}

// export async function delay(ms : number){ 
//   return await (new Promise(res => setTimeout(res, ms)));
// }


// const recipes : RecipeType[]  = [
//   {
//     title: "Spaghetti Carbonara",
//     directions: [
//       "Cook spaghetti according to package instructions.",
//       "In a separate bowl, beat the eggs and grate the Parmesan cheese.",
//       "Cook pancetta until crispy.",
//       "Combine pasta, pancetta, egg mixture, and reserved pasta water.",
//       "Serve immediately with extra Parmesan."
//     ],
//     ingredients: [
//       "Spaghetti",
//       "Eggs",
//       "Parmesan cheese",
//       "Pancetta",
//       "Salt",
//       "Black pepper"
//     ]
//   },
//   {
//     title: "Chicken Curry",
//     directions: [
//       "Heat oil in a pot.",
//       "Sauté onions until golden brown.",
//       "Add ginger-garlic paste and cook for a few minutes.",
//       "Add chicken pieces and cook until browned.",
//       "Add tomatoes and spices, and cook until oil separates.",
//       "Add water and simmer until chicken is cooked through.",
//       "Garnish with cilantro and serve."
//     ],
//     ingredients: [
//       "Chicken",
//       "Onions",
//       "Ginger-garlic paste",
//       "Tomatoes",
//       "Curry powder",
//       "Cumin",
//       "Cilantro",
//       "Oil",
//       "Salt"
//     ]
//   },
//   {
//     title: "Vegetable Stir Fry",
//     directions: [
//       "Heat oil in a large skillet.",
//       "Add garlic and cook until fragrant.",
//       "Add mixed vegetables and cook until tender.",
//       "Stir in soy sauce and cook for another minute.",
//       "Serve hot with rice."
//     ],
//     ingredients: [
//       "Mixed vegetables",
//       "Garlic",
//       "Soy sauce",
//       "Oil",
//       "Salt",
//       "Pepper",
//       "Rice"
//     ]
//   },
//   {
//     title: "Beef Tacos",
//     directions: [
//       "Cook ground beef in a skillet until browned.",
//       "Add taco seasoning and water, and simmer until thickened.",
//       "Warm taco shells in the oven.",
//       "Assemble tacos with beef, lettuce, cheese, and salsa.",
//       "Serve immediately."
//     ],
//     ingredients: [
//       "Ground beef",
//       "Taco seasoning",
//       "Water",
//       "Taco shells",
//       "Lettuce",
//       "Cheddar cheese",
//       "Salsa"
//     ]
//   },
//   {
//     title: "Pancakes",
//     directions: [
//       "In a bowl, mix flour, sugar, baking powder, and salt.",
//       "In another bowl, whisk together milk, eggs, and melted butter.",
//       "Combine wet and dry ingredients, and mix until smooth.",
//       "Heat a non-stick skillet and pour batter to form pancakes.",
//       "Cook until bubbles form, then flip and cook until golden brown.",
//       "Serve with syrup and butter."
//     ],
//     ingredients: [
//       "Flour",
//       "Sugar",
//       "Baking powder",
//       "Salt",
//       "Milk",
//       "Eggs",
//       "Butter",
//       "Syrup"
//     ]
//   },
//   {
//     title: "Caesar Salad",
//     directions: [
//       "Chop romaine lettuce and place in a large bowl.",
//       "Prepare Caesar dressing by mixing garlic, lemon juice, Dijon mustard, and olive oil.",
//       "Toss lettuce with dressing, croutons, and Parmesan cheese.",
//       "Serve immediately."
//     ],
//     ingredients: [
//       "Romaine lettuce",
//       "Garlic",
//       "Lemon juice",
//       "Dijon mustard",
//       "Olive oil",
//       "Croutons",
//       "Parmesan cheese",
//       "Salt",
//       "Pepper"
//     ]
//   },
//   {
//     title: "Grilled Cheese Sandwich",
//     directions: [
//       "Butter one side of each bread slice.",
//       "Place cheese slices between the bread, buttered side out.",
//       "Heat a skillet over medium heat and cook sandwich until golden brown on both sides.",
//       "Serve immediately."
//     ],
//     ingredients: [
//       "Bread",
//       "Butter",
//       "Cheese slices"
//     ]
//   },
//   {
//     title: "Tomato Soup",
//     directions: [
//       "Heat oil in a pot and sauté onions until translucent.",
//       "Add garlic and cook for another minute.",
//       "Add tomatoes and cook until they break down.",
//       "Blend the mixture until smooth.",
//       "Add vegetable broth and simmer for 15 minutes.",
//       "Season with salt and pepper.",
//       "Serve hot with a dollop of cream."
//     ],
//     ingredients: [
//       "Tomatoes",
//       "Onions",
//       "Garlic",
//       "Vegetable broth",
//       "Olive oil",
//       "Salt",
//       "Pepper",
//       "Cream"
//     ]
//   },
//   {
//     title: "Chocolate Chip Cookies",
//     directions: [
//       "Preheat oven to 350°F (175°C).",
//       "Cream together butter and sugar until smooth.",
//       "Beat in eggs one at a time, then stir in vanilla.",
//       "Combine flour, baking soda, and salt, and gradually add to the creamed mixture.",
//       "Stir in chocolate chips.",
//       "Drop by spoonfuls onto ungreased baking sheets.",
//       "Bake for 10-12 minutes or until edges are golden brown.",
//       "Cool on wire racks."
//     ],
//     ingredients: [
//       "Butter",
//       "Sugar",
//       "Brown sugar",
//       "Eggs",
//       "Vanilla extract",
//       "Flour",
//       "Baking soda",
//       "Salt",
//       "Chocolate chips"
//     ]
//   },
//   {
//     title: "Guacamole",
//     directions: [
//       "Mash avocados in a bowl.",
//       "Add lime juice, salt, and pepper.",
//       "Mix in chopped onions, tomatoes, cilantro, and jalapeño.",
//       "Serve immediately with tortilla chips."
//     ],
//     ingredients: [
//       "Avocados",
//       "Lime juice",
//       "Salt",
//       "Pepper",
//       "Onions",
//       "Tomatoes",
//       "Cilantro",
//       "Jalapeño",
//       "Tortilla chips"
//     ]
//   }
// ]

// function weaviateRecipeWrapper(recipe : RecipeType) : WeaviateGenericObject<RecipeType>{
//   return ({
//     metadata : { score : Math.random()},
//     properties : recipe,
//     references : undefined,
//     uuid : "",
//     vectors : {}
//   })
// }

// export async function findRecipesByArgument(searchTerm: string, alpha: number){

  
//   // await delay(3000);
//   return recipes.map(weaviateRecipeWrapper);;
// }

// export async function findRecipeByTitle(title : string){
//   const recipe = recipes.find(item => item.title === title);

//   if(!recipe) throw `A recipe with title : ${title} was not found with in the database.`;

//   return weaviateRecipeWrapper(recipe);
// }