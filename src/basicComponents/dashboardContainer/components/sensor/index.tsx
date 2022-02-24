import React from 'react'
import styles from "./styles/sensor.module.scss"

interface propsType { title: string; usage: string; highNumber: string; lowNumber: string; value: string; unit: string; icon: any; }

function Sensor({ title, usage, highNumber, lowNumber, value, unit, icon }: propsType) {
    return (
        <div className={styles.sensorContainer}>
            <div className={styles.containerPartRight}>
                <div className={styles.sensorIcon}>
                    {icon}
                </div>
                <div>
                    <p className={styles.sensorTitle}>{title}</p>
                    <p className={styles.sensorUsage}>{usage}</p>
                </div>
            </div>
            <div className={styles.containerPartCenter}>
                <p className={styles.containerPartCenterPart} >
                    <span className={styles.sensorValueTitle}>بیشترین</span>
                    <span className={styles.sensorValueRange}>{highNumber}</span>
                </p>
                <p className={styles.containerPartCenterPart}>
                    <span className={styles.sensorValueTitle}>کمترین</span>
                    <span className={styles.sensorValueRange}>{lowNumber}</span>
                </p>
            </div>
            <div className={styles.containerPartLeft}>
                <p className={styles.containerPartLeftPart}>
                    <span className={styles.sensorValue}>{value}</span>
                    <span className={styles.sensorUnit}>{unit}</span>
                </p>
                <p className={styles.sensorSubTitle}>میانگین</p>
            </div>
        </div>
    )
}

export default Sensor
