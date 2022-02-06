import React from "react"
import { icon } from "utils/icon"
import styles from "./Styles/header.module.scss"

function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContainerNotification}>
                <span className={styles.headerContainerNotificationIcon}>
                    {icon.bell()}
                </span>
                <span className={styles.headerContainerNotificationText}>
                    99
                </span>
            </div>
            <div className={styles.headerContainerSimCard}>
                <span className={styles.headerContainerSimCardText}>OFF</span>
                {icon.simCard()}
            </div>
        </div>
    )
}

export default Header
