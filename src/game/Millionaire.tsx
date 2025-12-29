import { MillionaireDashboard } from "./components/MillionaireDashboard";
import Logo from "./assets/images/logo.webp";
import styles from "./styles/millionaireLayout.module.css";

export const Millionaire = () => {
  return (
    <div className={styles.page}>
      <div className={styles.stage}>
        {/* Logo */}
        <div className={styles.logoWrapper}>
          <img src={Logo} alt="Millionaire Logo" className={styles.logo} />
        </div>

        <MillionaireDashboard />
      </div>
    </div>
  );
};
