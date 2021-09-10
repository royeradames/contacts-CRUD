import React from "react"
/* Components */
import NewEmails from "./NewEmails"

/* SVGs */
import Substract from "../../assets/minus-button.svg"

/* types */
import { UseFormGetValues } from "react-hook-form"
import { Contact, IFormInputs } from "../../pages"
import { EmailList } from "./index"

/*  
    - list the user emails
    - have icon next to email so when it's click it send request to delete that user email.
  */
export default function ContactEmails({
  emailList,
  setEmailList,
  setSelectedContact,
  selectedContact,
  getValues,
}: {
  emailList: EmailList
  setEmailList: React.Dispatch<React.SetStateAction<EmailList>>
  setSelectedContact: React.Dispatch<React.SetStateAction<Contact>>
  selectedContact: Contact
  getValues: UseFormGetValues<IFormInputs>
}) {
  return (
    /* display a email label with the email list text */
    <article className="form__emails emails">
      <label className="form__label emails__label">Emails</label>
      <article className="emails__list">
        {emailList.map((aEmail: string, index: number) => {
          const lastIndex = index === emailList.length - 1
          return (
            /* display a email text with a minus icon */
            <article
              className={`
                emails__list-email 
                ${
                  /* add a unic class to the last email */
                  lastIndex ? "emails__list-email-last" : ""
                }`}
              key={index}
            >
              <p className="emails__list-text">{aEmail}</p>
              <Substract
                /* filter out this email */
                onClick={() =>
                  setEmailList(emailList.filter(element => element !== aEmail))
                }
              />
            </article>
          )
        })}
      </article>
      <NewEmails
        setEmailList={setEmailList}
        emailList={emailList}
        setSelectedContact={setSelectedContact}
        selectedContact={selectedContact}
        getValues={getValues}
      />
    </article>
  )
}
