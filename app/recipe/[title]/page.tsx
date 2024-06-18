import { findRecipeByTitle } from "@/actions"

export default async function Page({ params }: { params: { title: string } }) {
    const title = decodeURI(params.title);

    const recipe = await findRecipeByTitle(title);

    return (
        <>
            <div className="relative mx-auto max-w-[800px] max-h-[650px] overflow-y-auto outline-highlight outline-dashed outline-2  rounded-lg shadow-lg mt-10 p-10 space-y-5">
                <h1 className="font-bold border-b-4 border-highlight max-w-fit text-3xl">{recipe.properties.title}</h1>
                <img src={'/food.png'} className="absolute right-10 top-0 w-[150px] aspect-square"/>
                

                <div className="space-y-3">
                    <h2 className=" font-semibold text-xl border-b-2 border-highlight border-dashed max-w-fit">Ingredients</h2>
                    <ul className=" list-disc list-inside space-y-2 overflow-hidden">
                        {recipe.properties.ingredients.map((ingredient, index) =>          
                            <li key={index}>{ingredient}</li>
                        )}
                    </ul>
                </div>

                <div className="space-y-3">
                    <h2 className="font-semibold text-xl border-b-2 border-highlight border-dashed max-w-fit">Steps</h2>
                    <ol className="list-decimal list-inside space-y-2 overflow-hidden">
                        {recipe.properties.directions.map((step, index) =>          
                            <li key={index}>{step}</li>
                        )}
                    </ol>
                </div>
            </div>
        </>
    )

}