import styles from './footer.module.css';

export default function Footer() {
  return (
    <div className={styles.container}>
      <span className={styles.link}>Contact</span>
      <span className={styles.link}>About</span>
      <span>User List App © 2023</span>
    </div>
  );
}
