import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Layout from '../components/Layout';

function ContactPage() {
  const supabase = useSupabaseClient();
  const [newContact, setNewContact] = useState({
    id: null, 
    firstname: '',
    lastname: '',
    email: '',
    created_at: new Date(),
    message: '',
  });

  useEffect(() => {
    const addContact = async () => {
      try {
        if (!newContact.firstname || !newContact.lastname || !newContact.email || !newContact.message) {
          console.error('First name, last name, email, and message are required.');
          return;
        }

        const { data, error } = await supabase
          .from('contacts')
          .insert([
            {
              id: newContact.id,
              firstname: newContact.firstname,
              lastname: newContact.lastname,
              email: newContact.email,
              created_at: newContact.created_at,
              message: newContact.message,
            },
          ])
          .select('*');

        if (error) {
          console.error('Error inserting contact:', error.message);
        } else {
          console.log('Contact inserted successfully:', data);
        }
      } catch (error) {
        console.error('Error inserting contact:', error.message);
      }
    };

    addContact();
  }, [newContact, supabase]);

  const handleInputChange = (e) => {
    setNewContact({
      ...newContact,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div className="bg-gray-100 p-4">
        <p className="wt-title">Contact Us !</p>
        <p className="text-lg">------------------</p>
      </div>
      <div className="mt-4">
        <form>
        <label>
            Id:
            <input type="text" name="id" value={newContact.id} onChange={handleInputChange} />
          </label> <br />
          <label>
            First Name:
            <input type="text" name="firstname" value={newContact.firstname} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" name="lastname" value={newContact.lastname} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="text" name="email" value={newContact.email} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Message:
            <textarea name="message" value={newContact.message} onChange={handleInputChange} />
          </label>

          <br />
          <button type="submit">Add Contact</button>
        </form>
      </div>
    </Layout>
  );
}

export default ContactPage;
