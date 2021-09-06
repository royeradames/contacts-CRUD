/* libraries */
import React from "react"
import axios from "axios"

/* types */
import { IFormInputs } from "./index"

/* delete, create, update contact */
export default function ActionButtons({
  /* panel control */
  setShowContactDetail,
  /* contact data */
  id,
  contacts,
  setContacts,
  setSelectedContact,
  emailList,
  /* form methods */
  reset,
  handleSubmit,
}) {
  /* handle the closing of the detail panel */
  const closeDetailPanel = () => {
    setShowContactDetail(false)
  }
  /* create a new user */
  const create = (
    firstName: string,
    lastName: string,
    email: [] | string[]
  ) => {
    axios
      .post("https://avb-contacts-api.herokuapp.com/contacts", {
        firstName,
        lastName,
        emails: email,
      })
      .then(data => {
        /* add new contact to the contact list */
        setContacts([...contacts, data.data])
        // todo: give the user a cue that their contact has been save
      })
      .catch(() => {
        // todo: give the user a cue that their contact has been failed to save
      })
  }
  /* delete the contact from the server then remove the data from the UI*/
  const deleteContact = (id: string) => {
    axios
      .delete(`https://avb-contacts-api.herokuapp.com/contacts/${id}`)
      .then(() => {
        /* remove the user from the contact list */
        setContacts(contacts.filter(element => element.id !== id))

        /* let user know it was a success by closing the panel */
        closeDetailPanel()
      })
      .catch(() => {
        // todo: let the user know that the contact was not delete
      })
  }
  /* update the server selected contact info with the from submission data */
  const save = (
    id: string,
    firstName: string,
    lastName: string,
    emails: string[] | []
  ) => {
    /* update contact without the delete email */
    axios
      .put(`https://avb-contacts-api.herokuapp.com/contacts/${id}`, {
        id,
        firstName,
        lastName,
        emails,
      })
      .then(data => {
        /* update the contact details */
        setSelectedContact(data.data)

        // todo: show the user that the email was succesfully save
      })
      .catch(() => {
        // todo: show the user that there was an error while saving their data
      })
  }
  /* when user saves do something. */
  const onSubmit = (data: IFormInputs) => {
    /* update the user with the given information
      or create a new contact
    */
    id
      ? save(id, data.firstName, data.lastName, emailList)
      : create(data.firstName, data.lastName, emailList)
  }
  return (
    <>
      <button
        form="contact-details"
        type="button"
        className="form__delete"
        onClick={() => {
          /* delete user from server or */
          if (id) deleteContact(id)
          else {
            /* close the details panel */
            closeDetailPanel()
            /* reset text fields */
            reset()
          }
        }}
      >
        Delete
      </button>
      <div className="form__cancel-save">
        <button
          form="contact-details"
          className="form__cancel-save-save"
          type="submit"
        >
          Save
        </button>
        <button
          form="contact-details"
          className="form__cancel-save-cancel"
          type="button"
          onClick={() => {
            /* close details panel */
            // ? Why distructuring gave not a function error

            closeDetailPanel()
            // todo: scroll to the speicify id if possible
          }}
        >
          Cancel
        </button>
      </div>
      <form id="contact-details" onSubmit={handleSubmit(onSubmit)}></form>
    </>
  )
}
