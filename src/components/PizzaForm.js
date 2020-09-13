import React, {useState, useEffect} from 'react';
import * as yup from "yup";
import axios from "axios";

const pizzaSchema = yup.object().shape({
    name: yup.string().required('Name is a required field.'),
    pizzaSize: yup.string(),
    pepperoni: yup.boolean(),
    cheese: yup.boolean(),
    sausage: yup.boolean(),
    onions: yup.boolean(),
    instructions: yup.string()
})



export default function PizzaForm (){

    const [disabled, setDisabled] = useState(true);

    const [formState, setFormState] = useState({
        name:'',
        pizzaSize: '',
        pepperoni: false,
        cheese: false,
        sausage: false,
        onions: false,
        instructions: ''
    })

    const [errorState, setErrorState] = useState({
        name:'',
        pizzaSize: '',
        pepperoni: '',
        cheese: '',
        sausage: '',
        onions: '',
        instructions: ''
    })

    const [pizza, setPizza] = useState([]);

    const validate = event => {
        const value =
          event.target.type === "checkbox" ? event.target.checked : event.target.value;
        yup
          .reach(pizzaSchema, event.target.name)
          .validate(value)
          .then(valid => {
            setErrorState({
              ...errorState,
              [event.target.name]: ""
            });
          })
          .catch(err => {
            setErrorState({
              ...errorState,
              [event.target.name]: err.errors[0]
            });
          });
      };

    useEffect(() => {
        pizzaSchema.isValid(formState).then(valid => {
            setDisabled(!valid);
        });
    }, [formState])

    const inputChange = event =>{
        event.persist();
        validate(event)
        const newFormData = {
            ...formState,
            [event.target.name]:
            event.target.type === "checkbox" ? event.target.checked : event.target.value
        };

        setFormState(newFormData)
    }

    const clearForm = () => {
        setFormState({ name: "", 
        pizzaSize: '', 
        pepperoni: false, 
        cheese: false,
        sausage: false,
        onions: false,
        instructions: '' });
      };

    const formSubmit = event => {
        event.preventDefault();

        axios
        .post('https://reqres.in/api/users', formState)
        .then(res => {
            setPizza([...pizza, res.data]);
            console.log(res.data);
        });
        clearForm();
    }


    return(
     
        <form onSubmit={formSubmit} style={{margin: "2%"}}>
         <h3 style={{marginLeft:"35%"}}>Build your own Pizza</h3>
      <label htmlFor='name'>
        Name: 
        <input
          type='text'
          name='name'
          value={formState.name}
          onChange={inputChange}
          data-cy="name-input"
          style={{marginLeft: "1%"}}
        />
        {errorState.name.length > 0 ? <p className='error'>{errorState.name}</p> : null}
      </label>
      <label htmlFor='pizzaSize' style={{marginLeft: "2%"}}>
        What size pizza would you like?
        <select id='pizzaSize' name='pizzaSize' onChange={inputChange} style={{marginLeft: "2%"}}>
          <option value='select'>--select option--</option>
          <option value='small'>small</option>
          <option value='medium'>medium</option>
          <option value='large'>large</option>
        </select>
      </label>
      <label htmlFor='pepperoni' className='pepperoni' style={{marginLeft: "2%"}}>
        <input
          type='checkbox'
          name='pepperoni'
          checked={formState.pepperoni}
          onChange={inputChange}
          data-cy="checkbox"
        />
        pepperoni
      </label>
      <label htmlFor='cheese' className='cheese' style={{marginLeft: "2%"}}>
        <input
          type='checkbox'
          name='cheese'
          checked={formState.cheese}
          onChange={inputChange}
          data-cy="checkbox"
        />
        cheese
      </label>
      <label htmlFor='sausage' className='sausage' style={{marginLeft: "2%"}}>
        <input
          type='checkbox'
          name='sausage'
          checked={formState.sausage}
          onChange={inputChange}
          data-cy="checkbox"
        />
        sausage
      </label>
      <label htmlFor='onions' className='onions' style={{marginLeft: "2%"}}>
        <input
          type='checkbox'
          name='onions'
          checked={formState.onions}
          onChange={inputChange}
          data-cy="checkbox"
        />
        onions
      </label>
    
      
      <label htmlFor='instructions' style={{marginLeft: "2%"}}>
        any special instructions?
        <input
          type='text'
          name='instructions'
          value={formState.instructions}
          onChange={inputChange}
          style={{marginLeft: "1%"}}
        />
      </label>
      {/* displaying our post request data */}
      <pre>{JSON.stringify(pizza, null, 2)}</pre>
      <button disabled={disabled} data-cy="submit">Add to Order</button>
    </form>
    );
}