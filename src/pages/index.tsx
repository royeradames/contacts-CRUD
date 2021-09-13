/* libraries */
import React, { useState } from "react"
import { useFormMethods } from "../components/form/useFormMethods"

/* components */
import Contacts from "../components/Contacts"
import Form from "../components/form/index"
import SEO from "../components/SEO"

/* styles */
import "../styles/main.scss"

export default function Home() {
  const { getValues, setValue, reset, register, handleSubmit, errors } =
    useFormMethods()
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
