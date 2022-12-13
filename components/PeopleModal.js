import { useState } from "react"
import styles from "../styles/Modal.module.css"

const PeopleModal = ({ isOpen, setValue, addPeople }) => {

  const [person, setPerson] = useState("");

  const addPerson = () => {
    if (person.length > 0) {
      addPeople(person)
      setPerson("")
      setValue(false)
    }
  }

  const enableButton = () => {
    if (person.length > 0){
      return false
    }
    return true
  }

  return (
    <div className={styles.modal} >
        <div className={styles.box}>
            <h1>Add People</h1>
            <form>
              <input type="text" autoFocus="autofocus" name="person" autoComplete="off" required placeholder="Enter Person's Name" onChange={e => setPerson(e.target.value)} />
              <div className={styles.buttons}>
                <button type="button" className={styles.button} onClick={() => setValue(!isOpen)}>Close</button>
                <button type="submit" className={styles.button} disabled={enableButton()} onClick={addPerson}>Add</button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default PeopleModal