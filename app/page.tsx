"use client"
import RecipeFinder from "@/components/RecipeFinder";


type Obj = { [key: string]: any };

type PageProps = {
  searchParams: Obj;
}

function parseAlpha(alpha : string){
  const numAlpha = Number(alpha);
  if(numAlpha && numAlpha >= 0 && numAlpha <= 1) return numAlpha;
  return undefined;
}

export default function Page({ searchParams : { searchTerm, alpha } } : PageProps) {
  
  return (
    <div className="flex flex-col items-center overflow-x-hidden  text-indigo-950 ">
      <img src="/wave-haikei.svg" className="w-screen absolute top-0 -z-10 opacity-70"/>
      <div className="flex flex-col sm:w-3/4 px-5">
        <div className="text-5xl font-extrabold text-center mt-10">
            RecipeFinder
        </div>
        <div className="py-16">
          <div className="text-lg  px-20">
          Welcome to RecipeFinder, your ultimate cooking companion! Discover an extensive collection of delicious recipes from around the world, save your favorites, and share your culinary masterpieces with ease. Our user-friendly recipe feature diverse cuisines, clear ingredient lists, and step-by-step directions, ensuring you can cook with confidence and delight in every meal!
          </div>
        </div>

        <RecipeFinder initialSearchTerm={searchTerm} initialAlpha={parseAlpha(alpha)}/>
      </div>
    </div>
  );
}
