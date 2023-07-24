import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 6;

const Checkout = (props) => {

    const [formValidity, setFormValidity] = useState({
        name : true,
        street: true,
        postalCode: true,
        city: true,
    })

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postalCode: enteredPostalCodeIsValid,
        city: enteredCityIsValid
    })

    //checking if form is valid
    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid;

      if(!formIsValid){
        return  
      }
      //form is valid, now sending data to the server

      props.onConfirm({
        name : enteredName,
        street: enteredStreet,
        postalCode: enteredPostalCode,
        city: enteredCity
      });
  };
  

    //CSS Classes
  const nameInvalidCSS = `${classes.control} ${formValidity.name ? '' : classes.invalid}`;
  const streetInvalidCSS = `${classes.control} ${formValidity.street ? '' : classes.invalid}`;
  const postalCodeInvalidCSS = `${classes.control} ${formValidity.postalCode ? '' : classes.invalid}`;
  const cityInvalidCSS = `${classes.control} ${formValidity.city ? '' : classes.invalid}`;

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameInvalidCSS}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetInvalidCSS}>
        <label htmlFor="street">Street Name</label>
        <input type="text" id="Street" ref={streetInputRef} />
        {!formValidity.name && <p>Please enter a valid street name.</p>}
      </div>
      <div className={postalCodeInvalidCSS}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formValidity.postalCode && <p>Please enter a valid postal code (6 charcters long).</p>}
      </div>
      <div className={cityInvalidCSS}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
