import { getDatabase, push, ref } from "firebase/database";
import { getDownloadURL, getStorage, ref as storageReff, uploadBytes } from 'firebase/storage';

import { React, useState } from 'react';
import { app } from './firebase'; // 



const PushData = () => {
  const [data, setData] = useState('');
  const [message, setMessage] = useState('');
  const [foodname, setfoodname] = useState('');
  const [price, setprice] = useState('');
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  const storage = getStorage(app);
  const storageRef = storageReff(storage, `food-images/${image.name}`);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };


  const handlePushData = async(e) => {
    e.preventDefault();


    
    await uploadBytes(storageRef, image);

    // Get image download URL
    const downloadURL = await getDownloadURL(storageRef);
    setImageUrl(downloadURL);

    
    const db = getDatabase(app); // Pass the initialized app to getDatabase
    const dataRef = ref(db, 'fooditems'); // Replace 'your-data-node' with your actual data node

    push(dataRef, {
      "foodName": foodname,
      "price": price,
      "imageUrl": downloadURL, // Include image URL in the data
    })
      .then(() => {
        setMessage('Data pushed successfully!');
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
    
    

   
  };
  return (
    <div>
      <h2>Push Data to Firebase</h2>
      <input
        type="text"
        value={foodname}
        onChange={(e) => setfoodname(e.target.value)}
        placeholder="Enter name"
      />
       <input
        type="number"
        value={price}
        onChange={(e) => setprice(e.target.value)}
        placeholder="Enter price"
      />
       <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
             onChange={handleImageChange}
            required
          />
      <button onClick={handlePushData}>Push Data</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PushData;
