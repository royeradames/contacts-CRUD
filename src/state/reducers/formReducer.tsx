export type FormState = {
  /* toggle */
  // form erros messages
  isDuplicate: boolean
  isFailSave: boolean
  isFailDelete: boolean
  // contact detail pannel
  showContactDetail: boolean
  /* current contact details and contact name list state */
  selectedContact: {
    id: string
    firstName: string
    lastName: string
    emails: string[] | []
  }
  contactList: FormState["selectedContact"][]
  formMethods: any
}
/* innitial state */
const defaultState: FormState = {
  /* toggle */
  // form erros messages
  isDuplicate: false,
  isFailSave: false,
  isFailDelete: false,
  // contact detail pannel
  showContactDetail: false,
  /* current contact details and contact name list state */
  selectedContact: {
    id: "",
    firstName: "",
    lastName: "",
    emails: [],
  },
  contactList: [],
  formMethods: {
    getValues: function () {},
    setValue: function () {},
    reset: function () {},
    register: function () {},
    handleSubmit: function () {},
    errors: function () {},
  },
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    /* toggle */
    // form erros messages
    case "setIsduplicate":
      return { ...state, isDuplicate: action.payload }
    case "setIsFailSave":
      return { ...state, isFailSave: action.payload }
    case "setIsFailDelete":
      return { ...state, isFailDelete: action.payload }
    // contact detail pannel
    case "setShowContactDetail":
      return { ...state, showContactDetail: action.payload }
    /* current contact details and contact name list state */
    case "setSelectedContact":
      return { ...state, selectedContact: action.payload }
    case "setContactList":
      return { ...state, contactList: action.payload }
    case "setSelectedContactEmails":
      // update the selected contact email list state
      return {
        ...state,
        selectedContact: {
          ...state.selectedContact,
          emails: action.payload,
        },
      }

    default:
      return state
  }
}

export default reducer
