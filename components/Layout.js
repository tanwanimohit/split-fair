import Head from "next/head"
import styles from "../styles/Layout.module.css"

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Split Fair</title>
                <link rel="manifest" href="/manifest.json" />
                <meta name="description" content="Split your fares fairly." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}

export default Layout