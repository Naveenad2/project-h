import { getDatabase, push } from "firebase/database";
import { ref } from "firebase/storage";
import { useState } from "react";
import { app } from "./firebase";

const AddFoodForm = () => {
  
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

//   const storage = getStorage(app);
//   const storageRef = image ? ref(storage, `food-images/${image.name}`) : null;

  const handleImageChange = (e) => {

    const file = e.target.files[0];
    setImage(file);
  };

  const handleFormSubmit =  (e) => {
    e.preventDefault();

    if (!foodName || !price || !image) {
      setMessage("Please fill in all fields");
      return;
    }

    // await uploadBytes(storageRef, image);

    // // Get image download URL
    // const downloadURL = await getDownloadURL(storageRef);
    // setImageUrl(downloadURL);

    //
    const db = getDatabase(app); // Pass the initialized app to getDatabase
    const dataRef = ref(db, 'your-data-node'); // Replace 'your-data-node' with your actual data node

    push(dataRef, "data")
      .then(() => {
        setMessage('Data pushed successfully!');
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
     
    //
  };

  return (
    <div className="card">
      <h2>Add New Food Item</h2>
      <form>
        <div className="form-group">
          <label htmlFor="foodName">Food Name</label>
          <input
            type="text"
            id="foodName"
            name="foodName"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Food"
            style={{ maxWidth: "100%", marginBottom: "10px" }}
          />
        )}
        <div className="form-group">
          <button onClick={handleFormSubmit} type="submit">
            Add Food
          </button>
        </div>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default AddFoodForm;
