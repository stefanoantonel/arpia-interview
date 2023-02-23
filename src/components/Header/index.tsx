import styles from './header.module.css';

export default function Header() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User list app</h2>
    </div>
  );
}
