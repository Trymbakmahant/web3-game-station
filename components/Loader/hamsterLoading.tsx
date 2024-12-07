import styles from "./HamsterWheel.module.css";

const HamsterWheel = () => {
  return (
    <div
      aria-label="Orange and tan hamster running in a metal wheel"
      role="img"
      className={styles["wheel-and-hamster"]}
    >
      <div className={styles.wheel} />
      <div className={styles.hamster}>
        <div className={styles["hamster__body"]}>
          <div className={styles["hamster__head"]}>
            <div className={styles["hamster__ear"]} />
            <div className={styles["hamster__eye"]} />
            <div className={styles["hamster__nose"]} />
          </div>
          <div
            className={`${styles.hamster__limb} ${styles["hamster__limb--fr"]}`}
          />
          <div
            className={`${styles.hamster__limb} ${styles["hamster__limb--fl"]}`}
          />
          <div
            className={`${styles.hamster__limb} ${styles["hamster__limb--br"]}`}
          />
          <div
            className={`${styles.hamster__limb} ${styles["hamster__limb--bl"]}`}
          />
          <div className={styles["hamster__tail"]} />
        </div>
      </div>
      <div className={styles.spoke} />
    </div>
  );
};

export default HamsterWheel;
