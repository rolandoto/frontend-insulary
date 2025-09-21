

import AcmeLogo from '../../ui/logo';
import { Button } from '../../ui/button';
import UseUsers from '../../hooks/UseUsers';
import {  useState } from 'react';
import useValidation from '../../hooks/useValidation';
import { IoKeyOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";

const useFormValues = () => {

  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target
      setFormValues({ ...formValues, [name]: value });
  };

  return [formValues, handleChange];
};

export default function LoginPage() {
  const { login,isError } = UseUsers();
  const [formValues, handleChange] = useFormValues();
  const validate = useValidation()
  const [formErrors, setFormErrors] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0){
      login({email:formValues.email,password:formValues.password})
    }
  };


  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto  flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full shadow  items-center justify-center rounded-lg bg-black p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
            
          </div>
        </div>
      
      <form  onSubmit={handleSubmit}   className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={` mb-3 text-2xl`}>
        Por favor, inicia sesión para continuar
        </h1>
        <div className="w-full">
            <div>
            <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email">
                Correo
            </label>
            <div className="relative">
                <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                name='email'
                value={formValues.email}
                onChange={handleChange}
                placeholder="Correo"
                />
                   <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
               
            </div>
            {formErrors?.email &&
                  <p className="mt-2 text-sm text-red-500" >
                    {formErrors.email}
                  </p>}
            </div>
            <div className="mt-4">
            <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password">
                Contraseña
            </label>
            <div className="relative">
                <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                 name='password'
                value={formValues.password}
                onChange={handleChange}
                placeholder="Contraseña"
                minLength={6}
                />
            <IoKeyOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {formErrors?.password &&
              <p className="mt-2 text-sm text-red-500" >
                {formErrors.password}
              </p>}

            {isError&& <p className="mt-2 text-sm text-red-500" >
                      No estas registrado
                  </p>}

            </div>
        </div>
          
      
        <Button className="mt-4 w-full">
        Acceder a la cuenta
        </Button>
        <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true">
        </div>
        </div>
      </form>
      </div>
    </main>
  );
}