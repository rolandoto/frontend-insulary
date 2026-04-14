import { config } from "../Config/Config";

// lib/data.ts

const fetchClient = async () => {
    try {
        const resp = await fetch(`${config.serverRoute}/api/client/GetClient`, {
          method: "GET",
          headers: {
            'Content-type': 'application/json'
          },
        });

        if (!resp.ok) {
          throw new Error('Response is not ok');
        }
        
        const query = await resp.json();
        console.log(query)
        return query;
      } catch (error) {
       
        throw error; // Puedes lanzar el error nuevamente o manejarlo de otra manera según tus necesidades
      }
  };

  export default {
    fetchClient
  }


  
