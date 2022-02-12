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

    // console.log(pageNumbers.length)
    console.log(currentPage)

    return (
        <div className={Styles.footerContainer}>
            <div className={`${pageNumbers.length == 1 ? Styles.footerContainerHide : Styles.paginationContainer}`}>
                <span className={Styles.paginationContainerArrowRight}>
                    {icon.dropdownArrow}
                    {'<'}
                </span>
                <div className={Styles.paginationContainerNumberList}>
                    {
                        pageNumbers.map((item, index) => (
                            <input value={item} type="button" onClick={(e) => handleClick(e)} key={index} className={`${currentPage == item ? Styles.active : Styles.paginationContainerNumbers}`}></input>
                        ))
                    }
                </div>
                <span className={Styles.paginationContainerArrowLeft}>
                    {icon.dropdownArrow}
                    {'>'}
                </span>
            </div>
        </div >
    );
}

export default Footer;
