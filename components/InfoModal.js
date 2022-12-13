import { useState } from "react"
import styles from "../styles/Modal.module.css"

const InfoModal = ({ isOpen, setValue, addData }) => {

  const [restaurant, setRestaurant] = useState("");
  const [upi, setUpi] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [mobile, setMobile] = useState("");

  const generateReport = () => {
    addData(
      restaurant,
      date,
      mobile,
      upi,
      message
    )
  }

  return (
    <div className={styles.modal} >
        <div className={styles.box}>
            <h1>Optional Details</h1> 
            <input type="text" autoFocus="autofocus" name="restaurant" autoComplete="off" required placeholder="Enter Restaurant's Name" onChange={e => setRestaurant(e.target.value)} />
            <input type="date" name="date" autoComplete="off" required placeholder="Enter Date" onChange={e => setDate(e.target.value)} />
            <input type="tel" name="mobile" autoComplete="off" required placeholder="Enter Mobile" onChange={e => setMobile(e.target.value)} />
            <input type="text" name="upi" autoComplete="off" required placeholder="Enter UPI ID" onChange={e => setUpi(e.target.value)} />
            <input type="textarea" name="message" autoComplete="off" required placeholder="Enter Personalized message" onChange={e => setMessage(e.target.value)} />
            <div className={styles.buttons}>
              <button className={styles.button} onClick={generateReport}>Continue</button>
              <button className={styles.button} onClick={() => setValue(false)}>Close</button>
            </div>
        </div>
    </div>
  )
}

export default InfoModal