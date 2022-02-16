import React from 'react';
import { icon } from 'utils/icon';
import Styles from './Styles/footer.module.scss'


function Footer({ currentPage, paginationNumbers, setCurrentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= paginationNumbers; i++) {
        pageNumbers.push(i);
    }

    const handleClick: any = (e) => {
        setCurrentPage(e.target.value);
    }

    const handlePrevious: any = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNext: any = () => {
        if (currentPage < paginationNumbers) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className={Styles.footerContainer}>
            <div onClick={handlePrevious} className={`${pageNumbers.length == 1 ? Styles.footerContainerHide : Styles.paginationContainer}`}>
                <span className={Styles.paginationContainerArrowRight}>
                    {icon.dropdownArrow}
                    {'<'}
                </span>
                <div className={Styles.paginationContainerNumberList}>
                    {
                        pageNumbers.map((item, index) => (
                            <input value={item} type="button" onClick={(e) => handleClick(e)} key={index} className={`${Styles.paginationContainerNumbers} ${currentPage == item ? Styles.active : ''}`}></input>
                        ))
                    }
                </div>
                <span onClick={handleNext} className={Styles.paginationContainerArrowLeft}>
                    {icon.dropdownArrow}
                    {'>'}
                </span>
            </div>
        </div >
    );
}

export default Footer;
