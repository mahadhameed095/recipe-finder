"use client"
import { RecipeType } from "@/types";
import {
  ListBulletIcon,
  BeakerIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { WeaviateGenericObject } from "weaviate-client";

export default function Recipe(recipe : WeaviateGenericObject<RecipeType>) {
    return (
    <>
      <Link className=" " href={`/recipe/${recipe.properties.title}`}>
        <div className="flex justify-between items-center hover:outline-highlight hover:outline-2 hover:outline-dashed  relative max-h-[300px] rounded-md shadow-md w-[400px] overflow-hidden px-10 py-6">
          <div className="space-y-4">
            <h1 className="font-bold text-xl border-b-4 border-highlight max-w-fit">{recipe.properties.title}</h1>
            <div className="flex space-x-2 items-center">
              <ListBulletIcon className="w-5 h-5"/>
              <p>{recipe.properties.directions.length} Steps</p>
              <BeakerIcon className="w-5 h-5"/>
              <p>{recipe.properties.ingredients.length} Ingredients</p>
            </div>
          </div>
          <div title="Relevancy Score" className=" w-20 h-20 rounded-full bg-highlight flex justify-center items-center">{recipe.metadata!.score!.toPrecision(3)}</div>
        </div>
      </Link>
    </>
    )
}


{/* <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-highlight/30 to-transparent pointer-events-none"></div> */}
