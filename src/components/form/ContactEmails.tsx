/* libraries */
import React from "react"

/* redux */
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../state/index"

/* Components */
import NewEmails from "./NewEmails"

/* SVGs */
import Substract from "../../assets/minus-button.svg"

/* types */
import { FormState } from "../../state/reducers/formReducer"

/*  
    - list the user emails
    - have icon next to email so when it's click it send request to delete that user email.
  */
export default function ContactEmails() {
  /* redux */
  // get states
  const { emailList } = useSelector(({ form }: { form: FormState }) => {
    return {
      emailList: form.selectedContact.emails,
    }
  })

  // get methods to update state
  const dispatch = useDispatch()
  const { setSelectedContactEmails: setContactEmails } = bindActionCreators(
    actionCreators,
    dispatch
  )

  return (
    /* display a email label with the email list text */
    <article className="form__emails emails">
      <label className="form__label emails__label">Emails</label>
      <article className="emails__list">
        {emailList?.map((aEmail: string, index: number) => {
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
                  setContactEmails(
                    emailList.filter(element => element !== aEmail)
                  )
                }
              />
            </article>
          )
        })}
      </article>
      <NewEmails />
    </article>
  )
}
