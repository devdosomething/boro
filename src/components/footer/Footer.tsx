import { FC } from "react";
import styles from "./Footer.module.css";

const Footer: FC = () => {
  return (
    <div className={styles.footerStyles}>
      <div className={styles.footerSign}>
        <a href="https://github.com/devdosomething" target="_blank">
          made by @devdosomething
        </a>
      </div>
    </div>
  );
};

export default Footer;
