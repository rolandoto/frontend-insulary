
import { useSearchParams } from "react-router";
import { CreateBranches, DownloadExcel } from "../../ui/customers/buttons";
import Layout from "../dashboard/layout"
import { useSelector } from "react-redux";
import Search from "../../ui/customers/search";
import Table from "../../ui/Branches/table";
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "../../ui/skeleton";
import Pagination from "../../ui/customers/pagination";
import Error from "../../ui/Error";

const Branches =() =>{

    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("q") || "";

    const {error,totalPages,branchesFilter}= useSelector((state) => state.branches)

     const fillCotent =() =>{ 
        if(error) return <Error/>
      
        return  <div className="w-full">
                <div className="flex w-full items-center justify-between">
                  <h1 className="lucitana text-2xl">Sucursales</h1>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                  <Search placeholder="Buscar Surcursales..." />
                  <CreateBranches />
                   <DownloadExcel  data={branchesFilter} filename={"Sucursales.xlsx"} />
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

export default   Branches