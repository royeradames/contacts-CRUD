/* libraries */
import React, { useState } from "react"

/* components */
import Contacts from "../components/Contacts"
import Form from "../components/Form"
import SEO from "../components/SEO"

export default function Home() {
  const [selectedContact, setSelectedContact] = useState(false)
  const [showContactDetail, setShowContactDetail] = useState(false)

  return (
    <main>
      <SEO title="AVB Contacts" />
    </main>
  )
}
