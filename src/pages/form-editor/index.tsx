import Container from "@/components/ui/container";
import { useParams } from "react-router-dom";
import DeckDetail from "./deck-detail";
import usePokedeckOperations from "@/hooks/usePokedeckAction";
import { useEffect } from "react";
import DeckForm from "./deck-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Loading from "@/components/ui/loading";

export default function FormEditor() {
  const { slug } = useParams();
  const isCreateDeck = slug === "create";

  const { data, getDetailPokeDeck, isLoading, fetchError } =
    usePokedeckOperations();

  useEffect(() => {
    if (!isCreateDeck) {
      getDetailPokeDeck(Number(slug));
    }
  }, [slug, isCreateDeck]);

  if (isCreateDeck) {
    return (
      <Container className="flex flex-col justify-center items-center">
        <h1 className="m-6">Create Pokedeck</h1>
        <DeckForm deckData={null} isCreateDeck={isCreateDeck} />
      </Container>
    );
  }

  if (fetchError)
    return (
      <Alert variant="destructive" className="max-w-md mx-auto my-4">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{fetchError}</AlertDescription>
      </Alert>
    );

  if (isLoading) return <Loading />;

  return (
    <Container>
      <h1>Detail Pokedeck</h1>
      <div className="flex gap-6 flex-col lg:flex-row">
        <DeckDetail deckData={data} fetchError={fetchError} />
        <DeckForm deckData={data} isCreateDeck={isCreateDeck} />
      </div>
    </Container>
  );
}
