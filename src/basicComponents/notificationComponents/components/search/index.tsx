import React, { useState } from 'react';
import { icon } from 'utils/icon';
import Styles from './Styles/search.module.scss'

function Search({ setValueSearch }) {

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: any) => {
        if (e.key === 'Enter') {
            setValueSearch(inputValue);
        }
    }

    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    }

    return (
        <>
            <div className={Styles.SearchContainer}>
                <input onChange={(e) => handleChange(e)} onKeyDown={(e) => { handleSubmit(e) }} className={Styles.SearchContainerInput} placeholder='جستوجو' />
                <button onClick={() => setValueSearch(inputValue)} className={Styles.SearchContainerIcon}>{icon.search()}</button>
            </div >
        </>
    );
}

export default Search;
