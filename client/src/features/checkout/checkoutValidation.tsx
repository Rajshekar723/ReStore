import * as Yup from 'yup';

export const ValidationSchema = [
  Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    address1: Yup.string().required('Address is required'),
    address2: Yup.string().required(),
    city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
    zipCode: Yup.string().required('Zip code is required'),
    country: Yup.string().required('Country is required'),
  }),
  Yup.object(),
  Yup.object({
    nameOnCard: Yup.string().required('Name on card is required'),
    
  }),

]
  
