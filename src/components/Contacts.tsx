/* libraries */
import React, { useEffect, useState } from "react"
import axios from "axios"

/* SVGs */
import Add from "../assets/plug-sign.svg"

/* types */
type Contact = {
  id: number
  firstName: string
  lastName: string
  email: string[] | []
}
type noContacts = {
  firstName: string
  lastName: string
}
type ContactList = Contact[] | noContacts[]
export default function Contacts(props) {
  return <article></article>
}
