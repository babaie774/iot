import React, { useEffect } from 'react'
import styles from "./styles/footer.module.scss"
import { icon } from "utils/icon"
import { useRouter } from 'next/router'

function Footer() {

    const router = useRouter()

    const manus = [
        {
            name: "/playgrounds/dashboard",
            iconContainer: icon.dashboard(),
            text: 'داشبورد'
        },
        {
            name: "/playgrounds/Sensors",
            iconContainer: icon.sensors(),
            text: "سنسورها"
        },
        {
            name: "/playgrounds/controller",
            iconContainer: icon.controllers(),
            text: "کنترلرها"
        },
        {
            name: "/playgrounds/containerUser",
            iconContainer: icon.user(),
            text: "پروفایل"
        },
    ]

    const handleClick = (name) => (
        router.push(name)
    )

    return (
        <div className={styles.footerHolder}>
            {
                manus.map((item, index) => {
                    return (
                        <a onClick={() => handleClick(item.name)} key={index} className={`${styles.footerContainer} ${router.pathname === item.name ? styles.active : ''}`}>
                            {item.iconContainer}
                            <span>
                                {item.text}
                            </span>
                        </a>
                    )
                })
            }
        </div>
    )
}

export default Footer
