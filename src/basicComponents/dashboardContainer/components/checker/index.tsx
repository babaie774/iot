import React from 'react'
import styles from "./styles/checker.module.scss"

interface propsType { title: string; usage: string; value: string; unit: string; iconChecker: any }

function Checker({ title, usage, value, unit, iconChecker }: propsType) {
    return (
        <div className={styles.checkerContainer}>
            <div className={styles.checkerContainerRight}>
                <div className={styles.checkerIcon}>
                    {iconChecker}
                </div>
                <div className={styles.containerPart}>
                    <p className={styles.checkerTitle}>{title}</p>
                    <p className={styles.checkerUsage}>{usage}</p>
                </div>
            </div>
            <div className={styles.checkerContainerLeft}>
                <p className={styles.checkerCircle}>
                    <span className={styles.checkerValue}>{value}</span>
                    <span className={styles.checkerUnit}>{unit}</span>
                </p>
            </div>
        </div>
    )
}

export default Checker
