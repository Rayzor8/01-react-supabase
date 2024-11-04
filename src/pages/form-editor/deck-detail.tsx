import { Pokedeck } from "@/types";

type Props = {
  deckData: Pokedeck[] | Pokedeck | null;
  fetchError: string | null;
};
export default function DeckDetail({ deckData, fetchError }: Props) {
  
  if(Array.isArray(deckData)) return null
  if (fetchError) return <h1>{fetchError}</h1>;

  return <div className="max-w-lg">
    <p>{deckData?.description}</p>
  </div>;
}
