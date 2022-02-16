import React from "react"
import Footer from "basicComponents/layoutComponents/footer"
import Header from "basicComponents/layoutComponents/header"
import styles from "./styles/layout.module.scss"

function Layout({ notificationCount, children }: any) {
    return (
        <div className={styles.layoutContainer}>
            <Header notificationCount={notificationCount} />
            {children}
            <Footer />
        </div>
    )
}

export default Layout
