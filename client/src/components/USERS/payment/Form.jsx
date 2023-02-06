import React from 'react'
import './form.css'
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {axiosUserInstance} from '../../../Instance/Axios'


const FormDetails = () => {
  const [data, setData] = useState({})
  const [render, setRender]=useState(0)
  const [formData, setFormData]=useState({})

  const user = useSelector((state)=>state.user.loginUserDetails)


  useEffect(()=>{
      getForms();
  },[render])
  
  const getForms = ()=>{
        return new Promise(async(resolve, reject)=>{
          const token = localStorage.getItem('userToken')
          const response = await axiosUserInstance.post('/getform', user, 
          {
            headers: {Authorization: token}
          }
          ).then((resp)=>{
            let formDatas = resp.data.data
            setFormData(formDatas)
            resolve()
        })
      })
  }
  

  const updateData = e => {
      setData({
          ...data,
          [e.target.name]: e.target.value
      })
    }
  
    
  const form = useRef();

  const sendEmail = async(e) => {
    e.preventDefault();
    const token = localStorage.getItem('userToken')
    const response = await axiosUserInstance.patch('/form', {data:data, user:user}).then((resp)=>{
        let x = Math.random()
        setRender(x)
        toast.success('Submitted Success!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
    })
  };





  return (
    <section id='form'>
      <h5>Form</h5>
      <h2>Full your Info.</h2>
      <ToastContainer/>
      <div className='container form__container'>
        
        <form ref={form} onSubmit={sendEmail} >
          
          <div className='form_div'>
            {formData ?
            <input onChange={updateData} type="text" name='name' placeholder='Enter your Full Name'  defaultValue={formData.name} required/>
            :
            <input onChange={updateData} type="text" name='name'  placeholder='Enter your Full Name' required/>
            }

            {formData ?
            <input onChange={updateData} type="text" name='email' placeholder='Enter your Email ID'  defaultValue={formData.email} required/>
            :
            <input onChange={updateData} type="text" name='email'  placeholder='Enter your Email ID' required/>
            }

            {formData ?
            <input onChange={updateData} type="text" name='mobile' placeholder='Enter your Mobile Number'  defaultValue={formData.mobile} required/>
            :
            <input onChange={updateData} type="text" name='mobile'  placeholder='Enter your Mobile Number' required/>
            }

            {formData ?
            <input onChange={updateData} type="text" name='address' placeholder='Enter your Address' defaultValue={formData.address} required/>
            :
            <input onChange={updateData} type="text" name='address'  placeholder='Enter your Address' required/>
            }

            {formData ?
            <input onChange={updateData} type="text" name='city' placeholder='Enter your City' defaultValue={formData.city} required/>
            :
            <input onChange={updateData} type="text" name='city'  placeholder='Enter your City' required/>
            }

            {formData ?
            <input onChange={updateData} type="text" name='state' placeholder='Enter your State' defaultValue={formData.state} required/>
            :
            <input onChange={updateData} type="text" name='state'  placeholder='Enter your State' required/>
            }

            {formData ?
            <input onChange={updateData} type="text" name='country' placeholder='Enter your Country' defaultValue={formData.country} required/>
            :
            <input onChange={updateData} type="text" name='country'  placeholder='Enter your Country' required/>
            }

            {formData ?
            <input onChange={updateData} type="text" name='zipcode' placeholder='Enter your Zip Code' defaultValue={formData.zipcode} required/>
            :
            <input onChange={updateData} type="text" name='zipcode'  placeholder='Enter your Zip Code' required/>
            }

            {formData ?
            <input onChange={updateData} type="text" name='phone' placeholder='Enter your Alternate Mobile' defaultValue={formData.phone} required/>
            :
            <input onChange={updateData} type="text" name='phone'  placeholder='Enter your Alternate Mobile' required/>
            }


          </div>
          <textarea onChange={updateData} name="message"  rows="3" placeholder='Extras_suggestions'></textarea>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
      </div>
    </section>
  )
}

export default FormDetails