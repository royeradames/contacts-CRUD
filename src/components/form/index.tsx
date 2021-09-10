/* libraries */
import React, { useEffect, useState } from "react"
import {
  UseFormSetValue,
  UseFormReset,
  UseFormRegister,
  UseFormHandleSubmit,
  FieldError,
  DeepMap,
  UseFormGetValues,
} from "react-hook-form"

/* components */
import InputsName from "./InputsName"

/* types */
import { Contact, ContactList, IFormInputs } from "../../pages/index"
import ContactEmails from "./ContactEmails"
import ActionButtons from "./ActionButtons"
export type EmailList = string[] | []

export default function Form(props) {
  const {
    /* list of the contact names */
    contacts,
    setContacts,

    /* current selected contact data */
    setSelectedContact,
    selectedContact,

    /* form methods */
    getValues,
    setValue,
    reset,
    register,
    handleSubmit,
    errors,
  }: {
    contacts: ContactList
    setContacts: React.Dispatch<React.SetStateAction<ContactList>>
    setSelectedContact: React.Dispatch<React.SetStateAction<Contact>>
    selectedContact: Contact
    getValues: UseFormGetValues<IFormInputs>
    setValue: UseFormSetValue<IFormInputs>
    reset: UseFormReset<IFormInputs>
    register: UseFormRegister<IFormInputs>
    handleSubmit: UseFormHandleSubmit<IFormInputs>
    errors: DeepMap<IFormInputs, FieldError>
  } = props

  /* capture selected contact data */
  const { id, firstName, lastName, emails }: Contact = props.selectedContact

  /* UI render when email it's change */
  const [emailList, setEmailList] = useState<EmailList>(emails)

  /* update the email list when the contact changes */
  useEffect(() => {
    setEmailList(emails)
  }, [emails])

  return (
    <>
      <article className="form">
        <InputsName
          register={register}
          firstName={firstName}
          lastName={lastName}
          errors={errors}
          setValue={setValue}
        />
        <ContactEmails
          emailList={emailList}
          setEmailList={setEmailList}
          setSelectedContact={setSelectedContact}
          selectedContact={selectedContact}
          getValues={getValues}
        />
        {/* action buttons + host the contact-detail form element*/}
        <ActionButtons
          id={id}
          contacts={contacts}
          setContacts={setContacts}
          setSelectedContact={setSelectedContact}
          emailList={emailList}
          reset={reset}
          handleSubmit={handleSubmit}
          setShowContactDetail={props.setShowContactDetail}
          setIsDuplicate={props.setIsDuplicate}
          isSetFailSave={props.isSetFailSave}
          setIsFailDelete={props.setIsFailDelete}
        />

        {/* main form CRUD error messages */}
        <article className="form__save-error form__error">
          {props.isDuplicate && (
            <p className="form__error-duplication ">Contact already exist.</p>
          )}
          {props.isFailSave && (
            <p className="form__error-duplication ">
              Form failed to save, try another time.
            </p>
          )}
          {props.isFailDelete && (
            <p className="form__error-duplication ">
              Form failed to delete, try another time.
            </p>
          )}
        </article>
      </article>
    </>
  )
}
