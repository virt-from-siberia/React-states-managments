// import React, { useEffect } from "react";
import {
  useContactsQuery,
  useContactQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from "./services/contactsApi";

import "./App.css";

function App() {
  const { data, error, isLoading, isFetching, isSuccess } = useContactsQuery();

  return (
    <div className="App">
      <h1>React Redux Toolkit Query Tutorial</h1>
      {isLoading && <h2>Loading...</h2>}
      {isFetching && <h2>Fetching...</h2>}
      {error && <h2>Something went wrong...</h2>}
      {isSuccess && (
        <div>
          {data.map((contact) => {
            return (
              <div>
                <h3 key={contact.id} className="data">
                  <span>{contact.name}</span>
                </h3>
                <ContactDetail id={contact.id} />
              </div>
            );
          })}
        </div>
      )}
      <AddContact />
    </div>
  );
}

export const ContactDetail = ({ id }: { id: string }) => {
  const { data } = useContactQuery(id);

  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};

export const AddContact = () => {
  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const contact = {
    id: "18",
    name: "Evgeniy",
    email: "Evgeniy@mail.ru",
  };

  const contactUpdate = {
    id: "18",
    name: "Updated",
    email: "Updated@mail.ru",
  };

  const addHandler = async () => {
    await addContact(contact);
  };

  const updateHandler = async () => {
    await updateContact(contactUpdate);
  };

  const deleteHandler = async () => {
    await deleteContact(contact.id);
  };

  return (
    <div>
      <button onClick={addHandler}>add contact</button>
      <button onClick={updateHandler}>update contact</button>
      <button onClick={deleteHandler}>delete contact</button>
    </div>
  );
};

export default App;
