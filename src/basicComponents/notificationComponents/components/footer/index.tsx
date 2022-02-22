import React from 'react';
import { icon } from 'utils/icon';
import Styles from './styles/footer.module.scss'
import { handleClick, handlePrevious, handleNext } from './services'


function Footer({ currentPage, paginationNumbers, setCurrentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= paginationNumbers; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={Styles.footerContainer}>
            <div onClick={() => handlePrevious(setCurrentPage, currentPage)} className={`${pageNumbers.length == 1 ? Styles.footerContainerHide : Styles.paginationContainer}`}>
                <span className={Styles.paginationContainerArrowRight}>
                    {icon.dropdownArrow}
                    {'<'}
                </span>
                <div className={Styles.paginationContainerNumberList}>
                    {
                        pageNumbers.map((item, index) => (
                            <input value={item} type="button" onClick={(e) => handleClick(setCurrentPage, e)} key={index} className={`${Styles.paginationContainerNumbers} ${currentPage == item ? Styles.active : ''}`}></input>
                        ))
                    }
                </div>
                <span onClick={() => handleNext(setCurrentPage, currentPage, paginationNumbers)} className={Styles.paginationContainerArrowLeft}>
                    {icon.dropdownArrow}
                    {'>'}
                </span>
            </div>
        </div>
    );
}

export default Footer;
