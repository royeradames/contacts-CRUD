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
