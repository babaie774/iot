import React from "react"
import styles from "./styles/access.module.scss"

interface propsType {
    title: string,
    widgetsNumber: string,
    connectionNumber: string,
    disconnectNumber: string,
}

function Access({
    title,
    widgetsNumber,
    connectionNumber,
    disconnectNumber,
}: propsType) {

    return (
        <div className={styles.accessContainer}>
            <div className={styles.accessContainerTitle} >
                {title}
            </div>

            <div className={styles.accessContainerPart}>
                <p>
                    <span className={styles.widgetsTitle}>ویجت ها</span>
                    <span className={styles.widgetsNumber}>{widgetsNumber}</span>
                </p>
            </div>
            <div className={styles.accessContainerPart}>
                <span className={styles.connectionCircle}></span>
                <p>
                    <span className={styles.connectionTitle}>متصل</span>
                    <span className={styles.connectionNumber}>{connectionNumber}</span>
                </p>
            </div>
            <div className={styles.accessContainerPart}>
                <span className={styles.disconnectCircle}></span>
                <p>
                    <span className={styles.disconnectTitle}>قطع</span>
                    <span className={styles.disconnectNumber}>{disconnectNumber}</span>
                </p>
            </div>
        </div >
    )
}

export default Access

