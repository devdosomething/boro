import { useState } from "react";
import { ICards } from "../types/Card";

interface IUseFilterCardsProps {
  cards: ICards;
  setCards: React.Dispatch<React.SetStateAction<ICards>>;
}

const useFilterCards = (props: IUseFilterCardsProps) => {
  const { cards, setCards } = props;

  const [selectedFilter, setSelectedFilter] = useState<string>("category");

  const handleFilterCards = (e: React.ChangeEvent<HTMLInputElement>) => {
    const radioType = e.target.value;

    setSelectedFilter(radioType);

    const sortedCards = [...cards];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sortedCards.sort((a: any, b: any) => {
      if (a[radioType] < b[radioType]) {
        return -1;
      }
      if (a[radioType] > b[radioType]) {
        return 1;
      }
      return 0;
    });

    setCards(sortedCards);
  };

  return {
    selectedFilter,
    handleFilterCards,
  };
};

export default useFilterCards;
