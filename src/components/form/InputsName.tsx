import React, { useState } from "react"

/* types */
import { IFormInputs } from "../../pages/index"
import {
  UseFormRegister,
  DeepMap,
  FieldError,
  UseFormSetValue,
} from "react-hook-form"
export type Inputs = {
  name: string
  class: string
  label: string
}[]
export default function InputsName(props) {
  /* catch inputs data and methods */
  const {
    register,
    firstName,
    lastName,
    errors,
    setValue,
  }: {
    register: UseFormRegister<IFormInputs>
    firstName: string
    lastName: string
    errors: DeepMap<IFormInputs, FieldError>
    setValue: UseFormSetValue<IFormInputs>
  } = props

  /* list the inputs */
  const [inputs, setInputs] = useState<Inputs>([
    { name: "firstName", class: "first-name", label: "First Name" },
    { name: "lastName", class: "last-name", label: "Last Name" },
  ])

  return (
    <>
      {inputs.map((input, index: number) => {
        /* set the text fields values to the given names */
        const isFirstNameField = input.name === "firstName"
        isFirstNameField
          ? setValue("firstName", firstName)
          : setValue("lastName", lastName)

        return (
          <article
            className={`form__input form__${input.class}-input`}
            key={index}
          >
            <label className={`form__${input.class} form__label`}>
              {input.label}
            </label>
            <input
              form="contact-details"
              className={`form__text-field form__${input.class}`}
              {...register(
                input.name === "firstName" ? "firstName" : "lastName"
              )}
            />
            <p className="form__error">{errors.firstName?.message}</p>
          </article>
        )
      })}
    </>
  )
}
