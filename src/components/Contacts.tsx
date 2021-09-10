/* libraries */
import React, { useEffect } from "react"
import axios from "axios"
/* SVGs */
import Add from "../assets/plug-sign.svg"

/* types */
import { UseFormReset } from "react-hook-form"
import { Contact, ContactList, IFormInputs } from "../pages/index"

export default function Contacts(props) {
  const {
    selectedContact,
    contacts,
    setContacts,
    reset,
    setIsDuplicate,
    isSetFailSave,
    setIsFailDelete,
  }: {
    selectedContact: Contact
    contacts: ContactList
    setContacts: React.Dispatch<React.SetStateAction<ContactList>>
    reset: UseFormReset<IFormInputs>
    setIsDuplicate: React.Dispatch<React.SetStateAction<boolean>>
    isSetFailSave: React.Dispatch<React.SetStateAction<boolean>>
    setIsFailDelete: React.Dispatch<React.SetStateAction<boolean>>
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
      .catch(() => {
        setContacts([
          { id: "-1", firstName: "No", lastName: "contacts", emails: [] },
        ])
      })
  }, [])

  /* assemple the contact names */
  const listContacts = (contacts: ContactList) => {
    /* sort by name */
    contacts.sort(function (a, b) {
      var nameA = `${a.firstName} ${a.lastName}`.toUpperCase() // ignore upper and lowercase
      var nameB = `${b.firstName} ${b.lastName}`.toUpperCase() // ignore upper and lowercase
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }

      // names must be equal
      return 0
    })
    /* list all names */
    return contacts.map((aContact: Contact, index: number) => {
      const lastIndex = contacts.length - 1
      const isLastContact = lastIndex === index
      const contactName = `${aContact?.firstName} ${aContact?.lastName}`
      const selectedContactName = `${selectedContact?.firstName} ${selectedContact?.lastName}`
      const isContactName = contactName === selectedContactName
      return (
        <button
          key={index}
          className={`contacts__name 
          ${isLastContact ? "contacts__name-last" : ""}
          ${
            // add a unic class to the contact name that is being display
            isContactName ? "contacts__name-highlight" : ""
          }
          `}
          onClick={() => {
            // show clicked contact
            props.setSelectedContact(aContact)

            /* show detail panel*/
            props.setShowContactDetail(true)
          }}
        >
          {contactName}
        </button>
      )
    })
  }
  const innitNewContact = () => {
    // show a empty detail panel
    props.setSelectedContact({
      firstName: "",
      lastName: "",
      emails: [],
    })

    // show detail panel
    props.setShowContactDetail(true)
  }
  return (
    <article className="contacts">
      <article
        className="contacts__add"
        /* innit form to create new contact */
        onClick={innitNewContact}
      >
        <h1 className="contacts__add-title">Contacts</h1>
        <Add className="contacts__add-icon" />
      </article>
      <article>{listContacts(contacts)}</article>
    </article>
  )
}
