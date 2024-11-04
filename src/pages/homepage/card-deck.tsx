import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Pokedeck } from "@/types";
import { BadgePlus, Star, CircleX } from "lucide-react";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function CardDeck({ pokeDeck }: { pokeDeck: Pokedeck }) {
  const navigate = useNavigate();

  const onDetail = (id: number) => {
    navigate(`/form/${id}`);
  };

  const onDelete = (e: MouseEvent, id: number) => {
    e.stopPropagation();
    alert(id);
  };

  return (
    <Card
      className=" bg-yellow-100 border-4 border-blue-500 cursor-pointer relative"
      onClick={() => onDetail(pokeDeck.id)}
    >
      <button onClick={(e) => onDelete(e, pokeDeck.id)}>
        <CircleX className="absolute -top-3 -right-3 rounded-full shadow-lg hover:shadow-xl transition-shadow  text-red-500 fill-white hover:text-red-600" />
        <span className="sr-only">Close</span>
      </button>

      <CardContent className="p-4">
        <CardTitle className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <BadgePlus className="w-4 h-4  text-gray-500" />
              <i className="text-[13px] text-gray-500">
                {formatDate(pokeDeck.created_at)}
              </i>
            </div>
            {/* <div className="flex gap-1">
              <Button size="icon" onClick={(e) => onEdit(e, pokeDeck.id)}>
                <SquarePen />
              </Button>
            </div> */}
          </div>

          <p className="text-blue-600 text-2xl font-bold">{pokeDeck.name}</p>
        </CardTitle>
        <CardDescription className="mt-2 text-sm text-gray-600 line-clamp-3">
          {pokeDeck.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-start items-center p-4 bg-blue-500 gap-2">
        <div className="rounded-full bg-yellow-400 w-6 h-6 flex justify-center items-center font-bold text-blue-600">
          {pokeDeck.rating}
        </div>
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
  );
}
