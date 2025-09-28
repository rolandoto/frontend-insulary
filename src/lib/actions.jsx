"use server";
import { z } from 'zod';
import { config } from '../Config/Config';
import { toast } from 'sonner';

const FormSchema = z.object({
  id: z.string(),
  name: z.string().nonempty('Por favor, ingresa un nombre.'),
  document: z.string().nonempty('Por favor, ingresa un número de documento.'),
  addres: z.string().nonempty('Por favor, ingresa una dirección.'),
  city: z.string().nonempty('Por favor, ingresa una ciudad.'),
  telefono: z
    .string()
    .nonempty('Por favor, ingresa un teléfono.')
    .min(7, { message: 'El teléfono debe tener al menos 7 dígitos.' }),
  email: z
    .string()
    .nonempty('Por favor, ingresa un correo electrónico.')
    .email('Correo inválido'),
  date: z.string(),
});

const CreateCustomers = FormSchema.omit({ id: true, date: true });

export async function createCustomers(token,prevState, formData) {

  const validatedFields = CreateCustomers.safeParse({
    name: formData.get("name"),
    document: formData.get("document"),
    addres: formData.get("addres"),
    city: formData.get("city"),
    telefono: formData.get("telefono"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Hay campos inválidos.',
    };
  }

    const [date,time] = new Date().toISOString().split("T")
    const dateUpdate  = `${date} ${time}`

  const {name,document,addres,city,telefono,email}  = validatedFields.data

  try {
    const res = await fetch(`${config.serverRoute}/api/client/PostRegisterClient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`, // ← Aquí va el token correctamente
        },
        body: JSON.stringify({name,document,addres,city,telefono,email,dateUpdate}),
      });
  
      if (!res.ok) {
        toast.error("Error en los datos")
        const response = await res.json();
        return {
            success: false,
            message: response.msg || 'Error al registrar cliente.',
            errors: response.errors ,
          };
      }
      const responseData = await res.json();
      toast.success("usuario guardado correctamente")
      return {
        message: "Cliente creado exitosamente",
        data: responseData,
      };
  } catch (err) {
   
    return {
        message:"error en el sistem"
  }
}

}

const UpdateCustomers = FormSchema.omit({ id: true, date: true });

