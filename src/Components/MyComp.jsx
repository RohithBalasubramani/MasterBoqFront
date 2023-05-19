import { useState, useEffect } from 'react';
import axios from 'axios';

function MyComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/product/")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {data.map(item => (
        <p key={item.id}>{item.id}</p>
      ))}
    </div>
  );
}

export default MyComponent
