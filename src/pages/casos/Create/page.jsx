import Layout from "../../dashboard/layout"
import Breadcrumbs from "../../../ui/Breadcrumbs"
import Form from "../../../ui/casos/create-form"

const CreateCasesForm =() =>{


    return  <Layout>
              <div className="w-full">
                <Breadcrumbs
                breadcrumbs={[
                {label: 'Casos', href: '/dashboard/casos' },
                {label: 'Crear Casos',href: '/dashboard/casos/create',active: true,},
                ]}
            />
              <div className="mb-4 mt-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">Crear caso nuevo</h1>
                <p className="mt-1 text-sm text-slate-500">
                  Diligencia la información paso a paso para registrar el caso de forma rápida y sin perder visibilidad.
                </p>
              </div>
                <Form/>
              </div>
            </Layout>

}

export default CreateCasesForm
