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
  return <div>Form</div>
}
