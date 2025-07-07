import { config } from "../Config/Config";

const fetchClients = async ({query,currentPage,token}) => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/client/PostClient`, {
          method: "POST",
          body: JSON.stringify({query,currentPage}),
          headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`, // ← Aquí va el token correctamente
          },
        });
        if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const data = await resp.json();
        return data.clients
        
      } catch (error) {
       
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };


  const fetchClientsFilter = async ({query,currentPage,token}) => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/client/PostClient`, {
          method: "POST",
          body: JSON.stringify({query,currentPage}),
          headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`, // ← Aquí va el token correctamente
          },
        });
        if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const data = await resp.json();
        return data.clientsFilter
        
      } catch (error) {
       
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };

  const fetchUsers   = async ({query, currentPage,token}) => {
    try {
      const resp = await fetch(`${config.serverRoute}/api/admin/users`, {
        method: "post",
        body: JSON.stringify({query,currentPage}),
        headers: {
            'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`
        },
      });
      if (!resp.ok) {
        throw new Error('Response is not ok');
      }
      const data = await resp.json();
      return data.users
      
    } catch (error) {
     
      throw error; // You can re-throw the error or handle it differently based on your needs
    }
  };


  const fetchUsersFilter   = async ({query, currentPage,token}) => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/admin/users`, {
          method: "post",
          body: JSON.stringify({query,currentPage}),
          headers: {
              'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
          },
        });
        if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const data = await resp.json();
        return data.usersFilter
        
      } catch (error) {
       
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };

 

 

  const fetchCasos = async ({query,currentPage,token}) => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/client/GetReportecasos`, {
          method: "POST",
          body: JSON.stringify({query,currentPage}),
          headers: {
              'Content-type': 'application/json',
               'Authorization': `Bearer ${token}`
          },
        });
        if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const data = await resp.json();
        return data.query
        
      } catch (error) {
       
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };

  const fetchCasosFilter = async ({query,currentPage,token}) => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/client/GetReportecasos`, {
          method: "POST",
          body: JSON.stringify({query,currentPage}),
          headers: {
              'Content-type': 'application/json',
               'Authorization': `Bearer ${token}`
          },
        });
        if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const data = await resp.json();
        return data.casosFilter
        
      } catch (error) {
       
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };

  const fetchClientFilterpage = async ({query,token}) => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/client/PostClientsTotalPages`, {
          method: "POST",
          body: JSON.stringify({query,token}),
          headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`, // ← Aquí va el token correctamente
          },
        });
        if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const data = await resp.json();

        return data.totalPages
      } catch (error) {
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };


  const fetchUsersRoles = async ({token}) => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/admin/roles`, {
          method: "POST",
          headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
        });
        if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const data = await resp.json();

        return data.query
      } catch (error) {
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };

  const fetchUserTotalPages = async ({query,token}) => {

    try {
        const resp = await fetch(`${config.serverRoute}/api/admin/usersTotalPages`, {
          method: "POST",
          body: JSON.stringify({query,token}),
          headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
        });
        if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const data = await resp.json();

        return data.totalPages
      } catch (error) {
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };


  const fetchCasosFilterpage = async ({query,token}) => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/client/PostCasosTotalPages`, {
          method: "POST",
          body: JSON.stringify({query}),
          headers: {
              'Content-type': 'application/json',
               'Authorization': `Bearer ${token}`
          },
        });
        if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const data = await resp.json();
 
        return data.totalPages
      } catch (error) {
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };


  const fetchClientByID = async ({id,token}) => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/client/PostClientByID`, {
          method: "POST",
          body: JSON.stringify({id}),
          headers: {
              'Content-type': 'application/json',
               'Authorization': `Bearer ${token}`
          },
        });
        if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const data = await resp.json();

        return data.clients
      } catch (error) {
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };

  const fetchUsersByID = async ({id,token}) => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/admin/GetUsersById`, {
          method: "POST",
          body: JSON.stringify({id}),
          headers: {
              'Content-type': 'application/json',
               'Authorization': `Bearer ${token}`
          },
        });
        if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        const data = await resp.json();

        return data.users
      } catch (error) {
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };

const GetRefrestToken = async () => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/admin/RefresToken`, {
          method: "GET",
          headers: {
            'Content-type': 'application/json'
          },
          credentials:"include"
        });
        if (!resp.ok) {
          throw new Error('Response is not ok');
        }   
        const data= await resp.json();
        return data.accessToken
      } catch (error) {
       
        throw error; // Puedes lanzar el error nuevamente o manejarlo de otra manera según tus necesidades
      }
  }

  const LoginUser = async ({ email, password }) => {
    try {
      const resp = await fetch(`${config.serverRoute}/api/admin/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: "include" // ✅ DEBE estar aquí, no fuera
      });
        if (!resp.ok) {
          
          throw new Error('Response is not ok');
        }
        const data = await resp.json();

        return data
      } catch (error) {
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };

  export default {
    fetchClients,
    fetchClientsFilter,
    fetchClientFilterpage,
    fetchClientByID,
    LoginUser,
    GetRefrestToken,
    fetchCasos,
    fetchCasosFilterpage,
    fetchUsers,
    fetchUserTotalPages,
    fetchUsersRoles,
    fetchUsersByID,
    fetchUsersFilter,
    fetchCasosFilter
  }