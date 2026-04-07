
import React, { Suspense, useEffect, useMemo } from "react"
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
        if (!accessToken) return;
        PostCasosDashboard({token:accessToken});
    }, [accessToken]);

    const cardStats = useMemo(() => ([
        { title: "Total de casos", value: metrics.totalCases, type: "collected", subtitle: "Total operativo actual" },
        { title: "Casos pendientes", value: metrics.pendingCases, type: "pending", subtitle: "Requieren gestión prioritaria" },
        { title: "Casos cerrados", value: metrics.totalCerrados, type: "invoices", subtitle: "Resueltos correctamente" },
        { title: "Casos eliminados", value: metrics.totalDelete, type: "customers", subtitle: "Archivados o descartados" },
    ]), [metrics]);


    const fillCotent =() =>{
        if(error) return <Error/>
        if(loading) return  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"><CardsSkeleton /></div> 
        return  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {cardStats.map((card) => (
                        <Card
                            key={card.title}
                            title={card.title}
                            value={card.value}
                            type={card.type}
                            subtitle={card.subtitle}
                        />
                    ))}
                </div>
    }    

    return <>
            <Layout>
            <main>
                <h1 className={`lusitana mb-2 text-xl font-semibold text-slate-900 md:text-3xl`}>
                    Dashboard
                </h1>
                <p className="mb-6 text-sm text-slate-500 md:text-base">
                    Panel de estadísticas y rendimiento general de la operación.
                </p>
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
