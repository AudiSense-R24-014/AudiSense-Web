import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>AudiSense</title>
        <link rel="icon" href="/audisense.ico" />
      </Head>
      <body>
        <h1>Coming Soon</h1>
        <h2>Our website is under construction</h2>
        <h3>Stay tuned for updates</h3>
      </body>
      </div>
  );
}
