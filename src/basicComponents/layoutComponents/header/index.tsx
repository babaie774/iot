import React, { useState } from "react"
import { icon } from "utils/icon"
import styles from "./Styles/header.module.scss"
import { useRouter } from 'next/router'


function Header({ notificationCount }) {

    const router = useRouter()
    const [simStatus, setSimStatus] = useState(false);

    const handleroute = (route: string) => {
        router.push(route)
    }

    return (
        <div className={styles.headerContainer}>
            <div onClick={() => handleroute('notification')} className={styles.headerContainerNotification}>
                <span className={styles.headerContainerNotificationIcon}>
                    {icon.bell()}
                </span>
                <span className={styles.headerContainerNotificationText}>
                    {notificationCount}
                </span>
            </div>
            <div onClick={() => setSimStatus(!simStatus)} className={`${styles.headerContainerSimCard} ${simStatus == false ? styles.SimCardOff : styles.SimCardOn}`}>
                <span className={styles.headerContainerSimCardText}>
                    {simStatus == false ? 'OFF' : 'ON'}
                </span>
                {icon.simCard()}
            </div>
        </div >
    )
}

export default Header
