
import Layout from "../dashboard/layout"
import React, { Suspense } from "react";
import { CreateCasos, DownloadExcel} from "../../ui/customers/buttons";
import { useSearchParams } from "react-router";
import Search from "../../ui/customers/search";
import { InvoicesTableSkeleton } from "../../ui/skeleton";
import Pagination from "../../ui/customers/pagination";
import { useSelector } from "react-redux";
import Error from "../../ui/Error";

const LazyTable = React.lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => resolve(import("../../ui/casos/table")), 500);
  })
);

const Casos =() =>{
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("q") || "";
  const {totalPages,error,casosFilter}= useSelector((state) => state.Casos )

  const fillCotent =() =>{
    if(error) return <Error/>

    return  <div className="w-full">
      
    <div className="w-full">
              <div className="flex w-full items-center justify-between">
                <h1 className="lucitana text-2xl">Casos</h1>
              </div>
              <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Buscar clientes..." />
                <CreateCasos />
                <DownloadExcel  data={casosFilter} filename={"casos.xlsx"}  />
              </div>
              <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <LazyTable query={query} currentPage={currentPage} />
              </Suspense>
              <div className="mt-5 flex w-full justify-center">
                <Pagination     totalPages={totalPages} /> 
              </div>
            </div>
  </div>
  }
    return <Layout>
              {fillCotent()}
            </Layout>

}

export default   Casos