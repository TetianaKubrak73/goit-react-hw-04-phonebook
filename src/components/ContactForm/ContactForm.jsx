import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import style from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  // Генерация уникальных идентификаторов для полей формы
  const nameInputId = nanoid();
  const numberInputId = nanoid();

  // Обработка отправки формы
  const handleSubmit = event => {
    event.preventDefault();

    // Вызов функции onSubmit из родительского компонента с передачей объекта контакта
    onSubmit({ name: state.name, number: state.number });

    // Сброс состояния формы
    reset();
  };

  // Обработка изменения значений полей формы
  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  // Сброс состояния формы
  const reset = () => {
    setState({ number: '', name: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}>
        Name
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Enter a contact name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          autoComplete="on"
          required
        />
      </label>

      <label htmlFor={numberInputId}>
        Number
        <input
          type="tel"
          name="number"
          value={state.number}
          onChange={handleChange}
          placeholder="Enter a contact number"
          pattern="/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          autoComplete="on"
          required
        />
      </label>

      <button className={style.buttonAdd} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
