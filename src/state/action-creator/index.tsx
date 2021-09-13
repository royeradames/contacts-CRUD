/* types */
import { FormState } from "../reducers/formReducer"
/* toggles */
//  form erros messages
export const setIsDuplicate = (toggle: FormState["isDuplicate"]) => {
  return dispatch => {
    dispatch({
      type: "setIsduplicate",
      payload: toggle,
    })
  }
}

export const setIsFailSave = (toggle: FormState["isFailSave"]) => {
  return dispatch => {
    dispatch({
      type: "setIsFailSave",
      payload: toggle,
    })
  }
}

export const setIsFailDelete = (toggle: FormState["isFailDelete"]) => {
  return dispatch => {
    dispatch({
      type: "setIsFailDelete",
      payload: toggle,
    })
  }
}

// contact detail pannel
export const setShowContactDetail = (
  toggle: FormState["showContactDetail"]
) => {
  return dispatch => {
    dispatch({
      type: "setShowContactDetail",
      payload: toggle,
    })
  }
}
/* current contact details and contact name list state */

export const setSelectedContact = (
  selectedContact: FormState["selectedContact"]
) => {
  return dispatch => {
    dispatch({
      type: "setSelectedContact",
      payload: selectedContact,
    })
  }
}

export const setSelectedContactEmails = (
  emailList: FormState["selectedContact"]["emails"]
) => {
  return dispatch => {
    dispatch({
      type: "setSelectedContactEmails",
      payload: emailList,
    })
  }
}

export const setContactList = (contactList: FormState["contactList"]) => {
  return dispatch => {
    dispatch({
      type: "setContactList",
      payload: contactList,
    })
  }
}

/* form methods */
export const setFormMethods = (formMethods: FormState["formMethods"]) => {
  return dispatch => {
    dispatch({
      type: "setFormMethods",
      payload: formMethods,
    })
  }
}
