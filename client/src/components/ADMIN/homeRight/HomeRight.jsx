import React from 'react'
import './homeright.css'
import Navbar from '../navbar/Navbar'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import HomeBottom from './HomeBottom';

const HomeRight = () => {
  const data1 = [
    {
      "name": "Page A",
      "uv": 4000,
    },
    {
      "name": "Page B",
      "uv": 3000,
    },
    {
      "name": "Page C",
      "uv": 2000,
    },
    {
      "name": "Page D",
      "uv": 2780,
    },
    {
      "name": "Page E",
      "uv": 1890,
    },
    {
      "name": "Page F",
      "uv": 2390,
    },
    {
      "name": "Page G",
      "uv": 3490,
    }
  ]
  const data2 = [
    {
      "name": "Page A",
      "uv": 3000,
    },
    {
      "name": "Page B",
      "uv": 1100,
    },
    {
      "name": "Page C",
      "uv": 200,
    },
    {
      "name": "Page D",
      "uv": 1780,
    },
    {
      "name": "Page E",
      "uv": 1500,
    },
    {
      "name": "Page F",
      "uv": 2390,
    },
    {
      "name": "Page G",
      "uv": 1090,
    }
  ]
  const data3 = [
    {
      "name": "Page A",
      "uv": 2000,
    },
    {
      "name": "Page B",
      "uv": 100,
    },
    {
      "name": "Page C",
      "uv": 2000,
    },
    {
      "name": "Page D",
      "uv": 780,
    },
    {
      "name": "Page E",
      "uv": 1100,
    },
    {
      "name": "Page F",
      "uv": 1390,
    },
    {
      "name": "Page G",
      "uv": 1190,
    }
  ]
  
  return (
    <>
    <div className='home_rightbar_container'>
      <Navbar/>
        <div>
          <div className='item_container'>
            <div className='item_container1'>
              <div className='sub_item_container'>
                <p className='task_progress'>Task Progress</p>
                <p className='task_counter'>212</p>
                <p className='current_month_1'>Current Month</p>
              </div>
              <div className='barchart_container'>
                <BarChart width={220} height={120} data={data1}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Bar dataKey="uv" fill="#000" />
                </BarChart>
              </div>
            </div>
            <div className='item_container1'>
            <div className='sub_item_container'>
                <p className='task_progress'>Booking Finish</p>
                <p className='task_counter'>115</p>
                <p className='current_month_1'>Current Month</p>
              </div>
              <div className='barchart_container'>
                <BarChart width={220} height={120} data={data2}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Bar dataKey="uv" fill="#000" />
                </BarChart>
              </div>
            </div>
            <div className='item_container1'>
            <div className='sub_item_container'>
                <p className='task_progress'>Cur. Booking </p>
                <p className='task_counter'>21</p>
                <p className='current_month_1'>Current Month</p>
              </div>
              <div className='barchart_container'>
                <BarChart width={220} height={120} data={data3}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Bar dataKey="uv" fill="#000" />
                </BarChart>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      <HomeBottom/>

    </div>

  
    </>
    
  )
}

export default HomeRight