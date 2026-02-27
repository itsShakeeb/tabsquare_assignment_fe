import styles from "./page.module.css";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button variant="contained">Hello world</Button>
      </main>
    </div>
  );
}
