import React from 'react';
import Styles from './Styles/table.module.scss'

function Table() {
    return (
        <div className={Styles.TableContainer}>
            <table className={Styles.TableContainerTable}>
                <thead className={Styles.TableContainerHead}>
                    <tr className={Styles.TableContainerHeadTr}>
                        <th className={Styles.TableContainerTh}>نام</th>
                        <th>تاریخ</th>
                        <th>ساعت</th>
                        <th>مقدار</th>
                    </tr>
                </thead>
                <tbody className={Styles.TableContainerBody}>
                    <tr className={Styles.TableContainerBodyTr}>
                        <th>سنسور زون اول</th>
                        <th>1399/05/28</th>
                        <th>360 lux</th>
                        <th>Air Date</th>
                        {/* <th>Lone Gunmen</th> */}
                    </tr>
                    <tr className={Styles.TableContainerBodyTr}>
                        <th>سنسور زون اول</th>
                        <th>1399/05/28</th>
                        <th>360 lux</th>
                        <th>Air Date</th>
                        {/* <th>Lone Gunmen</th> */}
                    </tr>
                    <tr className={Styles.TableContainerBodyTr}>
                        <th>سنسور زون اول</th>
                        <th>1399/05/28</th>
                        <th>360 lux</th>
                        <th>Air Date</th>
                        {/* <th>Lone Gunmen</th> */}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Table;
