import React from 'react';
import { icon } from 'utils/icon';
import Styles from "./Styles/header.module.scss"

function Header() {
    return (
        <div className={Styles.headerContainer}>
            <p className={Styles.headerContainerText}>اعلان ها</p>
            <span>{icon.Arrow()}</span>
        </div>
    )
}

export default Header;
