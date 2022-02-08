import Footer from './components/footer';
import Header from './components/header';
import React from 'react';
import Search from './components/search';
import Table from "./components/table";
import Styles from "./Styles/notificationComponents.module.scss"


function notification() {
    return (
        <div className={Styles.notificationContainer}>
            <Header />
            <Search />
            <Table />
            <Footer />
        </div>
    )
}

export default notification;
