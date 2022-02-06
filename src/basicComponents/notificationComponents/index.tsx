import Footer from './components/footer';
import Header from './components/header';
import React from 'react';
import Search from './components/search';
import Table from "./components/table";


function notification() {
    return (
        <>
            <Header />
            <Search />
            <Table />
            <Footer />
        </>
    )
}

export default notification;
