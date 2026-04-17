import styles from './layout.module.scss';

export default function ClaudePagesLayout({ children }) {
  return <div className={styles.root}>{children}</div>;
}
