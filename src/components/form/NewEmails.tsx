/* libraries */
import React from "react"
import { useForm } from "react-hook-form"
import { useFormMethods } from "./useFormMethods"

// redux
import { useDispatch, useSelector } from "react-redux"
import { actionCreators } from "../../state"
import { bindActionCreators } from "redux"

/* SVGs */
import Add from "../../assets/plug-sign.svg"
import { useState } from "react"

/* types */
import { FormState } from "../../state/reducers/formReducer"

type NewEmailInputs = {
  email: string
}

export default function NewEmail() {
  /* redux */
  // get states
  const { contactEmails, selectedContact, formMethods } = useSelector(
    ({ form }: { form: FormState }) => {
      return {
        contactEmails: form.selectedContact.emails,
        selectedContact: form.selectedContact,
        formMethods: form.formMethods,
      }
    }
  )

  // get methods to update the states
  const dispatch = useDispatch()
  const { setSelectedContactEmails: setContactEmails, setSelectedContact } =
    bindActionCreators(actionCreators, dispatch)
  /* get form methods */
  const { getValues } = formMethods

  /* innit new contact email form */
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewEmailInputs>()

  const innitError = { type: "", message: "" }
  const [error, setError] = useState(innitError)

  /* save email */
  const onSubmit = ({ email }: NewEmailInputs) => {
    const notDuplicate = contactEmails.indexOf(email) === -1 ? true : false

    /* add to the unsave email list */
    // don't allow duplicates
    if (notDuplicate) {
      // save the text field inputs
      setSelectedContact({
        ...selectedContact,
        firstName: getValues("firstName"),
        lastName: getValues("lastName"),
      })

      // add new email
      setContactEmails([...contactEmails, email])

      /* reset text field */
      setValue("email", "")
      setError(innitError)
    } else {
      /* add an error message */
      setError({
        type: "duplicate",
        message: "This email is all ready on the list.",
      })
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="new-email"></form>
      <article className="emails__add-email">
        <button className="emails__add-email-icon" form="new-email">
          <Add />
        </button>
        <input
          className="emails__add-email-text-field"
          placeholder="Add email"
          {...register("email")}
          type="email"
          required={true}
          form="new-email"
        />
        <p className="emails__add-email-error">{error.message}</p>
      </article>
    </>
  )
}
