import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axiox from 'axios'
import './users.css'
import Navbar from '../navbar/Navbar'

function UserDetails1() {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    getAllUsers();
    async function getAllUsers() {
        const config = {
            headers: {
              Accept: 'application/json',
              Authorization:token,
              'Content-Type': 'application/json',
            },
          };
      const response = await axiox.get('http://localhost:3500/admin/allusers',config);
      setUserDetails(response.data.details);
    }
  }, [userDetails]);

  async function block(id) {
    const token = localStorage.getItem('adminToken');
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization:token,
        'Content-Type': 'application/json',
      },
    };
    const data = await axiox.put(`http://localhost:3500/admin/block/${id}`,config);
    console.log(data);
    if (data.blocked) {
      setUserDetails(data.userDetails);
    }
  }

  async function unblock(id) {
    const token = localStorage.getItem('adminToken');
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization:token,
        'Content-Type': 'application/json',
      },
    };
    const data = await axiox.put(`http://localhost:3500/admin/unblock/${id}`,config);
    console.log(data);
    if (data.blocked) {
      window.location.reload(true);
      setUserDetails(data.userDetails);
    }
  }



  const columns = [
    {
      name: 'Name',

      selector: (row) => row.name,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Mobile',
      selector: (row) => row.phone,
    },
    {
      name: 'Action',
      selector: (row) => {
        return (
          <div>
            {row.blockStatus ? (
              
                <button
                
                  onClick={()=>unblock(row._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Unblock
                </button>

            ) : (
              <button
                onClick={() => block(row._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Block
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="user_container">
      {/* <Navbar/> */}
        <div>
        <DataTable
          title="All Users"
          columns={columns}
          data={userDetails}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          // selectableRows
          selectableRowsHighlight
          highlightOnHover
        />
        </div>
      </div>
    </div>
  );
}

export default UserDetails1;
