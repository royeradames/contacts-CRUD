/* libraries */
import React, { useEffect, useState } from "react"
import axios from "axios"

/* SVGs */
import Add from "../assets/plug-sign.svg"

/* types */
import { Contact, noContacts, ContactList } from "../pages/index"

export default function Contacts(props) {
  const {
    contacts,
    setContacts,
  }: {
    contacts: ContactList
    setContacts: React.Dispatch<React.SetStateAction<ContactList>>
  } = props

  /* get the list of names when page first loads */
  useEffect(() => {
    axios
      .get("https://avb-contacts-api.herokuapp.com/contacts/paginated")
      .then(response => {
        setContacts(response.data.contacts)

        // on page load default to show the first contact
        const firstContact = response.data.contacts[0]
        props.setSelectedContact(firstContact)
        // show the form page
        props.setShowContactDetail(true)
      })
      .catch(error => {
        setContacts([{ firstName: "No", lastName: "contacts" }])
      })
  }, [])

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
