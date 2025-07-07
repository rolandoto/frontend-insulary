
import React, { Suspense } from "react"
import Layout from "./layout"
import { LatestInvoicesSkeleton, RevenueChartSkeleton } from "../../ui/skeleton"
import LatestInvoices from "../../ui/dashboard/latest-invoices"
import RevenueChart from "../../ui/dashboard/revenue-chart"
import { Card } from "../../ui/dashboard/cards"


const Dashboard =() =>{
    const {numberOfCustomers,numberOfInvoices,totalPaidInvoices,totalPendingInvoices} ={
        "numberOfCustomers": 6,
        "numberOfInvoices": 11,
        "totalPaidInvoices": "$808.85",
        "totalPendingInvoices": "$1,760.04"
    }


    return <>
            <Layout>
            <main>
                <h1 className={`lusitana mb-4 text-xl md:text-2xl`}>
                    Dashboard
                </h1>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card title="Recaudado" value={totalPaidInvoices} type="collected" />
<Card title="Pendiente" value={totalPendingInvoices} type="pending" />
<Card title="Facturas Totales" value={numberOfInvoices} type="invoices" />
<Card title="Clientes Totales" value={numberOfCustomers} type="customers" />
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />} >
                    <RevenueChart   />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />} >
                    <LatestInvoices  /> 
                </Suspense>
                </div>
            </main>
            </Layout>
        </>

}

export default   Dashboard