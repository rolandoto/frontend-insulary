import { Routes, Route,BrowserRouter } from "react-router"
import './App.css'
import Dashboard from './pages/dashboard/page'
import Invoince from './pages/invoince/page'
import Customers from './pages/customers.jsx/page'
import Casos from './pages/casos/page'
import store from "./store/page"
import { Provider } from "react-redux"
import CreateForm from "./pages/customers.jsx/create/page"
import UpadateCustomers from "./pages/customers.jsx/update/page"
import LoginPage from "./pages/login/page"
import PrivateRoute from "./AuthContext/PrivateRoute"
import AppWrapper from "./AuthContext/AppWrapper"
import NotFound from "./pages/noFound/not-found"
import PublicRoute from "./AuthContext/PublicRoute"
import Users from "./pages/users/page"
import CreateUsersForm from "./pages/users/create/page"
import UpadateUsers from "./pages/users/update/page"
import Intermederies from "./pages/Intermederies/page"
import CreateIntermederiesForm from "./pages/Intermederies/Create/page"
import UpadateIntermederies from "./pages/Intermederies/update/page"
import Branches from "./pages/Branches/pages"
import UpadateBranches from "./pages/Branches/update/page"
import CreateBranchesForm from "./pages/Branches/create/page"
import Text from "./pages/text"
import CreateCasesForm from "./pages/casos/Create/page"
import UpadateCases from "./pages/casos/update/page"
import DocumentCases from "./pages/casos/Document/page"
import ConfirmCodePage from "./pages/login/ConfirmCodePage"
import Amparos from "./pages/amparos/page"
import UpadateAmparos from "./pages/amparos/update/page"
import CreateAmparosForm from "./pages/amparos/create/page"
import Ramos from "./pages/ramos/page"
import UpadateRamos from "./pages/ramos/update/page"
import CreateRamosForm from "./pages/ramos/create/page"

function App() {

  return (
    <Provider  store={store}>
      <AppWrapper>
          <BrowserRouter>
              <Routes>
                <Route  path='/insula' element={ < PublicRoute><LoginPage /></PublicRoute>  } />
                <Route  path='/insula/ConfirmCode' element={ < PublicRoute><ConfirmCodePage /></PublicRoute>  } />
                <Route path='insula/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute> } />
                <Route path='insula/dashboard/customers' element={<PrivateRoute><Customers /></PrivateRoute> } />
                <Route path='insula/dashboard/customers/create' element={ <PrivateRoute><CreateForm /></PrivateRoute> } />
                <Route path='insula/dashboard/customers/:id/edit' element={ <PrivateRoute><UpadateCustomers /></PrivateRoute>} />
                <Route path='insula/dashboard/invoices' element={ <PrivateRoute><Invoince /></PrivateRoute>} />
                <Route path='insula/dashboard/casos' element={<PrivateRoute><Casos /></PrivateRoute>} />
                <Route path='insula/dashboard/casos/create' element={<PrivateRoute><CreateCasesForm /></PrivateRoute>} />
                <Route path='insula/dashboard/casos/:id/edit' element={<PrivateRoute><UpadateCases /></PrivateRoute>} />
                <Route path='insula/dashboard/casos/:id/Document' element={<PrivateRoute><DocumentCases /></PrivateRoute>} />
                <Route path='insula/dashboard/users' element={<PrivateRoute><Users /></PrivateRoute>} />
                <Route path='insula/dashboard/users/create' element={ <PrivateRoute><CreateUsersForm /></PrivateRoute> } />
                <Route path='insula/dashboard/users/:id/edit' element={ <PrivateRoute><UpadateUsers /></PrivateRoute>} />
                <Route path='insula/dashboard/intermederies' element={ <PrivateRoute><Intermederies/></PrivateRoute>} />
                <Route path='insula/dashboard/intermederies/create' element={ <PrivateRoute><CreateIntermederiesForm/></PrivateRoute>} />
                <Route path='insula/dashboard/intermederies/:id/edit' element={ <PrivateRoute><UpadateIntermederies/></PrivateRoute>} />
                <Route path='insula/dashboard/branches' element={ <PrivateRoute><Branches/></PrivateRoute>} />
                <Route path='insula/dashboard/branches/create' element={ <PrivateRoute><CreateBranchesForm/></PrivateRoute>} />
                <Route path='insula/dashboard/branches/:id/edit' element={ <PrivateRoute><UpadateBranches/></PrivateRoute>} />
                <Route path='insula/dashboard/amparos' element={ <PrivateRoute><Amparos/></PrivateRoute>} />
                <Route path='insula/dashboard/amparos/:id/edit' element={ <PrivateRoute><UpadateAmparos/></PrivateRoute>} />
                <Route path='insula/dashboard/amparos/create' element={ <PrivateRoute><CreateAmparosForm/></PrivateRoute>} />
                <Route path='insula/dashboard/ramos' element={ <PrivateRoute><Ramos/></PrivateRoute>} />
                <Route path='insula/dashboard/ramos/:id/edit' element={ <PrivateRoute><UpadateRamos/></PrivateRoute>} />
                <Route path='insula/dashboard/ramos/create' element={ <PrivateRoute><CreateRamosForm  Form/></PrivateRoute>} />
                <Route path='insula/text' element={ <Text/>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
          </BrowserRouter>
    </AppWrapper>
    </Provider>
  )
}

export default App
