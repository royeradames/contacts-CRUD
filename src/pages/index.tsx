/* libraries */
import React, { useEffect } from "react"
import { useFormMethods } from "../components/form/useFormMethods"
// redux
import { useSelector, useDispatch } from "react-redux"
import { actionCreators } from "../state/index"
import { bindActionCreators } from "redux"
/* components */
import Contacts from "../components/Contacts"
import Form from "../components/form/index"
import SEO from "../components/SEO"

/* styles */
import "../styles/main.scss"
import { FormState } from "../state/reducers/formReducer"

export default function Home() {
  /* redux */
  // get states
  const { showContactDetail } = useSelector(({ form }: { form: FormState }) => {
    return {
      showContactDetail: form.showContactDetail,
    }
  })

  // get methods to update states
  const dispatch = useDispatch()
  const { setFormMethods } = bindActionCreators(actionCreators, dispatch)
  const { getValues, setValue, reset, register, handleSubmit, errors } =
    useFormMethods()

  /* save form methods to redux store for global use */
  useEffect(() => {
    setFormMethods({
      getValues,
      setValue,
      reset,
      register,
      handleSubmit,
      errors,
    })
  }, [])

  return (
    <main className="layout">
      <SEO title="AVB Contacts" />
      <Contacts />
      {showContactDetail ? <Form /> : ""}
    </main>
  )
}