export async function updateCustomers(id,token,prevState, formData) {

    const validatedFields = UpdateCustomers.safeParse({
      name: formData.get("name"),
      document: formData.get("document"),
      addres: formData.get("addres"),
      city: formData.get("city"),
      telefono: formData.get("telefono"),
      email: formData.get("email"),
    });
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Hay campos inválidos.',
      };
    }
  
      const [date,time] = new Date().toISOString().split("T")
      const dateUpdate  = `${date} ${time}`
    
    const {name,document,addres,city,telefono,email}  = validatedFields.data
    
    try {
        const res = await fetch(`${config.serverRoute}/api/client/PostUpdateClient`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`, // ← Aquí va el token correctamente
            },
            body: JSON.stringify({name,document,addres,city,telefono,email,dateUpdate,id}),
          });
          
          if (!res.ok) {
            const response = await res.json();
            toast.error("Error en los datos")
            return {
                success: false,
                message: response.msg || 'Error al registrar cliente.',
                errors: response.errors ,
              };
          }
          const responseData = await res.json();
          
          toast.success("usuario guardado correctamente")
          return {
            message: "Cliente creado exitosamente",
            data: responseData,
          };
    } catch (err) {

      toast.error("Algo paso en el sistema")
      return {
          message:"error en el sistem"
    }
  }
  
  }

  const FormSchemaUsers = z.object({
    id: z.string(),
    name: z.string().nonempty('Por favor, ingresa un nombre.'),
    email: z
      .string()
      .nonempty('Por favor, ingresa un correo electrónico.')
      .email('Correo inválido'),
    usersId:  z.string({invalid_type_error: 'Por favor elegir tu rol',}),
    password: z.string().nonempty('Por favor, ingresa tu contraseña.'),
  });
  
  const CreatUsers = FormSchemaUsers.omit({ id: true});


  export async function  createUsers(token,prevState, formData) {

    const validatedFields = CreatUsers.safeParse({
      name: formData.get("name"),
      usersId: formData.get("usersId"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Hay campos inválidos.',
      };
    }

    const {name,usersId,email,password}  = validatedFields.data
  
   
    try {
      const res = await fetch(`${config.serverRoute}/api/admin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`, // ← Aquí va el token correctamente

        },
        body: JSON.stringify({ name, email, password, idperfil: usersId }),
      });
    
      const responseData = await res.json();
    
      if (!res.ok) {
        toast.error(responseData.msg || 'Error al registrar cliente.');
        return {
          success: false,
          message: responseData.msg || 'Error al registrar cliente.',
          errors: responseData.errors,
        };
      }
    
      toast.success("Usuario guardado correctamente");
      return {
        success: true,
        message: "Cliente creado exitosamente",
        data: responseData,
      };
    } catch (error) {
      // Aquí silencias cualquier error como el de "You do not have permission..."
      console.warn('Error al enviar solicitud:', error.message);
      toast.error('Error inesperado al registrar cliente.');
      return {
        success: false,
        message: error.message || 'Error inesperado',
      };
    }
  
  }

  const UpdatetUsers = FormSchemaUsers.omit({ id: true});

  export async function updateUsers(id,token,prevState, formData) {

    const validatedFields = UpdatetUsers.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      usersId: formData.get("usersId"),
      password: formData.get("password"),
        });
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Hay campos inválidos.',
      };
    }
    const {name,email,usersId,password}  = validatedFields.data
    try {
      
      const res = await fetch(`${config.serverRoute}/api/admin/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`, // ← Aquí va el token correctamente

        },
        body: JSON.stringify({id, name, email, newPassword:password,idperfil:usersId}),
      });
    
      const responseData = await res.json();
    
      if (!res.ok) {
        toast.error(responseData.msg || 'Error al registrar cliente.');
        return {
          success: false,
          message: responseData.msg || 'Error al registrar cliente.',
          errors: responseData.errors,
        };
      }
    
      toast.success("Usuario guardado correctamente");
      return {
        success: true,
        message: "Cliente creado exitosamente",
        data: responseData,
      }

    } catch (err) {

      toast.error("Algo paso en el sistema")
      return {
          message:"error en el sistem"
    }
  }
  
  }

  export async function deleteCasos(id,token) {
    try {
      
      const res = await fetch(`${config.serverRoute}/api/client/DeleteGetReportecasos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`, // ← Aquí va el token correctamente
        },
        body: JSON.stringify({id}),
      });
    
      const responseData = await res.json();
    
      if (!res.ok) {
        toast.error(responseData.msg || 'Error al registrar cliente.');
        return {
          success: false,
          message: responseData.msg || 'Error al registrar cliente.',
          errors: responseData.errors,
        };
      }

      toast.success("Caso eliminado correctamente");
      window.location.reload()
      return {
        success: true,
        message: "Cliente creado exitosamente",
        data:"trye",
      }

      
    } catch (err) {

      toast.error("Algo paso en el sistema")
      return {
          message:"error en el sistem"
    }
  }
  
  }



const FormSchemaIntermederies = z.object({
  id: z.string(), // Suponemos que el ID es opcional o viene precargado
  name: z.string().nonempty('Por favor, ingresa un nombre completo.'),
  document: z.string().nonempty('Por favor, ingresa un número de documento.'),
  email: z
    .string()
    .nonempty('Por favor, ingresa un correo electrónico.')
    .email('El correo electrónico ingresado no es válido.'),
  addres: z.string().nonempty('Por favor, ingresa una dirección.'),
  tipo: z.string().nonempty('Por favor, selecciona un tipo.'),
  telefono: z.string().nonempty('Por favor, ingresa un número de teléfono.'),
});
  


const CreateIntermederies = FormSchemaIntermederies.omit({ id: true, date: true });

export async function createIntermederies(token,prevState, formData) {

  const validatedFields = CreateIntermederies.safeParse({
    name: formData.get("name"),
    document: formData.get("document"),
    addres: formData.get("addres"),
    telefono: formData.get("telefono"),
    tipo: formData.get("tipo"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Hay campos inválidos.',
    };
  }

  const {name,document,addres,tipo,telefono,email} = validatedFields.data

  try {

     const res = await fetch(`${config.serverRoute}/api/intermederies/PostRegisterIntermederies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`, // ← Aquí va el token correctamente
        },
        body: JSON.stringify({name,document,addres,tipo,telefono,email}),
      });
    
      const responseData = await res.json();
    
      if (!res.ok) {
        toast.error(responseData.msg || 'Error al registrar cliente.');
        return {
          success: false,
          message: responseData.msg || 'Error al registrar cliente.',
          errors: responseData.errors,
        };
      }

      toast.success("Caso eliminado correctamente");
      window.location.reload()
      return {
        success: true,
        message: "Cliente creado exitosamente",
        data:"trye",
      }


  } catch (err) {
   
    return {
        message:"error en el sistem"
  }
}

}



export async function updateIntermederies(id,token,prevState, formData) {
  
    const validatedFields = CreateIntermederies.safeParse({
          name: formData.get("name"),
          document: formData.get("document"),
          addres: formData.get("addres"),
          telefono: formData.get("telefono"),
          tipo: formData.get("tipo"),
          email: formData.get("email"),
    });
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Hay campos inválidos.',
      };
    }

    const {name,document,addres,tipo,telefono,email}  = validatedFields.data
    
    try {
   
       const res = await fetch(`${config.serverRoute}/api/intermederies/PostUpdateIntermederies`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`, // ← Aquí va el token correctamente
            },
            body: JSON.stringify({name,document,addres,tipo,telefono,email,id}),
          });
          if (!res.ok) {
            const response = await res.json();
            toast.error(response.msg || 'Error al registrar cliente.');
            return {
                success: false,
                message: response.msg || 'Error al registrar cliente.',
                errors: response.errors ,
              };
          }
          const responseData = await res.json();
          
          toast.success("usuario guardado correctamente")
          return {
            message: "Cliente creado exitosamente",
            data: responseData,
          };


    } catch (err) {
      console.log(err)
      toast.error("Algo paso en el sistema")
      return {
          message:"error en el sistem"
    }
  }
  
  }

