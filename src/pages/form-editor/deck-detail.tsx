import { Pokedeck } from "@/types";

type Props = {
  deckData: Pokedeck[] | Pokedeck | null;
  fetchError: string | null;
};
export default function DeckDetail({ deckData,fetchError }: Props) {
  
  
  if (fetchError) return <div>{fetchError}</div>;
  return <div>{JSON.stringify(deckData)}</div>;
}
