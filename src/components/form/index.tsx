/* libraries */
import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

/* SVGs */
import Add from "../../assets/plug-sign.svg"
import Substract from "../../assets/minus-button.svg"
import axios from "axios"

/* components */
import NewEmails from "./NewEmails"
import { create } from "yup/lib/Reference"

/* types */
import { Contact, ContactList } from "../../pages/index"
interface IFormInputs {
  firstName: string
  lastName: string
  emails: string[]
}

/* schema */
const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})

export default function Form(props) {
  return <></>
}
