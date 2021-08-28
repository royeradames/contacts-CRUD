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
