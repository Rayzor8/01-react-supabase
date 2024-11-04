import { useEffect } from "react";
import Container from "@/components/ui/container";
import usePokedeckOperations from "@/hooks/usePokedeckAction";
import CardDeck from "./card-deck";
import Banner from "./banner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Loading from "@/components/ui/loading";

function Homepage() {
  const { data, isLoading, fetchPokeDecks, fetchError } =
    usePokedeckOperations();

  useEffect(() => {
    fetchPokeDecks();
  }, []);

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
    <main>
      <Banner />
      <Container className="mt-8">
        {Array.isArray(data) && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((pokeDeck) => (
              <li key={pokeDeck.id}>
                <CardDeck pokeDeck={pokeDeck} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}

export default Homepage;
