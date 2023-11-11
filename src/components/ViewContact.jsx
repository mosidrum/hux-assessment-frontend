import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

const ViewContact = () =>{
  const params = useParams();
  useEffect(() => {
    axios.get('http://localhost:8081/view/'+params)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [])
  return (
    <div>view</div>
  );
};

export default ViewContact;
