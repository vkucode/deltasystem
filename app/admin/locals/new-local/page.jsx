'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddLocal = () => {
  const [formData, setFormData] = useState({
    name: '',
    localisation: { lat: '', lon: '', city: '', country: '' },
    details: { chambre: '', surface: '', etage: '' },
    price: { dolars: '', aed: '' },
    category: '',
    images: [],
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length > 1) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'images') {
        Array.from(formData[key]).forEach((file) => {
          form.append('images', file);
        });
      } else {
        form.append(key, JSON.stringify(formData[key]));
      }
    });

    try {
      await axios.post('/api/locals/add', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/locals');
    } catch (error) {
      console.error('Error adding local:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="text" name="localisation.lat" placeholder="Latitude" onChange={handleChange} required />
      <input type="text" name="localisation.lon" placeholder="Longitude" onChange={handleChange} required />
      <input type="text" name="localisation.city" placeholder="City" onChange={handleChange} required />
      <input type="text" name="localisation.country" placeholder="Country" onChange={handleChange} required />
      <input type="text" name="details.chambre" placeholder="Chambre" onChange={handleChange} required />
      <input type="text" name="details.surface" placeholder="Surface" onChange={handleChange} required />
      <input type="text" name="details.etage" placeholder="Etage" onChange={handleChange} required />
      <input type="text" name="price.dolars" placeholder="Price in Dolars" onChange={handleChange} required />
      <input type="text" name="price.aed" placeholder="Price in AED" onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
      <input type="file" name="images" multiple onChange={handleFileChange} required />
      <button type="submit">Add Local</button>
    </form>
  );
};

export default AddLocal;
