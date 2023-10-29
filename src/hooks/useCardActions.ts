import { useState } from "react";
import { ICards } from "../types/Card";

interface IUseCardActionsProps {
  cards: ICards;
  setCards: React.Dispatch<React.SetStateAction<ICards>>;
  initialCards: ICards;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setClosedCards: React.Dispatch<React.SetStateAction<string[]>>;
}

const useCardActions = (props: IUseCardActionsProps) => {
  const { cards, setCards, initialCards, setPageNumber, setClosedCards } =
    props;
  const [deletionCardNumber, setDeletionCardNumber] = useState<number>(1);

  const handleCloseCard = (image: string) => {
    setTimeout(() => {
      const updatedCards = cards.filter((card) => card.image !== image);
      setCards(updatedCards);
      setDeletionCardNumber((prev) => prev + 1);
      localStorage.setItem(deletionCardNumber.toString(), image);
    }, 300);
  };

  const handleResetCards = () => {
    localStorage.clear();
    setCards(initialCards);
    setClosedCards([]);
    setPageNumber(1);
  };

  return { handleCloseCard, handleResetCards };
};

export default useCardActions;
