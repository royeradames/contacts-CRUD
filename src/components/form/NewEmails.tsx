/* libraries */
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"

/* SVGs */
import Add from "../../assets/plug-sign.svg"
import { useState } from "react"

/* types */
import { UseFormGetValues } from "react-hook-form"
import { Contact, IFormInputs } from "../../pages"
import { EmailList } from "./index"
type NewEmailInputs = {
  email: string
}

export default function NewEmail({
  setEmailList,
  emailList,
  setSelectedContact,
  selectedContact,
  getValues,
}: {
  emailList: EmailList
  setEmailList: React.Dispatch<React.SetStateAction<EmailList>>
  setSelectedContact: React.Dispatch<React.SetStateAction<Contact>>
  selectedContact: Contact
  getValues: UseFormGetValues<IFormInputs>
}) {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewEmailInputs>()

  const innitError = { type: "", message: "" }
  const [error, setError] = useState(innitError)

  /* save email */
  const onSubmit = (data: NewEmailInputs) => {
    const { email } = data

    const notDuplicate = emailList.indexOf(email) === -1 ? true : false

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
      setEmailList([...emailList, email])

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
