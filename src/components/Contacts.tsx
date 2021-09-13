/* libraries */
import React, { useEffect } from "react"
import axios from "axios"

// redux
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../state/index"

/* SVGs */
import Add from "../assets/plug-sign.svg"

/* types */
import { FormState } from "../state/reducers/formReducer"

export default function Contacts() {
  /* redux state */
  // get states
  const { contactList, selectedContact, formMethods } = useSelector(
    ({ form }: { form: FormState }) => {
      return {
        contactList: form.contactList,
        selectedContact: form.selectedContact,
        formMethods: form.formMethods,
      }
    }
  )
  const { reset } = formMethods

  // update states
  const dispatch = useDispatch()
  const {
    setContactList,
    setIsDuplicate,
    setIsFailSave,
    setIsFailDelete,
    setShowContactDetail,
    setSelectedContact,
  } = bindActionCreators(actionCreators, dispatch)

  /* get the list of names when page first loads */
  useEffect(() => {
    axios
      .get("https://avb-contacts-api.herokuapp.com/contacts/paginated")
      .then(response => {
        setContactList(response.data.contacts)

        // on page load default to show the first contact
        const firstContact = response.data.contacts[0]
        setSelectedContact(firstContact)
        // show the form page
        setShowContactDetail(true)
      })
      .catch(() => {
        setContactList([
          { id: "-1", firstName: "No", lastName: "contacts", emails: [] },
        ])
      })
  }, [])
  function sortAlphabetically(contacts: FormState["contactList"]) {
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
  }
  function changeContact(aContact: FormState["selectedContact"]) {
    // show clicked contact
    setSelectedContact(aContact)

    // reset form
    reset()

    // when changing contact remove the error message
    setIsDuplicate(false)
    setIsFailSave(false)
    setIsFailDelete(false)

    /* show detail panel*/
    setShowContactDetail(true)
  }
  /* assemple the contact names */
  const listContacts = (contacts: FormState["contactList"]) => {
    /* sort by name */
    sortAlphabetically(contacts)

    /* list all names */
    return contactList.map(
      (aContact: FormState["selectedContact"], index: number) => {
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
            onClick={() => changeContact(aContact)}
          >
            {contactName}
          </button>
        )
      }
    )
  }
  const innitNewContact = () => {
    // show a empty detail panel
    setSelectedContact({
      id: "-1",
      firstName: "",
      lastName: "",
      emails: [],
    })

    // show detail panel
    setShowContactDetail(true)
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
      <article>{listContacts(contactList)}</article>
    </article>
  )
}
