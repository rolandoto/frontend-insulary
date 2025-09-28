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
        body: JSON.stringify({ email, password })
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



   const LoginVerifyCode = async ({ code }) => {
    try {
      const resp = await fetch(`${config.serverRoute}/api/admin/VerifyCode`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({code}),
        credentials: "include"
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


   const Alldashboard = async ({token}) => {
    try {
      const resp = await fetch(`${config.serverRoute}/api/client/AllDashboard`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify()
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


   const PostIntermderies = async ({query,currentPage,token}) => {
    try {
      const resp = await fetch(`${config.serverRoute}/api/intermederies/PostIntermederies`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({query,currentPage})
      });
        if (!resp.ok) {
          
          throw new Error('Response is not ok');
        }
        const data = await resp.json();

        return data.intermederies
      } catch (error) {
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };

   const PostIntermderiesFilter = async ({query,currentPage,token}) => {
    try {
      const resp = await fetch(`${config.serverRoute}/api/intermederies/PostIntermederies`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({query,currentPage})
      });
        if (!resp.ok) {
          
          throw new Error('Response is not ok');
        }
        const data = await resp.json();

        return data.intermederiesFilter
      } catch (error) {
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };

     const PostIntermderiesTotalPage= async ({query,currentPage,token}) => {
        try {
          const resp = await fetch(`${config.serverRoute}/api/intermederies/PostIntermederiesTotalPages`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({query,currentPage})
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


  const fetchIntermederiesbyID = async ({id,token}) => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/intermederies/PostIntermederiesByID`, {
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

        return data.intermederies
      } catch (error) {
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };


     const PostBranches = async ({query,currentPage,token}) => {
        try {
          const resp = await fetch(`${config.serverRoute}/api/branches/PostBranches`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({query,currentPage})
          });
            if (!resp.ok) {
              
              throw new Error('Response is not ok');
            }
            const data = await resp.json();

            return data.branches
          } catch (error) {
            throw error; // You can re-throw the error or handle it differently based on your needs
          }
      };

      const PostBranchesFilter = async ({query,currentPage,token}) => {
        try {
          const resp = await fetch(`${config.serverRoute}/api/branches/PostBranches`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({query,currentPage})
          });
            if (!resp.ok) {
              
              throw new Error('Response is not ok');
            }
            const data = await resp.json();

            return data.intermederiesFilter
          } catch (error) {
            throw error; // You can re-throw the error or handle it differently based on your needs
          }
      };

      const PostBranchesTotalPage = async ({query,token}) => {
        try {
          const resp = await fetch(`${config.serverRoute}/api/branches/PostBranchesTotalPages`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({query})
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



      
     const PostAmparos= async ({query,currentPage,token}) => {
        try {
          const resp = await fetch(`${config.serverRoute}/api/amparos/postamparos`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({query,currentPage})
          });
            if (!resp.ok) {
              
              throw new Error('Response is not ok');
            }
            const data = await resp.json();

            return data.amparos
          } catch (error) {
            throw error; // You can re-throw the error or handle it differently based on your needs
          }
      }


       const PostAmparosFilter= async ({query,currentPage,token}) => {
        try {
          const resp = await fetch(`${config.serverRoute}/api/amparos/postamparos`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({query,currentPage})
          });
            if (!resp.ok) {
              
              throw new Error('Response is not ok');
            }
            const data = await resp.json();

            return data.amparosFilter
          } catch (error) {
            throw error; // You can re-throw the error or handle it differently based on your needs
          }
      }


      const fetchAmparosByID = async ({ id, token }) => {
        try {
          const resp = await fetch(`${config.serverRoute}/api/amparos/PostAmparosByID`, {
            method: "POST",
            body: JSON.stringify({ id }),
              headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
          });

          if (!resp.ok) {
            throw new Error("Response is not ok");
          }

          const data = await resp.json();
          return data.amparos;
        } catch (error) {
          throw error; // puedes manejarlo o relanzarlo según la necesidad
        }
      };

      
    const PostAmparosTotalPage = async ({ query, token }) => {
          try {
            const resp = await fetch(`${config.serverRoute}/api/amparos/PostAmparosTotalPages`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
              body: JSON.stringify({ query }),
            });

            if (!resp.ok) {
              throw new Error("Response is not ok");
            }

            const data = await resp.json();
            return data.totalPages;
          } catch (error) {
            throw error; // manejar o relanzar el error según tu necesidad
          }
    }


      
  const fetchBranchesbyID = async ({id,token}) => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/branches/PostBranchesByID`, {
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

        return data.branches
      } catch (error) {
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };


   const fetchCasesbyID = async ({id,token}) => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/client/PostCasesByID`, {
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

        return data.cases
      } catch (error) {
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };

  
   const FetchPostUpdateCasos = async ({id,token}) => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/client/PostUpdatetecasos`, {
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

        return data
      } catch (error) {
        throw error; // You can re-throw the error or handle it differently based on your needs
      }
  };

   const FetchPosStateCasos = async ({id,token}) => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/client/PostStateCasos`, {
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

        return data.estadosCasos
      } catch (error) {
        throw error; 
      }
  };


   const fetchRamos = async ({query,token}) => {
      try {
          const resp = await fetch(`${config.serverRoute}/api/ramos/PostRamos`, {
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

          return data.ramosFilter
        } catch (error) {
          throw error; // You can re-throw the error or handle it differently based on your needs
        }
    };


  const fetchAmparos = async ({query,token}) => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/ramos/PostRamos`, {
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

        return data.AmparosFilter
      } catch (error) {
        throw error; 
      }
  };


      const fetchCasosDocument = async ({id,token}) => {
          try {
              const resp = await fetch(`${config.serverRoute}/api/client/PostCasesDocumentByID`, {
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

              return data.estadosCasos
            } catch (error) {
              throw error; 
            }
      };


    const fetchDocument = async ({id,token}) => {
          try {
              const resp = await fetch(`${config.serverRoute}/api/client/documentIDCaso`, {
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

              return data.document
            } catch (error) {
              throw error; 
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
    fetchCasosFilter,
    Alldashboard,
    PostIntermderies,
    PostIntermderies,
    PostIntermderiesFilter,
    PostIntermderiesTotalPage,
    fetchIntermederiesbyID,
    PostBranches,
    PostBranchesTotalPage,
    PostBranchesFilter,
    fetchBranchesbyID,
    fetchRamos,
    fetchAmparos,
    fetchCasesbyID,
    FetchPostUpdateCasos,
    FetchPosStateCasos,
    fetchCasosDocument,
    fetchDocument,
    LoginVerifyCode,
    PostAmparos,
    PostAmparosTotalPage,
    PostAmparosFilter,
    fetchAmparosByID
  }