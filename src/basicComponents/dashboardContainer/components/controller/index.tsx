import React from 'react'
import styles from "./styles/controller.module.scss"

interface propsType {
    title: string,
    usage: string,
    onValue: string,
    offValue: string,
    iconController: any,
}

function Controller({ title, usage, onValue, offValue, iconController }: propsType) {
    return (
        <div className={styles.controllerContainer}>
            <div className={styles.controllerContainerTop}>
                <div >
                    <div className={styles.controllerIcon}>
                        {iconController}
                    </div>
                </div>
                <div>
                    <div className={styles.controllerContainerTopTurnOn}>
                        <span className={styles.controllerCircleOn}></span>
                        <span className={styles.controllerTitleValue}>روشن</span>
                        <span className={styles.controllerValue}>{onValue}</span>
                    </div>
                    <div className={styles.controllerContainerTopTurnOff}>
                        <span className={styles.controllerCircleOff}></span>
                        <span className={styles.controllerTitleValue}>خاموش</span>
                        <span className={styles.controllerValue}>{offValue}</span>
                    </div>
                </div>
            </div>
            <div className={styles.controllerContainerBotton}>
                <p className={styles.controllerTitle}>{title}</p>
                <p className={styles.controllerUsage}>{usage}</p>
            </div>
        </div>
    )
}

export default Controller
