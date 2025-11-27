"use client";
import { useActionState } from "react";
import { saveData } from "./actions";
import { initialFormState } from "@/lib"

export default function SimpleForm() {
  const [state, formAction] = useActionState(saveData, initialFormState())

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="title">Title</label><br />
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={state.title ?? ""}
        />
      </div>
      {!state.success && state.errors?.title ? (
        <p>{state.errors.title}</p>
      ) : null}
      <br />
      <div>
        <label htmlFor="content">Content</label><br />
        <textarea id="content" name="content" cols={30} rows={10} defaultValue={state.content ?? ""}></textarea>
      </div>
      {!state.success && state.errors?.content ? (
        <p>{state.errors.content}</p>
      ) : null}
      <br />
      <button>Save</button>
    </form>
  )
}
