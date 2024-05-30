// pages/locals/add.jsx
'use client'
import { useState } from 'react';
import axios from 'axios';
import styles from './addLocal.module.scss'

const AddLocal = () => {
  const [formData, setFormData] = useState({
    name: '',
    localisation: { lat: '', lon: '' },
    details: { chambre: '', surface: '' },
    price: { dolar: '', aed: '' },
    img: '',
    gallery: { imgs: [] }, // Inițializare corectă
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNestedChange = (e, parentKey) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [parentKey]: {
        ...formData[parentKey],
        [name]: value
      }
    });
  };

  const handleGalleryChange = (index, value) => {
    const newGallery = [...formData.gallery.imgs];
    newGallery[index] = value;
    setFormData({
      ...formData,
      gallery: { imgs: newGallery }
    });
  };

  const addGalleryImage = () => {
    setFormData({
      ...formData,
      gallery: { imgs: [...formData.gallery.imgs, ''] }
    });
  };

  const removeGalleryImage = (index) => {
    const newGallery = formData.gallery.imgs.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      gallery: { imgs: newGallery }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/locals/add', formData);
      console.log('Data added successfully:', response.data);
    } catch (error) {
      console.error('Failed to add data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formAdd}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="lat" value={formData.localisation.lat} onChange={(e) => handleNestedChange(e, 'localisation')} placeholder="Latitude" required />
      <input name="lon" value={formData.localisation.lon} onChange={(e) => handleNestedChange(e, 'localisation')} placeholder="Longitude" required />
      <input name="chambre" value={formData.details.chambre} onChange={(e) => handleNestedChange(e, 'details')} placeholder="Chambre" required />
      <input name="surface" value={formData.details.surface} onChange={(e) => handleNestedChange(e, 'details')} placeholder="Surface" required />
      <input name="dolar" value={formData.price.dolar} onChange={(e) => handleNestedChange(e, 'price')} placeholder="Price in Dolars" required />
      <input name="aed" value={formData.price.aed} onChange={(e) => handleNestedChange(e, 'price')} placeholder="Price in AED" required />
      <input name="img" value={formData.img} onChange={handleChange} placeholder="Image URL" required />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />

      <div>
        <label>Gallery Images:</label>
        {formData.gallery.imgs.map((img, index) => (
          <div key={index}>
            <input
              type="text"
              value={img}
              onChange={(e) => handleGalleryChange(index, e.target.value)}
              placeholder="Image Name"
              required
            />
            <button type="button" onClick={() => removeGalleryImage(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addGalleryImage}>Add Image</button>
      </div>

      <button type="submit">Add Local</button>
    </form>
  );
};

export default AddLocal;
