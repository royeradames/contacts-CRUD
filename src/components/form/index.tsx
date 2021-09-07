/* libraries */
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { create } from "yup/lib/Reference"

/* components */
import InputsName from "./InputsName"

/* types */
import { Contact, ContactList } from "../../pages/index"
import ContactEmails from "./ContactEmails"
import ActionButtons from "./ActionButtons"
export interface IFormInputs {
  firstName: string
  lastName: string
  emails: string[]
}
export type EmailList = string[] | []

/* schema */
const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})

export default function Form(props) {
  const {
    /* list of the contact names */
    contacts,
    setContacts,

    /* current selected contact data */
    setSelectedContact,
  }: {
    contacts: ContactList
    setContacts: React.Dispatch<React.SetStateAction<ContactList>>
    setSelectedContact: React.Dispatch<React.SetStateAction<Contact>>
  } = props

  /* capture selected contact data */
  const { id, firstName, lastName, emails }: Contact = props.selectedContact

  /* UI render when email it's change */
  const [emailList, setEmailList] = useState<EmailList>(emails)

  /* import form fuctions */
  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  })

  /* update the email list when the contact changes */
  useEffect(() => {
    setEmailList(emails)
  }, [emails])

  return (
    <>
      <article className="form">
        <InputsName
          register={register}
          firstName={firstName}
          lastName={lastName}
          errors={errors}
          setValue={setValue}
        />
        <ContactEmails emailList={emailList} setEmailList={setEmailList} />
        {/* action buttons + host the contact-detail form element*/}
        <ActionButtons
          id={id}
          contacts={contacts}
          setContacts={setContacts}
          setSelectedContact={setSelectedContact}
          emailList={emailList}
          reset={reset}
          handleSubmit={handleSubmit}
          setShowContactDetail={props.setShowContactDetail}
        />
      </article>
    </>
  )
}
