import { useEffect } from "react";
import Container from "@/components/ui/container";
import usePokedeckOperations from "@/hooks/usePokedeckAction";
import CardDeck from "./card-deck";
import Banner from "./banner";

function Homepage() {
  const { data, isLoading, fetchPokeDecks, fetchError } =
    usePokedeckOperations();

  useEffect(() => {
    fetchPokeDecks();
  }, []);

  if (isLoading)
    return <p className="text-center text-xl text-blue-600 my-8">Loading...</p>;

  if (fetchError)
    return (
      <p className="text-center text-xl text-red-600 my-8">{fetchError}</p>
    );

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
