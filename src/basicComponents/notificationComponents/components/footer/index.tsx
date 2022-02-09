import React from 'react';
import { icon } from 'utils/icon';
import Styles from './Styles/footer.module.scss'

function Footer({ paginationNumbers, setCurrentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= paginationNumbers; i++) {
        pageNumbers.push(i);
    }

    const handleClick: any = (e) => {
        console.log(e.target);
        setCurrentPage(e.target.value);
    }

    console.log(pageNumbers);

    return (
        <div className={Styles.footerContainer}>
            <div className={Styles.paginationContainer}>
                <span className={Styles.paginationContainerArrowRight}>
                    {icon.dropdownArrow}
                    {'<'}
                </span>
                <div className={Styles.paginationContainerNumberList}>
                    {
                        pageNumbers.map((item, index) => (
                            <input value={item} type="button" onClick={(e) => handleClick(e)} key={index} className={`${Styles.paginationContainerNumbers} ${Styles.active}`}></input>
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