const FormSchemaBranches = z.object({
  id: z.string(), // Suponemos que el ID es opcional o viene precargado
  name: z.string().nonempty('Por favor, ingresa un nombre completo.'),
  code: z.string().nonempty('Por favor, ingresa un número de codigo.'),
  addres: z.string().nonempty('Por favor, ingresa una dirección.'),
  telefono: z.string().nonempty('Por favor, ingresa un número de teléfono.'),
  clientId:  z.string({invalid_type_error: 'Por favor elegir tu cliente',}),
});

const branchesUpdate= FormSchemaBranches.omit({ id: true, date: true });

export async function createbranches(token,prevState, formData) {
  
    const validatedFields = branchesUpdate.safeParse({
          name: formData.get("name"),
          code: formData.get("code"),
          addres: formData.get("addres"),
          telefono: formData.get("telefono"),
          clientId: formData.get("clientId")
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Hay campos inválidos.',
      };
    }

    const {name,code,addres,telefono,clientId}  = validatedFields.data

    try {
      
       const res = await fetch(`${config.serverRoute}/api/branches/PostCreateBranches`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`, // ← Aquí va el token correctamente
            },
            body: JSON.stringify({name,code,addres,telefono,clientId}),
          });
          if (!res.ok) {
            const response = await res.json();
            toast.error(response.msg || 'Error al registrar cliente.');
            return {
                success: false,
                message: response.msg || 'Error al registrar cliente.',
                errors: response.errors ,
              };
          }
          const responseData = await res.json();
          
          toast.success("usuario guardado correctamente")
          return {
            message: "Cliente creado exitosamente",
            data: responseData,
          };

    } catch (err) {
      toast.error("Algo paso en el sistema")
      return {
          message:"error en el sistem"
      }
    }
    }

  export async function updatebranches(id,token,prevState, formData) {
  
    const validatedFields = branchesUpdate.safeParse({
          name: formData.get("name"),
          code: formData.get("code"),
          addres: formData.get("addres"),
          telefono: formData.get("telefono"),
          clientId: formData.get("clientId")
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Hay campos inválidos.',
      };
    }

    const {name,code,addres,telefono,clientId}  = validatedFields.data

    try {
   
       const res = await fetch(`${config.serverRoute}/api/branches/PostUpdateBranches`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`, // ← Aquí va el token correctamente
            },
            body: JSON.stringify({name,code,addres,telefono,clientId,id}),
          });
          if (!res.ok) {
            const response = await res.json();
            toast.error(response.msg || 'Error al registrar cliente.');
            return {
                success: false,
                message: response.msg || 'Error al registrar cliente.',
                errors: response.errors ,
              };
          }
          const responseData = await res.json();
          
          toast.success("usuario guardado correctamente")
          return {
            message: "Cliente creado exitosamente",
            data: responseData,
          };


    } catch (err) {
      console.log(err)
      toast.error("Algo paso en el sistema")
      return {
          message:"error en el sistem"
    }
  }
  
  }


  const FormSchemaCases= z.object({
        clientId: z.string().nonempty('Por favor, ingresa un nombre completo.'),
        branchId: z.string().nonempty('Por favor, ingresa un número de codigo.'),
        intermediaryId: z.string().nonempty('Por favor, ingresa una dirección.'),
        allocator: z.string().nonempty('Por favor, ingresa un número de teléfono.'),
        nameAsegurado: z.string().nonempty('Por favor, ingresa un número de teléfono.'),
        typeDocument_asegurado: z.string().nonempty('Por favor, ingresa un número de teléfono.'),
        Document_asegurado: z.string().nonempty('Por favor, ingresa un número de teléfono.'),
        telefono_asegurado: z.string().nonempty('Por favor, ingresa un número de teléfono.'),
        addres_asegurado: z.string().nonempty('Por favor, ingresa un número de teléfono.'),
        correo_asegurado: z.string().nonempty('Por favor, ingresa un número de teléfono.').email('Correo inválido'),
        poliza_asegurado: z.string().nonempty('Por favor, ingresa un número de teléfono.'),
        ramo_asegurado: z.string().nonempty('Por favor, ingresa un número de teléfono.'),
        amparos_asegurado: z.string().nonempty('Por favor, ingresa un número de teléfono.'),
        name_tomador: z.string().nonempty('Por favor, ingresa un nombre completo.'),
        typeDocument_tomador: z.string().nonempty('Por favor, ingresa un número de documento.'),
        Document_tomador: z.string().nonempty('Por favor, ingresa un número de documento.'),
        telefono_tomador: z.string().nonempty('Por favor, ingresa un número de teléfono.'),
        addres_tomador: z.string().nonempty('Por favor, ingresa una dirección.'),
        correo_tomador: z.string().nonempty('Por favor, ingresa un correo electrónico.').email('Correo inválido'),
        fechaSiniestro_tomador: z.string().nonempty('Por favor, ingresa una fecha de siniestro.'),
        fechaAviso_tomador: z.string().nonempty('Por favor, ingresa una fecha de aviso.'),
        fechaAsignacion_tomador: z.string().nonempty('Por favor, ingresa  una fecha de asignación.'),
        relato_hechos: z.string().nonempty('Por favor, ingresa un relato de hechos.'),
        Caso: z.string().nonempty('Por favor, ingresa un Caso.'),
        Placa_Asegurada: z.string().nonempty('Por favor, ingresa una Placa Asegurada.'),
        Valor_Reserva: z.string().nonempty('Por favor, ingresa un Valor Reserva.'),
        Valor_Indemnización: z.string().nonempty('Por favor, ingresa un Valor Indemnización.'),
        Siniestro: z.string().nonempty('Por favor, ingresa un Sini  estro.'),
        Placa_Tercero: z.string().nonempty('Por favor, ingresa una Placa Tercero.'),
        Carpeta: z.string().nonempty('Por favor, ingresa una Carpeta. '),
        generador_carga:z.string().nonempty('Por favor, ingresa Generador de carga. '),
        litisoft:z.string().nonempty('Por favor, ingresa litisoft. '),
        referencia_uib:z.string().nonempty('Por favor, ingresa referencia uib. '),
        nombre_tercero:z.string().nonempty('Por favor, Nombre tercero '),
        apoderado:z.string().nonempty('Por favor, Nombre Apoderado '),
      });

  const branches= FormSchemaCases.omit({ id: true, 
                                          date: true,
                                          litisoft:true,
                                          referencia_uib:true,
                                          nombre_tercero:true,
                                          apoderado:true,
                                          Caso:true,
                                          generador_carga:true,
                                          Placa_Tercero:true,
                                          Placa_Asegurada:true});

  export async function createCases(token,prevState, formData) {
    
  
    const validatedFields = branches.safeParse({
        clientId: formData.get("clientId"),
        branchId: formData.get("branchId"),
        intermediaryId: formData.get("intermediaryId"),
        allocator: formData.get("allocator"),
        nameAsegurado: formData.get("nameAsegurado"),
        typeDocument_asegurado: formData.get("typeDocument_asegurado"),
        Document_asegurado: formData.get("Document_asegurado"),
        telefono_asegurado: formData.get("telefono_asegurado"),
        addres_asegurado: formData.get("addres_asegurado"),
        correo_asegurado: formData.get("correo_asegurado"),
        poliza_asegurado: formData.get("poliza_asegurado"),
        ramo_asegurado: formData.get("ramo_asegurado"),
        amparos_asegurado: formData.get("amparos_asegurado"),
        name_tomador: formData.get("name_tomador"),
        typeDocument_tomador: formData.get("typeDocument_tomador"),
        Document_tomador: formData.get("Document_tomador"),
        telefono_tomador: formData.get("telefono_tomador"),
        addres_tomador: formData.get("addres_tomador"),
        correo_tomador: formData.get("correo_tomador"),
        fechaSiniestro_tomador: formData.get("fechaSiniestro_tomador"),
        fechaAviso_tomador: formData.get("fechaAviso_tomador"),
        fechaAsignacion_tomador: formData.get("fechaAsignacion_tomador"),
        relato_hechos: formData.get("relato_hechos"),
        Caso: formData.get("Caso"),
        Placa_Asegurada: formData.get("Placa_Asegurada"),
        Valor_Reserva: formData.get("Valor_Reserva"),
        Valor_Indemnización: formData.get("Valor_Indemnización"),
        Siniestro: formData.get("Siniestro"),
        Placa_Tercero: formData.get("Placa_Tercero"),
        Carpeta: formData.get("Carpeta"),
        generador_carga:formData.get("generador_carga"),
        litisoft:formData.get("litisoft"),
        referencia_uib:formData.get("referencia_uib"),
        nombre_tercero:formData.get("nombre_tercero"),
        apoderado:formData.get("apoderado"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Hay campos inválidos.',
      };
    }
  const {clientId,
         branchId,
        intermediaryId,
        allocator, 
        nameAsegurado,
        typeDocument_asegurado, 
        Document_asegurado,
        telefono_asegurado, 
        addres_asegurado, 
        correo_asegurado, 
        poliza_asegurado, 
        ramo_asegurado, 
        amparos_asegurado, 
        name_tomador, 
        typeDocument_tomador, 
        Document_tomador, 
        telefono_tomador, 
        addres_tomador, 
        correo_tomador, 
        fechaSiniestro_tomador, 
        fechaAviso_tomador, 
        fechaAsignacion_tomador, 
        relato_hechos, 
        Caso, 
        Placa_Asegurada, 
        Valor_Reserva, 
        Valor_Indemnización, 
        Siniestro, 
        Placa_Tercero, 
        Carpeta,
        generador_carga,
        litisoft,
        referencia_uib,
        nombre_tercero,
        apoderado}  = validatedFields.data

       try {
   
       const res = await fetch(`${config.serverRoute}/api/client/PostCreatetecasos`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`, // ← Aquí va el token correctamente
            },
            body: JSON.stringify({clientId, branchId, intermediaryId, allocator, nameAsegurado, typeDocument_asegurado, Document_asegurado, telefono_asegurado, addres_asegurado, correo_asegurado, poliza_asegurado, ramo_asegurado, amparos_asegurado, name_tomador, typeDocument_tomador, Document_tomador, telefono_tomador, addres_tomador, correo_tomador, fechaSiniestro_tomador, fechaAviso_tomador, fechaAsignacion_tomador, relato_hechos, Caso, Placa_Asegurada, Valor_Reserva, Valor_Indemnización, Siniestro, Placa_Tercero, Carpeta,
                                generador_carga,
                                litisoft,
                                referencia_uib,
                                nombre_tercero,
                                apoderado
            }),
          });
          if (!res.ok) {
            const response = await res.json();
            toast.error(response.msg || 'Error al registrar cliente.');
            return {
                success: false,
                message: response.msg || 'Error al registrar cliente.',
                errors: response.errors ,
              };
          }
          const responseData = await res.json();
          
          toast.success("usuario guardado correctamente")
          return {
            message: "Cliente creado exitosamente",
            data: responseData,
          };

    } catch (err) {
      console.log(err)
      toast.error("Algo paso en el sistema")
      return {
          message:"error en el sistem"
    }
  }

  }


     
  export async function updateCasos(id,token,prevState, formData) {

    const payload = {
  // Estado del caso
  estadosCasos: formData.get("estadosCasos"),

  // Identificadores de sistema
  clientId: formData.get("clientId"),
  branchId: formData.get("branchId"),
  intermediaryId: formData.get("intermediaryId"),
  allocator: formData.get("allocator"),

  // Datos del Asegurado
  nameAsegurado: formData.get("nameAsegurado"),
  typeDocument_asegurado: formData.get("typeDocument_asegurado"),
  Document_asegurado: formData.get("Document_asegurado"),
  telefono_asegurado: formData.get("telefono_asegurado"),
  addres_asegurado: formData.get("addres_asegurado"),
  correo_asegurado: formData.get("correo_asegurado"),
  poliza_asegurado: formData.get("poliza_asegurado"),
  ramo_asegurado: formData.get("ramo_asegurado"),
  amparos_asegurado: formData.get("amparos_asegurado"),

  // Datos del Tomador
  name_tomador: formData.get("name_tomador"),
  typeDocument_tomador: formData.get("typeDocument_tomador"),
  Document_tomador: formData.get("Document_tomador"),
  telefono_tomador: formData.get("telefono_tomador"),
  addres_tomador: formData.get("addres_tomador"),
  correo_tomador: formData.get("correo_tomador"),

  // Fechas del siniestro
  fechaSiniestro_tomador: formData.get("fechaSiniestro_tomador"),
  fechaAviso_tomador: formData.get("fechaAviso_tomador"),
  fechaAsignacion_tomador: formData.get("fechaAsignacion_tomador"),

  relato_hechos: formData.get("relato_hechos"),
  Caso: formData.get("Caso"),
  Siniestro: formData.get("Siniestro"),

  Placa_Asegurada: formData.get("Placa_Asegurada"),
  Placa_Tercero: formData.get("Placa_Tercero"),
  Valor_Reserva: formData.get("Valor_Reserva"),
  Valor_Indemnización: formData.get("Valor_Indemnización"),
  Carpeta: formData.get("Carpeta"),
  generador_carga:formData.get("generador_carga"),
  litisoft:formData.get("litisoft"),
  referencia_uib:formData.get("referencia_uib"),
  nombre_tercero:formData.get("nombre_tercero"),
  apoderado:formData.get("apoderado"),
};
    
    const {estadosCasos,clientId, branchId, intermediaryId, allocator, nameAsegurado, typeDocument_asegurado, Document_asegurado, telefono_asegurado, addres_asegurado, correo_asegurado, poliza_asegurado, ramo_asegurado, amparos_asegurado, name_tomador, typeDocument_tomador, Document_tomador, telefono_tomador, addres_tomador, correo_tomador, fechaSiniestro_tomador, fechaAviso_tomador, fechaAsignacion_tomador, relato_hechos, Caso, Placa_Asegurada, Valor_Reserva, Valor_Indemnización, Siniestro, Placa_Tercero, Carpeta,
       generador_carga,
                                litisoft,
                                referencia_uib,
                                nombre_tercero,
                                apoderado
    }  = payload
    

    try {
      
        const res = await fetch(`${config.serverRoute}/api/client/PostUpdatetecasos`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`, // ← Aquí va el token correctamente
            },
            body: JSON.stringify({id,estadosCasos,clientId, branchId, intermediaryId, allocator, nameAsegurado, typeDocument_asegurado, Document_asegurado, telefono_asegurado, addres_asegurado, correo_asegurado, poliza_asegurado, ramo_asegurado, amparos_asegurado, name_tomador, typeDocument_tomador, Document_tomador, telefono_tomador, addres_tomador, correo_tomador, fechaSiniestro_tomador, fechaAviso_tomador, fechaAsignacion_tomador, relato_hechos, Caso, Placa_Asegurada, Valor_Reserva, Valor_Indemnización, Siniestro, Placa_Tercero, Carpeta,
               generador_carga,
                                litisoft,
                                referencia_uib,
                                nombre_tercero,
                                apoderado
            }),
          });
          if (!res.ok) {
            const response = await res.json();
         
            toast.error(response.msg || 'Error al registrar cliente.');
            return {
                success: false,
                message: response.msg || 'Error al registrar cliente.',
                errors: response.errors ,
              };
          }
          const responseData = await res.json();
          
          toast.success("usuario guardado correctamente")
          return {
            message: "Cliente creado exitosamente",
            data: responseData,
          };

    } catch (err) {

      toast.error("Algo paso en el sistema")
      return {
          message:"error en el sistem"
    }
  }
  
  }



