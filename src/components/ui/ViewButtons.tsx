import { FC } from "react";
import styles from "../body/Body.module.css"

interface IViewButtonsProps {
  viewOptions: { value: string; label: string }[];
  selectedView: string;
  handleSwitchView: (view: string) => void;
}

const ViewButtons: FC<IViewButtonsProps> = (props) => {
  const { viewOptions, selectedView, handleSwitchView } = props;

  return (
    <div className={styles.radio}>
      {viewOptions.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            value={option.value}
            checked={selectedView === option.value}
            onChange={() => handleSwitchView(option.value)}
          />
          <label>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default ViewButtons;
