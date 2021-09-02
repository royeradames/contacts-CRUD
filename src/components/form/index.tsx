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

  /* import form fuctions */
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  })

  /* update the email list when the contact changes */
  useEffect(() => {
    setEmailList(emails)
  }, [emails])

  /* when user saves do something. */
  const onSubmit = (data: IFormInputs) => {
    console.log(data)
    /* update the user with the given information
      or create a new contact
    */
    id
      ? save(id, data.firstName, data.lastName, emailList)
      : create(data.firstName, data.lastName, emailList)
  }

  /* when emails get delete update the server */
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
        console.log({ data })
        setEmailList(data?.data?.email)
        closeDetailPanel()
      })
      .catch(error => {
        console.log({ error })
      })
  }

  /* delete the contact */
  const deleteContact = (id: string) => {
    axios
      .delete(`https://avb-contacts-api.herokuapp.com/contacts/${id}`)
      .then(data => {
        console.log({ data })
        closeDetailPanel()
      })
      .catch(error => {
        console.log({ error })
      })
  }

  /* Remove email form email list */
  const removeListedEmail = (index: number) => {
    // make a copy of email
    const updateEmailList = [...emailList]
    // remove the email
    updateEmailList.splice(index, 1)
    // set the new email list
    setEmailList(updateEmailList)
  }

  /*  
    - list the user emails
    - have icon next to email so when it's click it send request to delete that user email.
  */
  const unpackgeEmails = () => {
    return emailList.map((aEmail: string | null | undefined, index: number) => {
      const lastIndex = index === emailList.length - 1
      return (
        <article
          className={`emails__list-email ${
            lastIndex ? "emails__list-email-last" : ""
          }`}
          key={index}
        >
          <p className="emails__list-text">{aEmail}</p>
          <Substract
            onClick={() => {
              removeListedEmail(index)
            }}
          />
        </article>
      )
    })
  }

  /* generate text inputs */
  const inputsName = () => {
    /* list of inputs */
    const inputs = [
      { name: "firstName", class: "first-name" },
      { name: "lastName", class: "last-name" },
    ]

    /* template to generate inputs */
    return inputs.map(
      (input: { name: string; class: string }, index: number) => {
        return (
          <article className={`form__input form__${input.class}`} key={index}>
            <label className={`form__${input.class} form__label`}>
              First Name
            </label>
            <input
              form="contact-details"
              className={`form__text-field form__${input.class}`}
              {...register(
                input.name === "firstName" ? "firstName" : "lastName"
              )}
              placeholder={input.name === "firstName" ? firstName : lastName}
            />
            <p className="form__error">{errors.firstName?.message}</p>
          </article>
        )
      }
    )
  }

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
