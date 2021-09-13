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
