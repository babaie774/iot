import Access from "./components/access"
import Sensor from "./components/sensor"
import React from "react"
import styles from "./styles/dashboardContainer.module.scss"
import Controller from "./components/controller"
import Checker from "./components/checker"
import { icon } from "utils/icon"

function DashboardContainer() {

    const Data = {
        accessText: [
            {
                title: "سنسورها",
                widgetsNumber: "25",
                connectionNumber: "21",
                disconnectNumber: "4"
            },
            {
                title: "کنترلرها",
                widgetsNumber: "25",
                connectionNumber: "21",
                disconnectNumber: "4"
            }
        ],
        sensorText: [
            {
                title: "سنسور زون اول",
                usage: "میزان روشنایی",
                iconSensor: icon.brightness(),
                highNumber: "800",
                lowNumber: "100",
                value: "360",
                unit: "Lux",
            },
            {
                title: "سنسور زون دوم",
                iconSensor: icon.humidity(),
                usage: "رطوبت هوا",
                highNumber: "80",
                lowNumber: "10",
                value: "40",
                unit: "%",
            }
        ],
        controllerText: [
            {
                title: "کنترلر اصلی سوم",
                iconController: icon.temperature(),
                usage: "دما",
                onValue: "11",
                offValue: "8"
            },
            {
                title: "گرمایش زون اول",
                iconController: icon.heatingSystem(),
                usage: "سیستم گرمایشی",
                onValue: "4",
                offValue: "2"
            },
        ],
        checkerText: [
            {
                title: "سنسور سوم",
                iconChecker: icon.humidity(),
                usage: "رطوبت هوا",
                value: "10",
                unit: "%"
            }
        ]
    }

    return (
        <>
            <div className={styles.accessHolder}>
                {
                    Data.accessText.map(({ title, widgetsNumber, connectionNumber, disconnectNumber }, index) => (
                        <Access
                            key={index}
                            title={title}
                            widgetsNumber={widgetsNumber}
                            connectionNumber={connectionNumber}
                            disconnectNumber={disconnectNumber} />
                    ))
                }
            </div>
            <div className={styles.sensorHolder}>
                {
                    Data.sensorText.map(({ iconSensor, title, usage, highNumber, lowNumber, unit, value }, index) => (
                        <Sensor
                            key={index}
                            title={title}
                            usage={usage}
                            highNumber={highNumber}
                            lowNumber={lowNumber}
                            unit={unit}
                            value={value}
                            icon={iconSensor}
                        />
                    ))
                }
            </div>

            <div className={styles.ControllerHolder}>
                {
                    Data.controllerText.map(({ title, usage, onValue, offValue, iconController }, index) => (
                        <Controller
                            title={title}
                            usage={usage}
                            onValue={onValue}
                            offValue={offValue}
                            key={index}
                            iconController={iconController}
                        />
                    )
                    )}
            </div>
            <div className={styles.checkerHolder}>
                {
                    Data.checkerText.map(({ title, usage, value, unit, iconChecker }, index) => (
                        <Checker
                            key={index}
                            title={title}
                            usage={usage}
                            value={value}
                            unit={unit}
                            iconChecker={iconChecker}
                        />
                    ))
                }
            </div>
            <div className={styles.ControllerHolder}>
                {
                    Data.controllerText.map(({ title, usage, onValue, offValue, iconController }, index) => (
                        <Controller
                            title={title}
                            usage={usage}
                            onValue={onValue}
                            offValue={offValue}
                            key={index}
                            iconController={iconController}
                        />
                    )
                    )}
            </div>
        </>

    )
}

export default DashboardContainer
