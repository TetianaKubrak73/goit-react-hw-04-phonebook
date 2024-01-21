import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import style from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  // Подтягиваем данные из Локал Стораж
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contactList'));
    if (storedContacts?.length) {
      setContacts(storedContacts);
    }
  }, []);

  // Добавляем данные в Локал Стораж
  useEffect(() => {
    localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]);

  // Добавление нового контакта в список контактов
  const addContact = contact => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [
      { id: nanoid(), ...contact },
      ...prevContacts,
    ]);
  };

  // Изменение значения фильтра
  const changeFilter = event => {
    setFilter(event.target.value);
  };

  // Получение отфильтрованных контактов
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // Удаление контакта из списка
  const removeContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className={style.container}>
      <h1>Phonebook</h1>

      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      {contacts.length > 0 ? (
        // Фильтр для отображения контактов
        <Filter value={filter} onChangeFilter={changeFilter} />
      ) : (
        <div className="style.wrapper">
          Your phonebook is empty. Add first contact!
        </div>
      )}
      {contacts.length > 0 && (
        // Список контактов
        <ContactList
          contacts={visibleContacts}
          onRemoveContact={removeContact}
        />
      )}
    </div>
  );
};

export default App;
