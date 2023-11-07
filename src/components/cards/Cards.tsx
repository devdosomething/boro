import React, { FC } from "react";
import styles from "./Cards.module.css";
import { formatDate } from "../../utils/Utils";
import { ICard, ICards } from "../../types/Card";
import { config } from "../../config";

interface ICardsProps {
  currentCards: ICards;
  handleCloseCard: (image: string) => void;
  setClosedCards: React.Dispatch<React.SetStateAction<string[]>>;
  closedCards: string[];
}

const Cards: FC<ICardsProps> = (props) => {
  const { currentCards, handleCloseCard, setClosedCards, closedCards } = props;

  const handleCardClose = (image: string) => {
    setClosedCards((prevClosedCards) => [...prevClosedCards, image]);
    handleCloseCard(image);
  };

  return (
    <React.Fragment>
      {currentCards?.map((card: ICard) => (
        <div
          key={card.image}
          className={`${styles.card} ${
            closedCards.includes(card.image) ? styles.closed : ""
          }`}
        >
          <button
            className={styles.xIcon}
            onClick={() => {
              handleCardClose(card.image);
            }}
          >
            X
          </button>
          <div className={styles.card}>
            <img
              src={config.PUBLIC_URL + card.image}
              alt={card.category}
              width="50%"
            />
            <div>
              <span>Имя {card.image}</span>
              <br />
              <span>Дата: {formatDate(card.timestamp as string)}</span>
              <br />
              <span>Категория: {card.category}</span>
              <br />
              <span>Размер: {card.filesize} байт</span>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Cards;
