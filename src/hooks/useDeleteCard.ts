import { useState } from "react";
import { ICards } from "../types/Card";

interface IUseDeleteCardProps {
  cards: ICards;
  setCards: React.Dispatch<React.SetStateAction<ICards>>;
}

const useDeleteCard = (props: IUseDeleteCardProps) => {
  const { cards, setCards } = props;

  const [deletionCardNumber, setDeletionCardNumber] = useState<number>(1);

  const handleCloseCard = (image: string) => {
    const updatedCards = cards.filter((card) => card.image !== image);
    setCards(updatedCards);
    setDeletionCardNumber((prev) => prev + 1);
    localStorage.setItem(deletionCardNumber.toString(), image);
  };
  return {
    handleCloseCard,
  };
};

export default useDeleteCard;
