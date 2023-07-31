"use server"

import React from "react"

export default async function ServerCompTest() {
  async function action(form: FormData) {
    "use server"
    // console.log("formData::: ", form)
  }
  return (
    <div>
      <h1>Testing out server actions</h1>
      <form action={action}>
        <input type="text" placeholder="Place holder ish" name="input" />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}
