import React, { Suspense } from "react"
import Layout from "../dashboard/layout"
import Search from "../../ui/customers/search"
import { useSelector } from "react-redux"
import Error from "../../ui/Error"
import { InvoicesTableSkeleton } from "../../ui/skeleton"
import { useSearchParams } from "react-router"
import { CreateIntermederies, DownloadExcel } from "../../ui/customers/buttons"
import Pagination from "../../ui/customers/pagination"
import Table from "../../ui/intermederies/table"


const Intermederies =() =>{

    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("q") || "";

    const {error,intermediariesFilter,totalPages}= useSelector((state) => state.intermederies)
    
     const fillCotent =() =>{ 
        if(error) return <Error/>
      
        return  <div className="w-full">
                <div className="flex w-full items-center justify-between">
                  <h1 className="lucitana text-2xl">Intermederiario</h1>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                  <Search placeholder="Buscar Intermediario..." />
                  <CreateIntermederies />
                   <DownloadExcel  data={intermediariesFilter} filename={"intermediarios.xlsx"} />
                </div>
                <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                    <Table query={query} currentPage={currentPage} />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                       <Suspense key={query + currentPage} fallback={<>cargando...</>}>
                          <Pagination     totalPages={totalPages} /> 
                       </Suspense>
                    </div>
              </div>
      }

    return  <Layout>
              {fillCotent()}
            </Layout>
        
}

export default Intermederies