/* libraries */
import React, { useEffect } from "react"

/* redux */
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../state/index"

/* components */
import InputsName from "./InputsName"

/* types */
// import { IFormInputs } from "../../pages/index"
import { FormState } from "../../state/reducers/formReducer"
import ContactEmails from "./ContactEmails"
import ActionButtons from "./ActionButtons"

export default function Form() {
  /* redux */
  // get state
  const { emails, isDuplicate, isFailSave, isFailDelete } = useSelector(
    ({ form }: { form: FormState }) => {
      return {
        emails: form.selectedContact.emails,
        isDuplicate: form.isDuplicate,
        isFailSave: form.isFailSave,
        isFailDelete: form.isFailDelete,
      }
    }
  )
  // get methods to update state
  const dispatch = useDispatch()
  const { setSelectedContactEmails: setContactEmails } = bindActionCreators(
    actionCreators,
    dispatch
  )

  /* update the email list when the contact changes */
  useEffect(() => {
    // setEmailList(emails)
    setContactEmails(emails)
  }, [emails])

  return (
    <>
      <article className="form">
        <InputsName />
        <ContactEmails />
        {/* action buttons + host the contact-detail form element*/}
        <ActionButtons />

        {/* main form CRUD error messages */}
        <article className="form__save-error form__error">
          {isDuplicate && (
            <p className="form__error-duplication ">Contact already exist.</p>
          )}
          {isFailSave && (
            <p className="form__error-duplication ">
              Form failed to save, try another time.
            </p>
          )}
          {isFailDelete && (
            <p className="form__error-duplication ">
              Form failed to delete, try another time.
            </p>
          )}
        </article>
      </article>
    </>
  )
}
