/* libraries */
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"

/* SVGs */
import Add from "../../assets/plug-sign.svg"
import { useState } from "react"

/* types */
type IFormInputs = {
  email: string
}

export default function NewEmail({ setEmailList, emailList }) {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>()

  const innitError = { type: "", message: "" }
  const [error, setError] = useState(innitError)

  /* save email */
  const onSubmit = (data: IFormInputs) => {
    const { email } = data

    const notDuplicate = emailList.indexOf(email) === -1 ? true : false

    /* add to the unsave email list */
    // don't allow duplicates
    if (notDuplicate) {
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
  return <></>
}
