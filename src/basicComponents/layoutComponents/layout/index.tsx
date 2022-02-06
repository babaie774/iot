import React from "react"
import Footer from "basicComponents/layoutComponents/footer"
import Header from "basicComponents/layoutComponents/header"
import styles from "./styles/layout.module.scss"

function Layout({ children }: any) {
    return (
        <div className={styles.layoutContainer}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout
