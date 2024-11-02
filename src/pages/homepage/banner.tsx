import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <header className="w-full bg-gradient-to-r from-yellow-400 to-blue-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
          Welcome to My Pokedecks
        </h1>
        <h2 className="mt-3 text-xl text-gray-100 sm:mt-4">
          Discover amazing pokemon decks
        </h2>
        <Button asChild className="mt-4 bg-blue-600 hover:bg-blue-700">
          <Link to="/form/create">Create Deck</Link>
        </Button>
      </div>
    </header>
  );
}