const FormSchemaDocument = z.object({
  id: z.string(), // Suponemos que el ID es opcional o viene precargado
  name: z.string().nonempty('Por favor, ingresa un nombre completo.'),
  description: z.string().nonempty('Por favor, ingresa un número de codigo.'),
  file: z
      .any()
      .refine((file) => file instanceof File, {
        message: "Debe adjuntar un archivo",
      })
      .refine((file) => file.size > 0, {
        message: "Debe adjuntar un archivo válido",
      }),
});

const documentUload= FormSchemaDocument.omit({ id: true, date: true });


   export async function uploadCasos(id,token,prevState, formData) {

      const validatedFields = documentUload.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        file: formData.get("file"),
  });
 
   if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Hay campos inválidos.',
      };
    }

    const {name,description,file} =validatedFields.data
    
    try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("file", file)
            formData.append("id", id)
            formData.append("token", token)


      const res = await fetch(`${config.serverRoute}/api/client/document`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`, // ✅ solo este
        },
        body: formData,
      });

      if (!res.ok) {
        const response = await res.json();
        toast.error(response.msg || 'Error al registrar cliente.');
        return {
          success: false,
          message: response.msg || 'Error al registrar cliente.',
          errors: response.errors,
        };
      }

      const responseData = await res.json();

      toast.success("Guardado correctamente");

      return "correctamente"
    } catch (err) {

      toast.error("Algo paso en el sistema")
      return {
          message:"error en el sistem"
    }
  }
  
  }
  const FormSchemaAmparos = z.object({
  name: z.string().nonempty('Por favor, ingresa un nombre completo.'),
});

export async function updateAmparos(id,token,prevState, formData) {

    const validatedFields = FormSchemaAmparos.safeParse({
          name: formData.get("name")
    });
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Hay campos inválidos.',
      };
    }

    const {name}  = validatedFields.data
    
    try {
          const res = await fetch(`${config.serverRoute}/api/amparos/PostUpdateAmparos`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ name, id }),
        });
          if (!res.ok) {
            const response = await res.json();
            toast.error(response.msg || 'Error al registrar cliente.');
            return {
                success: false,
                message: response.msg || 'Error al registrar cliente.',
                errors: response.errors ,
              };
          }
              const responseData = await res.json();
              
              toast.success("guardado correctamente")
              return {
                message: " creado exitosamente",
                data: responseData,
      };

    } catch (err) {
      console.log({err})
      toast.error("Algo paso en el sistema")
      return {
          message:"error en el sistem"
    }
  }
  
}


export async function createAmparos(token,prevState, formData) {

    const validatedFields = FormSchemaAmparos.safeParse({
          name: formData.get("name")
    });
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Hay campos inválidos.',
      };
    }

    const {name}  = validatedFields.data
    
    try {

        const res = await fetch(`${config.serverRoute}/api/amparos/PostCreateAmparos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ name}),
        });
          if (!res.ok) {
            const response = await res.json();
            toast.error(response.msg || 'Error al registrar cliente.');
            return {
                success: false,
                message: response.msg || 'Error al registrar cliente.',
                errors: response.errors ,
              };
          }
              const responseData = await res.json();
              
              toast.success("guardado correctamente")
              return {
                message: " creado exitosamente",
                data: responseData,
      };

    } catch (err) {
      console.log({err})
      toast.error("Algo paso en el sistema")
      return {
          message:"error en el sistem"
    }
  }
  
}

  

