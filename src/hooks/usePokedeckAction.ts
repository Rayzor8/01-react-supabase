import { useState } from "react";
import supabase from "@/config/supabase-client";
import { PostgrestError } from "@supabase/supabase-js";
import { Pokedeck } from "@/types";

const usePokedeckOperations = () => {
  const [data, setData] = useState<Pokedeck[] | Pokedeck | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchPokeDecks = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("pokedecks").select("*");
      if (error) {
        setFetchError("Failed to fetch Pokedecks !!");
        setData(null);
        throw error;
      }
      setData(data);
      setFetchError(null);
    } catch (error) {
      console.log(error as PostgrestError);
    } finally {
      setIsLoading(false);
    }
  };

  const getDetailPokeDeck = async (id: number) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("pokedecks")
        .select("*")
        .eq("id", id);

      if (error) {
        setFetchError("Failed to fetch Pokedecks !!");
        setData(null);
        throw error;
      }

      if (data.length === 0) {
        setFetchError("Pokedeck not found !!");
        setData(null);
        throw new Error("Pokedeck not found !!");
      }

      setData(data);
      setFetchError(null);
    } catch (error) {
      console.log(error as PostgrestError);
    } finally {
      setIsLoading(false);
    }
  };

  const addPokedeck = async (pokedeck: Pokedeck) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.from("pokedecks").insert([pokedeck]);
      if (error) {
        setFetchError("Failed to add Pokedeck !!");
        throw error;
      }
      setFetchError(null);
    } catch (error) {
      console.log(error as PostgrestError);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    fetchError,
    fetchPokeDecks,
    getDetailPokeDeck,
    addPokedeck,
  };
};

export default usePokedeckOperations;
