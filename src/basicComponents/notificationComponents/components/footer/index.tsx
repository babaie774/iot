import React from 'react';
import { icon } from 'utils/icon';
import Styles from './Styles/footer.module.scss'

function Footer() {
    return (
        <div className={Styles.footerContainer}>
            <div className={Styles.paginationContainer}>
                <span className={Styles.paginationContainerArrowRight}>
                    {icon.dropdownArrow}
                    {'<'}
                </span>
                <div className={Styles.paginationContainerNumberList}>
                    <span className={Styles.paginationContainerNumbers}>1</span>
                    <span className={Styles.paginationContainerNumbers}>2</span>
                    <span className={`${Styles.paginationContainerNumbers} ${Styles.active}`}>3</span>
                    <span className={Styles.paginationContainerNumbers}>...</span>
                    <span className={Styles.paginationContainerNumbers}>10</span>
                </div>
                <span className={Styles.paginationContainerArrowLeft}>
                    {icon.dropdownArrow}
                    {'>'}
                </span>
            </div>
        </div>
    );
}

export default Footer;
