import Footer from './components/footer';
import Header from './components/header';
import React, { useState } from 'react';
import Search from './components/search';
import Table from "./components/table";
import Styles from "./Styles/notificationComponents.module.scss"


function Notification({ data }) {
    const [active, setActive] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(8);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const paginationNumbers = Math.ceil(data.length / postPerPage);

    const slicedData = data.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className={Styles.notificationContainer}>
            <Header />
            <Search />
            <Table items={slicedData} />
            <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} paginationNumbers={paginationNumbers} />
        </div>
    )
}
export default Notification;

