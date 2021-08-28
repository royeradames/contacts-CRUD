/* libraries */
import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"

/* SVGs */
import Add from "../assets/plug-sign.svg"
import Substract from "../assets/minus-button.svg"
import axios from "axios"
import { Button } from "@material-ui/core"
type Contact = {
  id: string
  firstName: string
  lastName: string
  emails: [] | string[]
}
type Error = {
  statusCode: number
  message: string
  error: string
}
export default function Form(props) {
  const { id, firstName, lastName, emails }: Contact = props.selectedContact

  const [emailList, setEmailList] = useState(emails)

  return (
    <div>
      Form
      <TextField
        id="outlined-basic"
        label="First Name"
        variant="outlined"
        value={firstName}
      />
      <TextField
        id="outlined-basic"
        label="Last Name"
        variant="outlined"
        value={lastName}
      />
      <article className="form__emails">
        <h2 className="form__title">email</h2>

        {unpackgeEmails()}

        {/* add email */}
        <article
          className="form__add-email"
          onClick={() => {
            // todo: on click add a specify email
            console.log("cliked add email")
          }}
        >
          <Add className="form__add-email-icon" />
          <p className="form__add-email-label">Add email</p>
        </article>
      </article>
      <Button
        variant="contained"
        color="secondary"
        className="form__delete"
        onClick={() => {
          setEmailList(["on", "button", "click"])
        }}
      >
        Delete
      </Button>
      <Button variant="outlined" color="secondary" className="form__cancel">
        Cancel
      </Button>
      <Button variant="contained" color="primary" className="form__save">
        Save
      </Button>
    </div>
  )
}
