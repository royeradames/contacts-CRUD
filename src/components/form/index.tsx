/* libraries */
import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

/* SVGs */
import Add from "../../assets/plug-sign.svg"
import Substract from "../../assets/minus-button.svg"
import axios from "axios"

/* components */
import NewEmails from "./NewEmails"
import { create } from "yup/lib/Reference"

/* types */
import { Contact, ContactList } from "../../pages/index"
interface IFormInputs {
  firstName: string
  lastName: string
  emails: string[]
}

/* schema */
const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})

export default function Form(props) {
  /* list of the contact names */
  const {
    contacts,
    setContacts,
  }: {
    contacts: ContactList
    setContacts: React.Dispatch<React.SetStateAction<ContactList>>
  } = props
  /* get incoming data */
  const { id, firstName, lastName, emails }: Contact = props.selectedContact

  /* UI render when email it's change */
  const [emailList, setEmailList] = useState(emails)

  return (
    <>
      <form id="contact-details" onSubmit={handleSubmit(onSubmit)}></form>
      <article className="form">
        {/* inputs */}
        {inputsName()}
        {/* list of emails */}
        <article className="form__emails emails">
          <label className="form__label emails__label">Emails</label>
          <article className="emails__list">{unpackgeEmails()}</article>
          <NewEmails setEmailList={setEmailList} emailList={emailList} />
        </article>
        {/* action buttons */}
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
      </article>
    </>
  )
}
