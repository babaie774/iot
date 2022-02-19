import { Console } from "console";
import React, { useEffect } from "react";
import { icon } from "utils/icon";
import Styles from "./Styles/table.module.scss"

function Table({ items }) {


    return (
        <div className={Styles.TableContainer}>
            <table className={Styles.TableContainerTable}>
                <thead className={Styles.TableContainerHead}>
                    <tr className={Styles.TableContainerHeadTr}>
                        <th className={Styles.TableContainerTrName}>نام</th>
                        <th>تاریخ</th>
                        <th>ساعت</th>
                        <th>مقدار</th>
                    </tr>
                </thead>
                <tbody className={Styles.TableContainerBody}>
                    {
                        items.map((notification, index) => (
                            <tr key={index} className={Styles.TableContainerBodyTr}>
                                <th className={Styles.TableContainerTrName}><span className={Styles.TableContainerTrIcon}>{icon[notification.icon]()}</span>{notification.key}</th>
                                <th>{notification.date}</th>
                                <th>{notification.time}</th>
                                <th>{notification.value}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;
