import Container from "@/components/ui/container";
import { useParams } from "react-router-dom";
import DeckDetail from "./deck-detail";
import usePokedeckOperations from "@/hooks/usePokedeckAction";
import { useEffect } from "react";

export default function FormEditor() {
  const { slug } = useParams();
  const isCreateDeck = slug === "create";

  const { data, getDetailPokeDeck,isLoading,fetchError } = usePokedeckOperations();


  useEffect(() => {
    if (!isCreateDeck) {
      getDetailPokeDeck(Number(slug));
    }
  }, [slug, isCreateDeck]);

  if (isCreateDeck) {
    return (
      <Container>
        <h1>Create Pokedeck</h1>
        <form></form>
      </Container>
    );
  }

  if(isLoading) return <p className="text-center text-xl text-blue-600 my-8">Loading...</p>;

  return (
    <Container>
      <h1>Detail Pokedeck</h1>
      <DeckDetail deckData={data} fetchError={fetchError} />
    </Container>
  );
}
