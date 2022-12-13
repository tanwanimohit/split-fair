import { useState } from "react"
import styles from "../styles/Modal.module.css"

const ItemModal = ({ isOpen, setValue, setItems, people }) => {

  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [personSelected, setPersonSelected] = useState(Array(people.length).fill(false));

  const setItemDetails = () => {
    setItems(item, price, personSelected)
    setItem("")
    setValue(false)
  }

  const updateItemPeople = (index) => {
    let tempArray = [...personSelected]
    tempArray[index] = !tempArray[index]
    let isAllSelected = tempArray.filter(item => !item)
    if (isAllSelected.length == 0) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
    setPersonSelected(tempArray)
  }

  const enableButton = () => {
    let tempArray = personSelected.filter(item => item)
    if (item && price && tempArray.length > 0) {
      return false
    }
    return true
  }

  const selectAllPeople = () => {
    let value = selectAll ? false : true
    setPersonSelected(Array(people.length).fill(value))
    setSelectAll(value)
  }

  return (
    <div className={styles.modal} >
      <div className={styles.box}>
        <h1>Add Item</h1>
        <form>
          <input type="text" autoFocus="autofocus" name="item" autoComplete="off" placeholder="Enter Item Name" required onChange={e => setItem(e.target.value)} />
          <input type="number" name="price" autoComplete="off" placeholder="Enter Item Price" required onChange={e => setPrice(e.target.value)} />
          <div>
            <h3>Select People</h3>
            <div className={styles.flexWrap}>
              <div role="button" tabIndex="0" className={selectAll ? styles.tagSelected : styles.tag} onClick={selectAllPeople}>All</div>
              {
                people.map((name, index) => (
                  <div role="button" tabIndex="0" key={index} className={personSelected[index] ? styles.tagSelected : styles.tag} onClick={() => updateItemPeople(index)}>
                    {name}
                  </div>
                ))
              }
            </div>
          </div>
          <div className={styles.buttons}>
            <button type="button" className={styles.button} onClick={() => setValue(!isOpen)}>Close</button>
            <button type="submit" className={styles.button} disabled={enableButton()} onClick={setItemDetails}>Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ItemModal