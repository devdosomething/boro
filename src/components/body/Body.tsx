import React, { FC, useState } from "react";
import { ScaleLoader } from "react-spinners";
import styles from "./Body.module.css";
// components
import FilterButtons from "../ui/FilterButtons";
import ViewButtons from "../ui/ViewButtons";
import Cards from "../cards/Cards";
import Modal from "../modals/Modal";
// utils
import { buildTree } from "../../utils/buildTree";
// hooks
import useGetCards from "../../hooks/useGetCards";
import useFilterCards from "../../hooks/useFilterCards";
import useCardActions from "../../hooks/useCardActions";

const Body: FC = () => {
  const { cards, setCards, initialCards, loading } = useGetCards();

  const treeCards = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Root: cards.reduce((result: any, card) => {
      const { category } = card;
      if (!result[category]) {
        result[category] = [];
      }
      result[category].push(card);
      return result;
    }, {}),
  };

  const { selectedFilter, handleFilterCards } = useFilterCards({
    cards,
    setCards,
  });

  const [pageNumber, setPageNumber] = useState<number>(1);
  const cardsPerPage = 12;

  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const lastCardIndex = pageNumber * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = cards.slice(firstCardIndex, lastCardIndex);

  const paginate = (newPageNumber: number) => {
    if (newPageNumber >= 1 && newPageNumber <= totalPages) {
      setPageNumber(newPageNumber);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const [closedCards, setClosedCards] = useState<string[]>([]);

  const { handleCloseCard, handleResetCards } = useCardActions({
    cards,
    setCards,
    initialCards,
    setPageNumber,
    setClosedCards,
  });

  const [selectedView, setSelectedView] = useState("cards");

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const handleExpand = (nodeId: string) => {
    setExpandedNodes((prevExpandedNodes) => {
      const newExpandedNodes = new Set(prevExpandedNodes);
      if (newExpandedNodes.has(nodeId)) {
        newExpandedNodes.delete(nodeId);
      } else {
        newExpandedNodes.add(nodeId);
      }
      return newExpandedNodes;
    });
  };

  const viewOptions = [
    { value: "tree", label: "Tree View" },
    { value: "cards", label: "Cards View" },
  ];

  return (
    <React.Fragment>
      <div className={styles.btns}>
        <button onClick={handleResetCards}>RESET</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
        }}
      >
        <FilterButtons
          selectedFilter={selectedFilter}
          handleFilterCards={handleFilterCards}
        />
        <ViewButtons
          viewOptions={viewOptions}
          selectedView={selectedView}
          handleSwitchView={() =>
            setSelectedView(selectedView === "tree" ? "cards" : "tree")
          }
        />
      </div>
      {loading ? (
        <div className={styles.loader}>
          <ScaleLoader />
        </div>
      ) : (
        <React.Fragment>
          <div
            className={
              selectedView === "cards" ? styles.bodyStyles : styles.treeStyles
            }
          >
            {selectedView === "cards" ? (
              <Cards
                currentCards={currentCards}
                handleCloseCard={handleCloseCard}
                setClosedCards={setClosedCards}
                closedCards={closedCards}
              />
            ) : (
              <div style={{ margin: "40px" }}>
                {buildTree({
                  nodes: treeCards,
                  expandedNodes,
                  handleExpand,
                  isModalOpen,
                  setIsModalOpen,
                  setModalImage,
                })}
              </div>
            )}
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            image={modalImage}
          />
          <div className={styles.btns}>
            <button onClick={() => paginate(1)}>1</button>
            <button onClick={() => paginate(pageNumber - 1)}>Previous</button>
            <span>
              {pageNumber}/{totalPages}
            </span>
            <button onClick={() => paginate(pageNumber + 1)}>Next</button>
            <button onClick={() => paginate(totalPages)}>{totalPages}</button>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Body;
