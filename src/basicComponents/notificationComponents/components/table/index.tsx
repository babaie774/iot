import React from "react";
import Styles from "./Styles/table.module.scss"
import { notifications } from "./data"

function Table() {
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
                        notifications.map((notification, index) => (
                            <tr key={index} className={Styles.TableContainerBodyTr}>
                                <th className={Styles.TableContainerTrName}>{notification.name}</th>
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
