import { useEffect, useState } from "react";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertCircle, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pokedeck } from "@/types";

const pokeDeckSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be 50 characters or less"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be 500 characters or less"),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(10, "Rating must be at most 10"),
});

type DeckFormProps = {
  deckData: Pokedeck | Pokedeck[] | null;
  isCreateDeck: boolean;
};
type PokeDeckFormData = z.infer<typeof pokeDeckSchema>;

export default function DeckForm({ deckData, isCreateDeck }: DeckFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(1);
  const [errors, setErrors] = useState<Partial<PokeDeckFormData>>({});

  useEffect(() => {
    if (deckData && !Array.isArray(deckData)) {
      setName(deckData.name);
      setDescription(deckData.description);
      setRating(deckData.rating);
    }
  }, [deckData]);

  const onClearInput = (inputName: "name" | "description") => {
    if (inputName === "name") {
      setName("");
    } else {
      setDescription("");
    }
    setErrors((prev) => ({ ...prev, [inputName]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData: PokeDeckFormData = { name, description, rating };

    try {
      pokeDeckSchema.parse(formData);
      setName("");
      setDescription("");
      setRating(0);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.formErrors.fieldErrors);
      }
    }
  };

  return (
    <Card className="w-full max-w-md  mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-yellow-400 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">
          {isCreateDeck ? "Create" : "Edit"} Pokemon
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Deck Name
            </Label>
            <div className="relative">
              <Input
                id="name"
                placeholder="Enter deck name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={cn(
                  "transition-all duration-300",
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-purple-500"
                )}
              />
              {name && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => onClearInput("name")}
                >
                  <CircleX className="h-4 w-4" />
                  <span className="sr-only">Clear name</span>
                </Button>
              )}
            </div>
            {errors.name && (
              <p className="text-sm text-red-500 flex items-center mt-1">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </Label>
            <div className="relative">
              <Textarea
                id="description"
                maxLength={500}
                rows={7}
                placeholder="Enter deck description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={cn(
                  "transition-all duration-300",
                  errors.description
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-purple-500"
                )}
              />

              {description && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0  px-3 py-2 hover:bg-transparent"
                  onClick={() => onClearInput("description")}
                >
                  <CircleX className="h-4 w-4" />
                  <span className="sr-only">Clear Description</span>
                </Button>
              )}
            </div>
            {errors.description && (
              <p className="text-sm text-red-500 flex items-center mt-1">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.description}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="rating"
              className="text-sm font-medium text-gray-700"
            >
              Rating (1-10)
            </Label>
            <Input
              id="rating"
              type="number"
              min={1}
              max={10}
              value={rating || ""}
              onChange={(e) => setRating(Number(e.target.value))}
              className={cn(
                "transition-all duration-300",
                errors.rating
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              )}
            />
            {errors.rating && (
              <p className="text-sm text-red-500 flex items-center mt-1">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.rating}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md  transition-all duration-300"
          >
            Submit Poke Deck
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
