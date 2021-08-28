/* libraries */
import React, { useEffect, useState } from "react"
import axios from "axios"

/* SVGs */
import Add from "../assets/plug-sign.svg"

/* types */
type Contact = {
  id: number
  firstName: string
  lastName: string
  email: string[] | []
}
type noContacts = {
  firstName: string
  lastName: string
}
type ContactList = Contact[] | noContacts[]
export default function Contacts(props) {
  const [contacts, setContacts] = useState<ContactList>([])

  /* assemple the contact names */
  const listContacts = (contacts: ContactList) => {
    /* list all names */
    return contacts.map((aContact: Contact | noContacts, index: number) => {
      return (
        <p
          key={index}
          className="contacts__name"
          onClick={() => {
            // show clicked contact
            props.setSelectedContact(aContact)
          }}
        >{`${aContact?.firstName} ${aContact?.lastName}`}</p>
      )
    })
  }
  return (
    <article>
      <article className="contacts__add">
        <h1 className="contacts__title">Contacts</h1>
        <Add className="contacts__add-icon" />
      </article>
      {listContacts(contacts)}
    </article>
  )
}
