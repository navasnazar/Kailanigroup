import React from 'react'
import './table.css'
import MaterialTable from 'material-table'
import { useState, useEffect } from 'react'
import {MuiThemeProvider, createTheme, FormControlLabel} from '@material-ui/core'
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import {axiosAdminInstance} from '../../../Instance/Axios'
import Axioss from 'axios'
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,   
//   Switch,
  Checkbox,
  Upload,
} from "antd";
import { message } from "antd";


const uploadImagUrl = {}


const Table = () => {
    const [data, setData]=useState([]);
    const [render, setRender]=useState([])
    const [fldValidation, setFldValidation]=useState('')
    const [dataSubmit, setDataSubmit]=useState('')
    const [uploadData, setUploadData]=useState({})

    const [uploadImg1, setUploadImg1]=useState([])
    const [uploadImg2, setUploadImg2]=useState([])
    const [uploadImg3, setUploadImg3]=useState([])
    const [uploadImg4, setUploadImg4]=useState([])


    const [uploadImgBtn1, setUploadImgBtn1]=useState(true)
    const [uploadImgBtn2, setUploadImgBtn2]=useState(true)
    const [uploadImgBtn3, setUploadImgBtn3]=useState(true)
    const [uploadImgBtn4, setUploadImgBtn4]=useState(true)




    useEffect(()=>{
        getServices();
    },[render])



    const getServices = ()=>{
      const token = localStorage.getItem('admin')
        return new Promise(async(resolve, reject)=>{
            const response = await axiosAdminInstance.get('/services',
            {
              headers: {Authorization: token}
            }
            ).then((data)=>{
                let ServiceData = data.data.allServices
                setData(ServiceData)
                resolve()
            }).catch((e)=>{
                console.log(e);
            })
        })
    }



    const [preferDarkMode, setPreferDarkMode]=useState(()=>{
        const mode = localStorage.getItem('_tableDarkMode')
        return mode === 'false' || true
    })

    const hanldeDarkModeChange = ()=>{
        setPreferDarkMode(!preferDarkMode)
        localStorage.setItem('_tableDarkMode', !preferDarkMode)
    }

    
    const columns=[
        {title:'Title', field:'title'},
        {title:'Service', field:'service'},
        {title:'Description', field:'description'},
        {title:'Amount', field:'amount'},
    ] 


    const theme = createTheme({
        palette:{
            type: preferDarkMode ? "dark" : "light"
        }
    })
    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
          margin: 1,
          padding: 0,
          transform: 'translateX(6px)',
          '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
              )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
          },
        },
        '& .MuiSwitch-thumb': {
          backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
          width: 32,
          height: 32,
          '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
              '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
          },
        },
        '& .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
          borderRadius: 20 / 2,
        },
      }));

      const handleAddData = async()=>{
        
        const response = await axiosAdminInstance.post('/addServices',uploadImagUrl, {uploadData}).then((status)=>{
            const randomNumber = Math.random()* 1000;
            setRender(randomNumber)
            setUploadImgBtn1(true)
            setUploadImgBtn2(true)
            setUploadImgBtn3(true)
            setUploadImgBtn4(true)
        })
      }

      const handleEditData = async(data)=>{
        const token = localStorage.getItem('admin')
        const response = await axiosAdminInstance.post('/editServices', data,
        {
          headers: {Authorization: token}
        }
        ).then((status)=>{
            const randomNumber = Math.random()* 1000;
            setRender(randomNumber)
        })
      }

      const handleDeleteData = async(data)=>{
        const token = localStorage.getItem('admin')
        const response = await axiosAdminInstance.post('/delServices', data,
        {
          headers: {Authorization: token}
        }
        ).then((status)=>{
            const randomNumber = Math.random()* 1000;
            setRender(randomNumber)
        })
      }



      const uploadImageFun1 = async (e)=>{
        e.preventDefault();
            const formData = new FormData() 
            formData.append("file",uploadImg1[0])   
            formData.append("upload_preset","kailani")
        await Axioss.post('https://api.cloudinary.com/v1_1/djtvhlzt2/image/upload/' , formData).then((response)=>{
            setUploadImgBtn1(false)
            let img1_url = response.data.url
            uploadImagUrl.img1_url = img1_url
        })
      } 
      const uploadImageFun2 = async (e)=>{
        e.preventDefault();
            const formData = new FormData()
            formData.append("file",uploadImg2[0])
            formData.append("upload_preset","kailani")
            await Axioss.post('https://api.cloudinary.com/v1_1/djtvhlzt2/image/upload/' , formData).then((response)=>{
            setUploadImgBtn2(false)
            let img2_url = response.data.url
            uploadImagUrl.img2_url = img2_url
        })
      } 

      const uploadImageFun3 = async (e)=>{
        e.preventDefault();
            const formData = new FormData()
            formData.append("file",uploadImg3[0])
            formData.append("upload_preset","kailani")
            await Axioss.post('https://api.cloudinary.com/v1_1/djtvhlzt2/image/upload/' , formData).then((response)=>{
            setUploadImgBtn3(false)
            let img3_url = response.data.url
            uploadImagUrl.img3_url = img3_url
        })
      } 
      const uploadImageFun4 = async (e)=>{
        e.preventDefault();
            const formData = new FormData()
            formData.append("file",uploadImg4[0])
            formData.append("upload_preset","kailani")
            await Axioss.post('https://api.cloudinary.com/v1_1/djtvhlzt2/image/upload/' , formData).then((response)=>{
            setUploadImgBtn4(false)
            setDataSubmit('')
            let img4_url = response.data.url
            uploadImagUrl.img4_url = img4_url
            uploadImagUrl.data = uploadData
            handleAddData();
            
        })
      } 
      
     

  return (
    <div>
      {
            dataSubmit=='done' ? 
        
                <div className="image_field">
                    { uploadImgBtn1 ? <form  onSubmit={(e)=>{
                                uploadImageFun1(e)
                            }} >
                    <p> Images 1</p>
                    <input type="file" multiple
                           onChange={ (e)=>{
                                setUploadImg1(e.target.files)
                            }}
                    />
                    <button
                        type="submit"
                        className=" btn btn-primary image_btn"
                    >
                    Upload
                    </button>
                    </form> : ''}

                    {uploadImgBtn2 ? <form  onSubmit={(e)=>{
                                uploadImageFun2(e)
                            }} >
                    <p> Images 2</p>
                    <input type="file" multiple
                           onChange={ (e)=>{
                                setUploadImg2(e.target.files)
                            }}
                    />
                    <button
                    type="submit"
                    className="btn btn-primary image_btn"
                    >
                    Upload
                    </button>
                    </form> : ''}

                    {uploadImgBtn3 ? <form  onSubmit={(e)=>{
                                uploadImageFun3(e)
                            }} >
                    <p> Images 3</p>
                    <input type="file" multiple
                           onChange={ (e)=>{
                                setUploadImg3(e.target.files)
                            }}
                    />
                    <button
                    type="submit"
                    className="btn btn-primary image_btn"
                    >
                    Upload
                    </button>
                    </form> : ''}

                    {uploadImgBtn4 ? <form  onSubmit={(e)=>{
                                uploadImageFun4(e)
                            }} >
                    <p> Images 4</p>
                    <input type="file" multiple
                           onChange={ (e)=>{
                                setUploadImg4(e.target.files)
                                setUploadImgBtn4(true)
                            }}
                    />
                    <button
                    type="submit"
                    className="btn btn-primary image_btn"
                    >
                    Upload
                    </button>
                    </form> : ''}
            </div>
        : ''
        }
        <div>
            <FormControlLabel
                control={<MaterialUISwitch 
                    sx={{ m: 1 }} 
                    checked={preferDarkMode}
                    onChange={hanldeDarkModeChange} 
                    />}
                label="Theme"
            />
            <p className='validation'> {fldValidation} </p>
            <MuiThemeProvider theme={theme}>
                <MaterialTable title="Service Details"
                    data={data}
                    columns={columns}
                    
                    options={{
                        search:true,
                        filtering:false,
                        exportButton:true
                    }}
                    editable={{
                        
                        onRowAdd:(newRow)=>new Promise((resolve, reject)=>{
                            if(newRow.title &&  newRow.service && newRow.description && newRow.amount){
                                setUploadData(newRow)
                                setFldValidation('')
                                setDataSubmit('done')
                            }else{
                                setFldValidation('** All Field Required')
                            }
                            resolve()
                        }),
                        onRowDelete:selectedRow=>new Promise((resolve, reject)=>{
                            handleDeleteData(selectedRow)
                            resolve()
                        }),
                        onRowUpdate:(updatedRow)=>new Promise((resolve, reject)=>{
                            handleEditData(updatedRow)
                            resolve()
                        })
                    }}
                    options={{
                        actionsColumnIndex:-1,
                        addRowPosition:'first'
                    }}
                >
                </MaterialTable>
            </MuiThemeProvider>
        </div>
        
        
        
    </div>
  )
}

export default Table