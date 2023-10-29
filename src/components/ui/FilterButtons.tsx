import { FC } from "react";
import styles from "../body/Body.module.css";

interface IFilterButtonsProps {
  selectedFilter: string;
  handleFilterCards: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterButtons: FC<IFilterButtonsProps> = (props) => {
  const { selectedFilter, handleFilterCards } = props;

  const filterOptions = [
    { value: "category", label: "Category" },
    { value: "timestamp", label: "Date" },
    { value: "image", label: "Name" },
    { value: "filesize", label: "Size" },
  ];

  return (
    <div className={styles.radio}>
      {filterOptions.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            value={option.value}
            checked={selectedFilter === option.value}
            onChange={(e) => handleFilterCards(e)}
          />
          <label>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterButtons;
