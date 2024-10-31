import { useEffect } from "react";
import Container from "@/components/ui/container";
import { Star ,MessageCircleHeart} from "lucide-react";

import usePokedeckOperations from "@/hooks/usePokedeckAction";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

function Homepage() {
  const { pokeDecks, isLoading, fetchPokeDecks, fetchError } =
    usePokedeckOperations();

  useEffect(() => {
    fetchPokeDecks();
  }, []);

  if (isLoading) return <p className="text-center text-xl text-blue-600 my-8">Loading...</p>;

  if (fetchError) return <p className="text-center text-xl text-red-600 my-8">{fetchError}</p>;

  return (
    <Container className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Home page</h1>
      {pokeDecks && (
        <ul className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pokeDecks.map((pokeDeck) => (
            <li key={pokeDeck.id} className="cursor-pointer">
              <Card className="w-[300px] overflow-hidden bg-yellow-100 border-4 border-blue-500">
                <CardContent className="p-4">
                  <CardTitle className="text-2xl font-bold text-blue-600">
                    {pokeDeck.name}
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {pokeDeck.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4 bg-blue-500">
                  <MessageCircleHeart className="w-6 h-6 fill-white"/>
                  <div className="flex">
                    {Array.from({ length: pokeDeck.rating }).map((_, index) => (
                      <Star
                        key={index}
                        className="w-6 h-6 fill-yellow-300 text-yellow-300"
                      />
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default Homepage;
