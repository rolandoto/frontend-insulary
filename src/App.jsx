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

function App() {

  return (
    <Provider  store={store}>
      <AppWrapper>
          <BrowserRouter>
              <Routes>
                <Route  path='/' element={ < PublicRoute><LoginPage /></PublicRoute>  } />
                <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute> } />
                <Route path='/dashboard/customers' element={<PrivateRoute><Customers /></PrivateRoute> } />
                <Route path='dashboard/customers/create' element={ <PrivateRoute><CreateForm /></PrivateRoute> } />
                <Route path='/dashboard/customers/:id/edit' element={ <PrivateRoute><UpadateCustomers /></PrivateRoute>} />
                <Route path='/dashboard/invoices' element={ <PrivateRoute><Invoince /></PrivateRoute>} />
                <Route path='/dashboard/casos' element={<PrivateRoute><Casos /></PrivateRoute>} />
                <Route path='/dashboard/casos' element={<PrivateRoute><Casos /></PrivateRoute>} />
                <Route path='/dashboard/users' element={<PrivateRoute><Users /></PrivateRoute>} />
                <Route path='dashboard/users/create' element={ <PrivateRoute><CreateUsersForm /></PrivateRoute> } />
                <Route path='/dashboard/users/:id/edit' element={ <PrivateRoute><UpadateUsers /></PrivateRoute>} />
                <Route path='/dashboard/intermederies' element={ <PrivateRoute><Intermederies/></PrivateRoute>} />
                <Route path='/dashboard/intermederies/create' element={ <PrivateRoute><CreateIntermederiesForm/></PrivateRoute>} />
                 <Route path='/dashboard/intermederies/:id/edit' element={ <PrivateRoute><UpadateIntermederies/></PrivateRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
          </BrowserRouter>
    </AppWrapper>
    </Provider>
  )
}

export default App
