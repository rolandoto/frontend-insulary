import React, { Suspense } from "react";
import Layout from "../dashboard/layout";
import Search from "../../ui/customers/search";
import { useSearchParams } from "react-router";
import { InvoicesTableSkeleton } from "../../ui/skeleton";
import { CreateCustomers, DownloadExcel } from "../../ui/customers/buttons";
import { useSelector } from "react-redux";
import Pagination from "../../ui/customers/pagination";
import Error from "../../ui/Error";

const LazyTable = React.lazy(() =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import("../../ui/customers/table")), 500);
    })
  );

function Customers() {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("q") || "";
  const {totalPages,error,ClientFilter}= useSelector((state) => state.clients )

  const fillCotent =() =>{
    if(error) return <Error/>

    return  <div className="w-full">
    <div className="flex w-full items-center justify-between">
      <h1 className="lucitana text-2xl">Clientes</h1>
    </div>
    <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      <Search placeholder="Buscar clientes..." />
      <CreateCustomers />
      <DownloadExcel  data={ClientFilter} filename={"clients.xlsx"} />
    </div>
    <Suspense  key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
       <LazyTable query={query} currentPage={currentPage} />
    </Suspense>
    <div className="mt-5 flex w-full justify-center">
        <Pagination      totalPages={totalPages} /> 
    </div>
  </div>
  }
 
  return (
    <Layout>
     {fillCotent()}
    </Layout>
  );
}

export default Customers;
