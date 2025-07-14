
import React, { Suspense, useEffect } from "react"
import Layout from "./layout"
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from "../../ui/skeleton"
import LatestInvoices from "../../ui/dashboard/latest-invoices"
import RevenueChart from "../../ui/dashboard/revenue-chart"
import { Card } from "../../ui/dashboard/cards"
import ActionsDashboard from "../../Actions/ActionsDashboard"
import { useSelector } from "react-redux"
import Error from "../../ui/Error"


const Dashboard =() =>{
  
    const {PostCasosDashboard} = ActionsDashboard()
    const {error,loading,metrics}= useSelector((state) => state.dashboard )
    const { accessToken} = useSelector(
    (state) => state.Refrestoken
    );
    useEffect(() => {
        const fetch = () => {
            PostCasosDashboard({token:accessToken});
        };
        fetch();
    }, []);


    const fillCotent =() =>{
        if(error) return <Error/>
        if(loading) return  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"><CardsSkeleton /></div> 
        return  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Card title="Total de casos" value={metrics.totalCases} type="collected" />
                    <Card title="Casos pendientes" value={metrics.pendingCases} type="pending" />
                    <Card title="Casos cerrados" value={metrics.totalCerrados} type="invoices" />
                    <Card title="Casos eliminados" value={metrics.totalDelete} type="customers" />
                </div>
    }    

    return <>
            <Layout>
            <main>
                <h1 className={`lusitana mb-4 text-xl md:text-2xl`}>
                    Dashboard
                </h1>
                {fillCotent()}
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