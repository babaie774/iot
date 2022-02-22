import NotificationComponents from 'basicComponents/notificationComponents';
import React from 'react';

function Notification({ data }) {
    return (
        <NotificationComponents data={data} />
    )
}

export default Notification;

Notification.getInitialProps = async () => {
    const res = await fetch('http://localhost:3006/notification')
    const data = await res.json()
    return { data: data }
}
