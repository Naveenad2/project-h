import { getDatabase, ref } from "firebase/database";

function DataUpload(){

    const db = getDatabase(app); // Pass the initialized app to getDatabase
    const dataRef = ref(db, 'your-data-node'); // Replace 'your-data-node' with your actual data node

    push(dataRef, data)
      .then(() => {
        setMessage('Data pushed successfully!');
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });

}