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
export type noContacts = {
  firstName: string
  lastName: string
}
export type ContactList = Contact[] | noContacts[]

export default function Home() {
  const [selectedContact, setSelectedContact] = useState(false)
  const [showContactDetail, setShowContactDetail] = useState(false)

  return (
    <main className="layout">
      <SEO title="AVB Contacts" />
      <Contacts
        setSelectedContact={setSelectedContact}
        setShowContactDetail={setShowContactDetail}
      />
      {showContactDetail ? <Form selectedContact={selectedContact} /> : ""}
    </main>
  )
}
