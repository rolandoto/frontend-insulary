
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import Search from "../../ui/customers/search";
import Layout from "../dashboard/layout";
import { CreateRamos, DownloadExcel } from "../../ui/customers/buttons";
import Error from "../../ui/Error";
import { Suspense } from "react";
import Table from "../../ui/ramos/tables";
import { InvoicesTableSkeleton } from "../../ui/skeleton";
import Pagination from "../../ui/customers/pagination";

const Ramos =() =>{
    
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("q") || "";

    const {error,totalPages,ramosFilter}= useSelector((state) => state.ramos)

    const fillCotent =() =>{ 
        if(error) return <Error/>
      
        return  <div className="w-full">
                <div className="flex w-full items-center justify-between">
                  <h1 className="lucitana text-2xl">Ramos</h1>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                  <Search placeholder="Buscar Ramos..." />
                  <CreateRamos />
                    <DownloadExcel  data={ramosFilter} filename={"Ramos.xlsx"} />
                </div>
                 <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                        <Table query={query} currentPage={currentPage} />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                   <Suspense key={query + currentPage} fallback={<>cargando...</>}>
                        <Pagination    totalPages={totalPages} /> 
                    </Suspense>
                </div>
              </div>
      }

    return <Layout>
             {fillCotent()}
            </Layout>
}


export default Ramos