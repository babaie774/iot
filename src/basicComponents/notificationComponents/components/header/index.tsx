import React from 'react';
import { icon } from 'utils/icon';
import Styles from "./Styles/header.module.scss"
import { useRouter } from 'next/router'

function Header() {
    const router = useRouter()

    const handleroute = (route: string) => {
        router.push(route)
    }
    return (
        <div className={Styles.headerContainer}>
            <p className={Styles.headerContainerText}>اعلان ها</p>
            <button className={Styles.headerContainerBtn} onClick={() => handleroute('dashboard')} >{icon.Arrow()}</button>
        </div>
    )
}

export default Header;
