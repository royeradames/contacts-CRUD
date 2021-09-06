/* libraries */
import React, { useState } from "react"

/* components */
import Contacts from "../components/Contacts"
import Form from "../components/form/index"
import SEO from "../components/SEO"

/* styles */
import "../styles/main.scss"

/* types */
export type Contact = {
  id: string
  firstName: string
  lastName: string
  emails: string[] | []
}

export type ContactList = Contact[]

export default function Home() {
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

  /* list of names of the contact panel */
  // todo: update name to contactList
  const [contacts, setContacts] = useState<ContactList>([])

  return (
    <main className="layout">
      <SEO title="AVB Contacts" />
      <Contacts
        setSelectedContact={setSelectedContact}
        setShowContactDetail={setShowContactDetail}
        contacts={contacts}
        setContacts={setContacts}
      />
      {showContactDetail ? (
        <Form
          selectedContact={selectedContact}
          setShowContactDetail={setShowContactDetail}
          contacts={contacts}
          setContacts={setContacts}
          setSelectedContact={setSelectedContact}
        />
      ) : (
        ""
      )}
    </main>
  )
}
