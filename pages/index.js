import { useState } from 'react';
import { useRouter } from 'next/router'
import styles from "../styles/Home.module.css"
import PeopleModal from '../components/PeopleModal'
import ItemModal from '../components/ItemModal'
import InfoModal from '../components/InfoModal';


export default function Home() {

  const [peopleModal, setPeopleModal] = useState(false);
  const [itemModal, setItemModal] = useState(false);
  const [dataModal, setDataModal] = useState(false);
  const [people, setPeople] = useState([]);
  const [items, setItems] = useState([]);
  const [prices, setPrices] = useState([]);
  const [peopleMapping, setPeopleMapping] = useState([]);

  const router = useRouter()

  const clearItems = () => {
    setItems([])
    setPrices([])
    setPeopleMapping([])
  }

  const addPeople = (name) => {
    setPeople([...people, name])
  }

  const removePeople = (index) => {
    let tempArray = [...people]
    tempArray.splice(index, 1)
    setPeople(tempArray)
    clearItems()
  }

  const setItemDetails = (item, price, selectedPeople) => {
    setItems([...items, item])
    setPrices([...prices, price])
    setPeopleMapping([...peopleMapping, selectedPeople])
  }

  const removeItem = (index) => {
    let tempArray = [...items]
    tempArray.splice(index, 1)
    setItems(tempArray)
    tempArray = [...prices]
    tempArray.splice(index, 1)
    setPrices(tempArray)
    tempArray = [...peopleMapping]
    tempArray.splice(index, 1)
    setPeopleMapping(tempArray)
  }

  const generateReport = (restaurant, date, mobile, upi, message) => {
    // Using LocalStack as I am too lazy to add context API support.
    localStorage.clear()
    localStorage.setItem('restaurant', restaurant)
    localStorage.setItem('date', date)
    localStorage.setItem('mobile', mobile)
    localStorage.setItem('upi', upi)
    localStorage.setItem('message', message)
    localStorage.setItem('people', people)
    localStorage.setItem('items', items)
    localStorage.setItem('prices', prices)
    localStorage.setItem('peopleMapping', JSON.stringify(peopleMapping))
    let totalAmount = 0
    let totalAmountPerson = Array(people.length).fill(0)
    prices.map((item, index) => {
      let totalPeople = peopleMapping[index].filter(item => item).length
      peopleMapping[index].map((mapping, mappingIndex) => {
        if (mapping) {
          totalAmountPerson[mappingIndex] += Number.parseFloat((item / totalPeople).toFixed(2))
        }
      })
      totalAmount += parseFloat(item);
    });
    localStorage.setItem('totalAmountPerson', totalAmountPerson)
    localStorage.setItem('totalAmount', totalAmount)
    router.push("/report")
  }

  const getItems = () => {
    return (
      <>
        <div className={styles.box}>
          <h1>Items</h1>
        </div>
        <div className={styles.box}>
          <ol>
            {items.map((name, index) => (
              <div className={styles.flexRow} key={index}>
                <li>{name} <span className={styles.money}> {prices[index]} ₹</span> (
                  <span>
                    {
                      peopleMapping[index].map((item, itemIndex) => (
                        item ? <span key={itemIndex} className={styles.mapping}>{people[itemIndex]}</span> : null
                      ))
                    }
                  </span>
                  )</li>
                <span className={styles.cross} onClick={() => removeItem(index)}>❌</span>
              </div>
            ))}
          </ol>
          <button type="button" className={styles.nextButton} onClick={() => setItemModal(!itemModal)}>Add Items</button>
        </div>
      </>
    )
  }

  return (
    <div>
      <div className={styles.box}>
        <h1 className={styles.title}>
          Welcome to <strong>Split Fair 🤑</strong>
        </h1>
        <p className={styles.description}>
          This tool helps you to split your food fares fairly!
          You can Add People, Items, and divide each item by selecting involved people.
          This makes it fare for all the people, instead of diving the whole amount by
          number of total people.
        </p>
      </div>

      <div className={styles.box}>
        <h1>People</h1>
      </div>
      <div className={styles.box}>
        <ol>
          {people.map((name, index) => (
            <div className={styles.flexRow} key={index}>
              <li>{name}</li><span className={styles.cross} onClick={() => removePeople(index)}>❌</span>
            </div>
          ))}
        </ol>
        {people && people.length >=2  ? <p className={styles.warning}>* Removing People will clear all items.</p> : null}
        <button type="button" className={styles.nextButton} onClick={() => setPeopleModal(!peopleModal)}>Add People</button>
      </div>

      <hr />

      {people && people.length >= 2 ? getItems() : <p className={styles.message}>Add two or more people to add items ✨</p>}
      
      {items && items.length > 0 ? <div className={styles.footer}><button type="button" className={styles.greenButton} onClick={() => setDataModal(!dataModal)}>Generate Report</button></div> : null}
      {peopleModal ? <PeopleModal isOpen={peopleModal} setValue={setPeopleModal} addPeople={addPeople} /> : null}
      {dataModal ? <InfoModal isOpen={dataModal} setValue={setDataModal} addData={generateReport} /> : null}
      {itemModal ? <ItemModal isOpen={itemModal} setValue={setItemModal} setItems={setItemDetails} people={people} /> : null}
    </div>
  )
}
