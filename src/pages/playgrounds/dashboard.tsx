import React from "react"
import DashboardContainer from "basicComponents/dashboardContainer"
import Layout from "basicComponents/layoutComponents/layout"

export default function Dashboard({ data }) {
    return (
        <div>
            <Layout notificationCount={data.length}>
                <DashboardContainer />
            </Layout>
        </div>
    )
}

Dashboard.getInitialProps = async () => {
    const res = await fetch('http://localhost:3006/notification')
    const data = await res.json()
    return { data: data }
}

