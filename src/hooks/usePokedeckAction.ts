import { useState } from "react";
import supabase from "@/config/supabase-client";
import { PostgrestError } from "@supabase/supabase-js";
import { Pokedeck } from "@/types";

const usePokedeckOperations = (initialData: Pokedeck[] | null = null) => {
  const [pokeDecks, setPokeDecks] = useState<Pokedeck[] | null>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchPokeDecks = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("pokedecks").select("*");
      if (error) {
        setFetchError("Failed to fetch Pokedecks !!");
        setPokeDecks(null);
        throw error;
      }
      setPokeDecks(data);
      setFetchError(null);
    } catch (error) {
      console.log(error as PostgrestError);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pokeDecks,
    isLoading,
    fetchError,
    fetchPokeDecks,
  };
};

export default usePokedeckOperations;