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
