import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamation, faSpinner, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';


const AvailableMeals = () => {

  const[meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    // useEffect cannot return a promise, therefore we cannot use async await on this function
    const fetchMeals = async () => {
      const response = await fetch('https://food-order-app-69ec8-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok){
        throw new Error('Oops! Something went wrong');
      }

      const responseData = await response.json();
      const loadedData = [];
      for(const key in responseData){
        loadedData.push({
          id : key,
          name : responseData[key].name,
          description : responseData[key].description,
          price : responseData[key].price,
        });
      }
      setMeals(loadedData);
      setIsLoading(false);
    }

    //we can't use try catch since fetchMeals is an async function which returns a Promise 
    //and an error occured in a Promise results in Promise Rejection 
    //to handle that rejection we will have to turn the useEffect function as async and call fetchMeals with await
    
    //ALTERNATE : we can use try catch in a new function which we can make async 
    //const callingFunc = async () => {try {await fetchMeals()} catch(error){error.message}}
    
    //ALTERNATE 2: 

    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if(isLoading){
    return(
      <div className={classes.loadingIcon}>
        <FontAwesomeIcon icon={faSpinner} spin size="2xl"  />
        <p >Loading Delicious Food...</p>
      </div>
    )
  }

  if(httpError){
    return(
      <div className={classes.loadingIcon}>
        <FontAwesomeIcon icon={faTriangleExclamation} beatFade size="2xl"  />
        <p>{httpError}</p>
      </div>
    )

  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
