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

  return <></>
}
