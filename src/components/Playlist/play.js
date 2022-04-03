import React, { useState } from 'react';
import { addTracksToPlaylist, createPlaylist } from '../../Data/Profile';
import Button from '../UI/Button';
import Input from './input';
import Merge from './merge';
import '../../App.css';

export default function Play({ accessToken, userId, uriTracks }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const [errorForm, setErrorForm] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrorForm({ ...errorForm, [name]: '' });
  }

  const validateForm = () => {
    let isValid = true;

    if (form.title.length < 10) {
      setErrorForm({
        ...errorForm,
        title: 'Title must be at least 10 characters long'
      });
      isValid = false;
    }

    if (form.description.length > 300) {
      setErrorForm({
        ...errorForm,
        description: 'Description must be less than 300 characters long'
      });
      isValid = false;
    }

    if(!uriTracks.length>0){
        alert('Playlist gagal dibuat. Periksa kembali pada setiap lagu yang telah dipilih.');
        isValid = false;
    }

    return isValid;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
          name: form.title,
          description: form.description,
        });

        await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);

        alert('Playlist berhasil dibuat');

        setForm({ title: '', description: '' });
      } catch (error) {
        alert('Playlist gagal dibuat. Periksa kembali pada setiap lagu yang telah dipilih.')
      }
    }
  }

  return (
    <div className="playlist">
      <div>
        <h2>Create Playlist</h2>

        <form className="playlist-form" onSubmit={handleSubmit}>
          <Merge>
            <Input
              label="Title"
              placeholder="Title of playlist"
              value={form.title}
              id="title-playlist"
              name="title"
              onChange={handleChange}
              error={errorForm.title}
              required
            />
          </Merge>
          <Merge>
            <Input
              type='textarea'
              label="Description"
              placeholder="Description of playlist"
              value={form.description}
              id="description-playlist"
              name="description"
              onChange={handleChange}
              required
              error={errorForm.description}
            />
          </Merge>

          <div className="playlist-button">
            <button type="submit">Add</button
            >
          </div>
        </form>
      </div>
    </div>
  )
}