import { useEffect, useState } from "react";
import axios from "axios";
import { ICards } from "../types/Card";

const API_URL = import.meta.env.VITE_API_URL;

const useGetCards = () => {
  const [cards, setCards] = useState<ICards>([]);
  const [initialCards, setInitialCards] = useState<ICards>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setCards(response.data);
        setInitialCards(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return {
    cards,
    setCards,
    initialCards,
    loading,
  };
};

export default useGetCards;
