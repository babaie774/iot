import Footer from './components/footer';
import Header from './components/header';
import React, { useState } from 'react';
import Search from './components/search';
import Table from "./components/table";
import Styles from "./Styles/notificationComponents.module.scss"
import { items } from "./components/table/data"
import { Console } from 'console';

function Notification() {
    // const [posts, setPosts] = useState([]);
    const [active, setActive] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(2);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const paginationNumbers = Math.ceil(items.length / postPerPage);
    // console.log(indexOfLastPost);
    // console.log(indexOfFirstPost);
    // console.log(paginationNumbers);

    const items1 = items.slice(indexOfFirstPost, indexOfLastPost);

    // console.log(items1);

    return (
        <div className={Styles.notificationContainer}>
            <Header />
            <Search />
            <Table items={items1} />
            <Footer setCurrentPage={setCurrentPage} paginationNumbers={paginationNumbers} />
        </div>
    )
}

export default Notification;
