/* libraries */
import React, { useState } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

/* components */
import Contacts from "../components/Contacts"
import Form from "../components/form/index"
import SEO from "../components/SEO"

/* styles */
import "../styles/main.scss"

/* types */
export interface IFormInputs {
  firstName: string
  lastName: string
  emails: string[]
}

export type Contact = {
  id: string
  firstName: string
  lastName: string
  emails: string[] | []
}

export type ContactList = Contact[]

/* schema */
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required."),
  lastName: yup.string().required("Last name is required"),
})

export default function Home() {
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
  /* detail information of a contact */
  const innitContact: Contact = {
    id: "",
    firstName: "",
    lastName: "",
    emails: [],
  }
  const [selectedContact, setSelectedContact] = useState(innitContact)

  /* toggle for detail panel */
  const [showContactDetail, setShowContactDetail] = useState(false)

  /* toggle CRUD error messages */
  // toggle contact duplication error
  const [isDuplicate, setIsDuplicate] = useState(false)
  // contact could not be save
  const [isFailSave, isSetFailSave] = useState(false)
  // contact could not be deleted
  const [isFailDelete, setIsFailDelete] = useState(false)

  /* list of names of the contact panel */
  // todo: update name to contactList
  const [contacts, setContacts] = useState<ContactList>([])

  return (
    <main className="layout">
      <SEO title="AVB Contacts" />
      <Contacts
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        setShowContactDetail={setShowContactDetail}
        contacts={contacts}
        setContacts={setContacts}
        reset={reset}
        setIsDuplicate={setIsDuplicate}
        isSetFailSave={isSetFailSave}
        setIsFailDelete={setIsFailDelete}
      />
      {showContactDetail ? (
        <Form
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
          setShowContactDetail={setShowContactDetail}
          contacts={contacts}
          setContacts={setContacts}
          setValue={setValue}
          reset={reset}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          getValues={getValues}
          isDuplicate={isDuplicate}
          setIsDuplicate={setIsDuplicate}
          isFailSave={isFailSave}
          isSetFailSave={isSetFailSave}
          isFailDelete={isFailDelete}
          setIsFailDelete={setIsFailDelete}
        />
      ) : (
        ""
      )}
    </main>
  )
}
