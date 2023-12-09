import * as yup from "yup";

export const schema = yup.object().shape({
  Firstname: yup
    .string()
    .required("First name is required")
    .matches(/^[A-Za-z]/, "First name must start with a letter"),
  Lastname: yup
    .string()
    .required("Last name is required")
    .matches(/^[A-Za-z]/, "Last name must start with a letter"),
  PresentAddress: yup
    .string()
    .required("Address is required")
    .matches(/^[A-Za-z]/, "Address must start with a letter"),
  // username: yup
  //   .string()
  //   .required("Username is required")
  //   .matches(/^[A-Za-z]/, "Username must start with a letter"),
  UniversityName: yup
    .string()
    .required("University name is required")
    .matches(/^[A-Za-z]/, "University name must start with a letter"),
  // educationalStatus: yup.string().required("Educational status is required"),
  Email: yup.string().email("Invalid email").required("Email is required"),
  Phone: yup
    .string()
    .matches(/^(01)\d{9}$/, "Invalid phone number")
    .required("Phone number is required"),
});
