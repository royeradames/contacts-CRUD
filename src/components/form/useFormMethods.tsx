/* libraries */
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

/* types */
import { FormState } from "../../state/reducers/formReducer"
export interface IFormInputs {
  firstName: FormState["selectedContact"]["firstName"]
  lastName: FormState["selectedContact"]["lastName"]
  emails: FormState["selectedContact"]["emails"]
}
/* schema */
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required."),
  lastName: yup.string().required("Last name is required"),
})

export function useFormMethods() {
  /* import form fuctions */
  const {
    getValues,
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  })
  return {
    getValues,
    setValue,
    reset,
    register,
    handleSubmit,
    errors,
  }
}
