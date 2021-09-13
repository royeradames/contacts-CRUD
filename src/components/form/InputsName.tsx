/* libraries */
import React, { useState } from "react"

// redux
import { useSelector } from "react-redux"
import { FormState } from "../../state/reducers/formReducer"

export default function InputsName() {
  /* redux */
  // get state
  const { firstName, lastName, formMethods } = useSelector(
    ({ form }: { form: FormState }) => {
      return {
        firstName: form.selectedContact.firstName,
        lastName: form.selectedContact.lastName,
        formMethods: form.formMethods,
      }
    }
  )

  /* get form methods */
  const { register, errors, setValue } = formMethods

  /* list the inputs */
  const [inputs, setInputs] = useState<
    {
      name: string
      class: string
      label: string
    }[]
  >([
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
            <p className="form__error">
              {input.name === "firstName"
                ? errors.firstName?.message
                : errors.lastName?.message}
            </p>
          </article>
        )
      })}
    </>
  )
}
