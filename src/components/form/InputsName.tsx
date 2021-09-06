import React from "react"

/* types */
import { IFormInputs } from "./index"
import { UseFormRegister, DeepMap, FieldError } from "react-hook-form"
import { useState } from "react"
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
  }: {
    register: UseFormRegister<IFormInputs>
    firstName: string
    lastName: string
    errors: DeepMap<IFormInputs, FieldError>
  } = props

  /* list the inputs */
  const [inputs, setInputs] = useState<Inputs>([
    { name: "firstName", class: "first-name", label: "First Name" },
    { name: "lastName", class: "last-name", label: "Last Name" },
  ])

  return (
    <>
      {inputs.map((input, index: number) => {
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
              // todo: load the page with a unic page url so that the defaul value refresh every time a the user click on a contact form the list
              defaultValue={input.name === "firstName" ? firstName : lastName}
            />
            <p className="form__error">{errors.firstName?.message}</p>
          </article>
        )
      })}
    </>
  )
}
