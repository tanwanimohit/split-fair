import { useEffect, useState } from 'react';
import styles from "../styles/Home.module.css"
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';

const Report = () => {
  const [people, setPeople] = useState([]);
  const [items, setItems] = useState([]);
  const [prices, setPrices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [date, setDate] = useState("");
  const [mobile, setMobile] = useState("");
  const [upi, setUpi] = useState("");
  const [totalAmountPerson, setTotalAmountPerson] = useState([]);
  
  useEffect(() => {
    setPeople(localStorage.getItem("people").split(","))
    setItems(localStorage.getItem("items").split(","))
    setPrices(localStorage.getItem("prices").split(","))
    setTotalAmountPerson(localStorage.getItem("totalAmountPerson").split(","))
    setTotalAmount(parseInt(localStorage.getItem("totalAmount")))
    setRestaurant(localStorage.getItem("restaurant"))
    setMessage(localStorage.getItem("message"))
    setDate(localStorage.getItem("date"))
    setMobile(localStorage.getItem("mobile"))
    setUpi(localStorage.getItem("upi"))
  }, [])

  const downloadReport = async() => {
    const canvas = await html2canvas(document.body);
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'splitfair-report.png', 'image/png');
  }
  return (
    <div>
      <div className={styles.box}>
        <div className={styles.leftBox}>
          <button onClick={downloadReport} className={styles.iconButton}>📩</button>
        </div>
        <h1 className={styles.title}>
          <span className={styles.highlight}>Split Fair</span> Report
        </h1>
        <p className={styles.description}>
          {message}
        </p>
      </div>
      <div className={styles.box}>
        {restaurant && restaurant.length > 0 ? <h2>Restaurant:<strong>{restaurant}</strong></h2> : null}
        {date && date.length > 0 ? <h2>Date:<strong>{date}</strong></h2> : null}
        <h2>Total Amount:<strong>{totalAmount} ₹</strong></h2>
        {mobile && mobile.length > 0 ? <h2>Mobile:<strong>{mobile}</strong></h2> : null}
        {upi && upi.length > 0 ? <h2>UPI:<strong><a href={`upi://pay?pa=${upi}&amp;cu=INR`} >{upi}</a></strong></h2> : null}
      </div>
      <hr />
      <div className={styles.box}>
        <h1>Items</h1>
      </div>
      <div className={styles.box}>
        <ol>
          {items.map((name, index) => (
            <div className={styles.flexRow} key={index}>
              <li>{name}</li>
              <div className={styles.money}>{prices[index]}</div>
            </div>
          ))}
        </ol>
      </div>
      <hr />
      <div className={styles.box}>
        <h1>People Share</h1>
      </div>
      <div className={styles.box}>
        <ol>
          {people.map((name, index) => (
            <div className={styles.flexRow} key={index}>
              <li>{name}</li>
              <div className={styles.money}>{totalAmountPerson[index]}</div>
            </div>
          ))}
        </ol>
      </div>
      <hr />
      <div className={styles.box}>
        <h3>
          <span className={styles.highlight}>Thanks for using this tool! Cheers 😇</span>
          <br />
          <span className={styles.highlight}>https://split.mohit.rocks/</span>
        </h3>
      </div>
    </div>
  )
}

export default Report