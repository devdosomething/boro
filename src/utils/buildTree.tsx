import { ICard } from "../types/Card";
import { formatDate } from "./Utils";
import styles from "/src/components/body/Body.module.css";

interface IBuildTreeProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nodes: any;
  expandedNodes: Set<string>;
  handleExpand: (nodeId: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<boolean>;
  setModalImage: React.Dispatch<React.SetStateAction<string | null>>;
}

export const buildTree = (
  props: IBuildTreeProps
): JSX.Element[] | undefined => {
  const { nodes, expandedNodes, handleExpand, setIsModalOpen, setModalImage } =
    props;

  const getCardName = (imageSrc: string, cardCategory: string) => {
    return imageSrc.slice(cardCategory.length + 1);
  };

  if (nodes) {
    return Object.keys(nodes).map((category) => {
      const isRoot = category === "Root";
      const isExpanded = expandedNodes.has(category);
      return (
        <div
          key={category}
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            width: "max-content",
            cursor: "pointer",
          }}
        >
          <span onClick={() => handleExpand(category)}>
            {isExpanded ? "▼ " : "► "} {category}
          </span>
          {isExpanded ? (
            <div style={{ marginLeft: "20px" }}>
              {isRoot ? (
                <div>
                  {Object.keys(nodes[category]).map((subCategory) => (
                    <div key={subCategory}>
                      <span onClick={() => handleExpand(subCategory)}>
                        {expandedNodes.has(subCategory) ? "▼ " : "► "}{" "}
                        {subCategory}
                      </span>
                      {expandedNodes.has(subCategory) ? (
                        <div className={styles.tree}>
                          {nodes[category][subCategory].map((card: ICard) => (
                            <div key={card.image}>
                              <span onClick={() => handleExpand(card.image)}>
                                {expandedNodes.has(card.image) ? "▼ " : "► "}{" "}
                                {getCardName(card.image, card.category)}
                              </span>
                              {expandedNodes.has(card.image) && (
                                <div
                                  style={{
                                    marginLeft: "20px",
                                    display: "grid",
                                  }}
                                >
                                  <div
                                    onClick={() => {
                                      setIsModalOpen(true);
                                      setModalImage(card.image);
                                    }}
                                  >
                                    <img
                                      src={card.image}
                                      alt={card.image}
                                      width="50px"
                                    />
                                  </div>
                                  <span>Размер файла: {card.filesize}</span>
                                  <span>
                                    Дата: {formatDate(card.timestamp as string)}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                nodes[category].map((card: ICard) => (
                  <div key={card.image}>
                    <span onClick={() => handleExpand(card.image)}>
                      {expandedNodes.has(card.image) ? "▼ " : "► "} {card.image}
                    </span>
                    {expandedNodes.has(card.image) && (
                      <div
                        style={{
                          marginLeft: "20px",
                          display: "grid",
                        }}
                      >
                        <img src={card.image} alt={card.image} width="50px" />
                        <span>Размер файла: {card.filesize}</span>
                        <span>
                          Дата: {formatDate(card.timestamp as string)}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          ) : null}
        </div>
      );
    });
  }
};
