import Footer from './components/footer';
import Header from './components/header';
import React, { useEffect, useState } from 'react';
import Search from './components/search';
import Table from "./components/table";
import Styles from "./Styles/notificationComponents.module.scss"


function Notification({ data }) {
    const [FormData, setFormData] = useState(data);
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(8);
    const [valueSearch, setValueSearch] = useState('');
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const paginationNumbers = Math.ceil(FormData.length / postPerPage);
    const slicedData = FormData.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        if (valueSearch.length > 0) {
            const items = data.filter((item1) => {
                return item1.key.includes(valueSearch);
            })
            setFormData(items);
        } else {
            setFormData(data);
        }
    }, [valueSearch, data]);


    return (
        <div className={Styles.notificationContainer}>
            <Header />
            <Search setValueSearch={setValueSearch} />
            <Table items={slicedData} />
            <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} paginationNumbers={paginationNumbers} />
        </div>
    )
}
export default Notification;

