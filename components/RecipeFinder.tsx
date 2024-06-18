"use client";

import { findRecipesByArgument } from "@/actions";
import { useState, useTransition, useEffect } from "react";
import Recipe from "./Recipe";
import Skeleton from "./Skeleton";
import {
  BackspaceIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { examples } from "@/examples";
import Slider from "./Slider";

type RecipeFinderProps = {
  initialSearchTerm ?: string;
  initialAlpha ?: number;
}

export default function RecipeFinder({ initialSearchTerm, initialAlpha } : RecipeFinderProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm ?? "");
  const [recipes, setRecipes] = useState<Awaited<ReturnType<typeof findRecipesByArgument>>>([]);
  const [isPending, startTransition] = useTransition();
  const [alpha, setalpha] = useState(initialAlpha ?? 0.5);

  useEffect(() => {
    if(initialSearchTerm && initialAlpha)
      fetchResults();
  }, []);

  function fetchResults(){
    console.log("hello calling");
    if (searchTerm.length < 1) return;
    startTransition(async () => {
        const recipes = await findRecipesByArgument(searchTerm, alpha);
        setRecipes(recipes);
        history.replaceState(null, '', `/?searchTerm=${searchTerm}&alpha=${alpha}`)
    });
  } 

  return (
    <div className="mx-auto p-10 rounded-md">
      <div className="border-4 p-10 rounded-lg border-highlight/50">

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-row gap-2  flex-grow-0 w-auto  max-w-[900px] py-2  "
        >
          <input
            className="w-full  sm:font-serif sm:font-bold sm:text-3xl outline-none bg-transparent border-b-2 rounded-none sm:py-3 focus:border-highlight"
            type="text"
            placeholder="Lets eat!"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />

          <button
            className="  bg-black bg-opacity-10 h-10  self-end   hover:scale-105    py-2 px-4 rounded-full"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setRecipes([]);
              setSearchTerm("");
            }}
          >
            <BackspaceIcon className="h-5 w-5" />
          </button>

          <button
            type="submit"
            onClick={fetchResults}
            className={` ${
              isPending ? "animate-pulse" : ""
            } transition-all bg-gradient-to-br h-10  self-end   hover:scale-105   bg-highlight py-2 px-4 rounded-full`}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </form>

        <Slider value={alpha} setValue={setalpha} />
      </div>

      {isPending ? (
        <Skeleton times={5} />
      ) : (
        <div>
          {recipes.length > 0 ? (
            <div className="flex flex-row items-center justify-between max-w-[750px] py-5">
              <div className="uppercase text-sm">
                {recipes.length} results
              </div>
              <div>

              </div>
            </div>
          ) : (
            <div className="py-5">
              <div className="uppercase text-sm ">Example Arguments</div>
              <div className="flex flex-col gap-1 py-2">
                {examples.map((example, index) => (
                  <div
                    key={index}
                    onClick={() => setSearchTerm(example)}
                    className="group cursor-pointer relative shrink-0 self-start z-10"
                  >
                    {example}
                    <div className="absolute inset-x-0 bottom-0 h-2 group-hover:h-6  transition-all bg-highlight -z-10"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col items-center space-y-10">
            {recipes.map((recipe, index) => (
              <Recipe
                key={index}
                {...recipe}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
