import React, { useState, useEffect } from 'react';
import axios from 'axios';




const Test = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    address: ''
  });


  //listing in Table
  const [users, setUsers] = useState([]);
// Table me Map me Listing

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData,[name]: value });
  };



  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/getdata');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    try {
      var allok = window.confirm("Do you want to submit the data ");
      if (allok == 1) {
        const response = await axios.put('http://localhost:8081/putdata', formData)
        console.log(response.data);
        window.location.href = 'http://localhost:3000/test';
      };
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleted = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8081/deletedata`, { id: id })
      alert(response.data);
      window.location.href = 'http://localhost:3000/test';
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const edit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/requestdata/${id}`);
      setFormData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }} >
        <div className='container-fluid d-flex ' style={{ width: '1000px', height: '400px' }} >
          <div className="col-md-6 p-5 m-1 shadow">  <h5 className='text-center'>This is CURD App</h5>
            <p className='text-center fs-6'>This Form Show How The CURD Function is work</p>
            <form onSubmit={handleSubmit} type="POST">
              <div className="form-group">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className='form-control' name='username' value={formData.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className='form-control' name='password' value={formData.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea name="address" role='3' className='form-control' value={formData.address} onChange={handleChange}></textarea>
                </div>
                <div className="form-group mt-2">
                  <button type="submit" className='btn btn-primary'>Submit</button>
                </div>
              </div>
            </form></div>
          <div className="col-md-6 p-5 m-1 shadow">
            <table className='table table-bordered'>
              <thead>
                <th>#</th>
                <th style={{ width: '70%' }} >Name</th>
                <th>Action</th>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>
                      <i onClick={() => deleted(user.id)} className=" p-1 bi bi-trash3"></i>
                      <i onClick={() => edit(user.id)} className=" p-1 bi bi-pencil-square"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Test;
