import React from 'react';
import { icon } from 'utils/icon';
import Styles from './Styles/search.module.scss'

function Search() {
    return (
        <div>
            <div className={Styles.SearchContainer}>
                <input className={Styles.SearchContainerInput} type="search" placeholder='جستجوی' />
                <span className={Styles.SearchContainerIcon}>{icon.search()}</span>
            </div>
        </div>
    );
}

export default Search;
