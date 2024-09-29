import * as yup from 'yup'

const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*,.]).{5,}$/

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a Valid Email")
    .required("Required"),
  username: yup
    .string()
    .min(5, 'Username must be atleast 5 charachters')
    .required('Required'),
  password: yup
    .string()
    .min(5)
    .matches(passwordPattern, { message: 'Incorrect Password Pattern' })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords must match")
    .required('Required')
})