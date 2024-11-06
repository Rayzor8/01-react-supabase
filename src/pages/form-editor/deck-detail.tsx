import { Pokedeck } from "@/types";
import { Star } from "lucide-react";

type Props = {
  deckData: Pokedeck[] | Pokedeck | null;
  fetchError: string | null;
};
export default function DeckDetail({ deckData, fetchError }: Props) {
  if (Array.isArray(deckData)) return null;
  if (fetchError) return <h1>{fetchError}</h1>;

  return (
    <div className="max-w-lg flex flex-col gap-4 bg-slate-300 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold">{deckData?.name}</h1>
      <p className="text-lg">{deckData?.description}</p>
      <div className="flex gap-2 bg-blue-600 w-max p-1 rounded-md">
        {deckData?.rating &&
          Array.from({ length: deckData.rating }).map((_, index) => (
            <Star
              key={index}
              className="w-6 h-6 fill-yellow-300 text-yellow-300"
            />
          ))}
        <span className="sr-only"> rating :{deckData?.rating}</span>  
      </div>
    </div>
  );
}
