
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import Search from "../../ui/customers/search";
import Layout from "../dashboard/layout";
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "../../ui/skeleton";
import Table from "../../ui/amparos/tables";
import Pagination from "../../ui/customers/pagination";
import { CreateAmparos, DownloadExcel } from "../../ui/customers/buttons";
import Error from "../../ui/Error";

const Amparos =() =>{
    
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("q") || "";
    const {error,totalPages,amparosFilter}= useSelector((state) => state.amparos)

    const fillCotent =() =>{ 
        if(error) return <Error/>
      
        return  <div className="w-full">
                <div className="flex w-full items-center justify-between">
                  <h1 className="lucitana text-2xl">Amparos</h1>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                  <Search placeholder="Buscar Amparos..." />
                  <CreateAmparos />
                   <DownloadExcel  data={amparosFilter} filename={"Sucursales.xlsx"} />
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
    return <Layout>
             {fillCotent()}
            </Layout>
}


export default Amparos