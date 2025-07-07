import { useCallback } from 'react';

const useValidation = () => {
  const validate = useCallback((values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Nombre es requerido';
    }

    if (!values.email) {
      errors.email = 'Correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'El correo no es válido';
    }

    if (!values.password) {
      errors.password = 'Contraseña es requerida';
    }

    return errors;
  }, []);

  return validate;
};

export default useValidation;