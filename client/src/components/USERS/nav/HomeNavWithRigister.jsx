import React, { useEffect } from 'react'
import './nav.css'
import {Link} from 'react-router-dom'
import {AiOutlineHome, AiOutlineUser} from 'react-icons/ai'
import {RiServiceLine} from 'react-icons/ri'
import {TiMessages} from 'react-icons/ti'
import {TfiGallery} from 'react-icons/tfi'
import { useState } from 'react'
import {FiGrid} from 'react-icons/fi'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import jwt from 'jwt-decode'
import {useDispatch} from 'react-redux'
import {getUserLoginDetails} from '../../../redux/userReducer'
import {useSelector} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {axiosUserInstance} from '../../../Instance/Axios'
import { Form, Input, Tooltip, Cascader, Select, Row,
        Col, Checkbox, Button, AutoComplete, Modal } from 'antd';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from './firebase'
const auth = getAuth(app);

const HomeNav = () => {
  const [activeNav, setActiveNav]=useState('#')
  const [loginVisible, setLoginVisible]=useState(false);
  const [navActive, setNavActive]=useState(true)
  const [regErr, setRegErr]=useState('')
  const [loginErr, setLoginErr]=useState('')
  const [mobileVerify, setMobileVerify]=useState(true)
  const [submitSignup, setSubmitSignup]=useState(false)
  const [navVisible, setNavVisible] = useState(false);
  const [verifyOTP, setVerifyOTP]=useState(false)
  const [verified, setVerified]=useState(false)
  const [regAllData, setRegAllData]=useState({})


  const dispatch = useDispatch(); 
  const userId = useSelector((state) => state.user.loginUserDetails.userID);


  const registerCall = ()=>{
    setNavVisible(false)
    setLoginVisible(true)
    setNavActive(false)
  }
  

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  

// register call start -------------------->
  const onCreate = async (values) => {
    // if(verified){
      const response = await axiosUserInstance.post('/signup',values).then((res)=>{
        let resData = res.data
        if(resData.status=='err'){
          toast.error('Already Registered! Please login', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        if(resData.status=='done'){
          setNavActive(false)
          setNavVisible(false);
          setLoginVisible(true)
          toast.success('Register Success!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
    // }else{
    //   toast.error('please verify mobile', {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    // }
  };
// register call end -------------------->




  // Register form start.......
  const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    const onNumberSubmit = ()=>{
      const allData = form.getFieldValue()
      setRegAllData(allData)
      const phone = allData.phone
      onSignSubmit(phone);
    }

    const onSubmitOTP = async()=>{
      const otp = form.getFieldValue('OTP')
      verifyCode(otp)
    }

    const onCaptchaVerify = ()=>{
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onSignSubmit();
        }
      }, auth);
    } 

      const onSignSubmit = async(data)=>{
        onCaptchaVerify();
        const phoneNumber = `+91${data}`
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setVerifyOTP(true)
          toast.success('OTP Sended!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }).catch((error) => {
          toast.error('Oops!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
      }
      const verifyCode =(otp)=>{
        window.confirmationResult.confirm(otp).then((result) => {
          const user = result.user;
          toast.success('Verification Done!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setVerified(true)
          setMobileVerify(false)
        }).catch((error) => {
          toast.error('Invalid OTP!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setVerified(false)
        });
      } 
        

    return (
      <div>
        <Modal
        open={visible}
        title="Register"
        okText="Register"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <div className='validation_err'>{regErr}</div>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            className='email'
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
          <Input.Password />
          </Form.Item>

          <Form.Item
            name="nickname"
            label={
              <span>
                Full Name 
                
              </span>
            }
            rules={[
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
            
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              }
            ]}
          >
            <Input
              style={{
                width: '100%',
              }}
              maxLength='10'
            />
          </Form.Item>

          {/* <Form.Item>
              <Input
                onClick={onNumberSubmit}
                type='button'
                value={verified ? 'verified' :'verify'}
                style={{
                  width: '30%',
                  marginTop:'3px',
                  color:'blue'
                }}
              />
          </Form.Item> */}

                {
                  verifyOTP ?
                  <div>

                  <Form.Item
                      name="OTP"
                      label="OTP"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your phone number OTP',
                        },
                      ]}
                    >
                      <Input
                      maxLength='6'
                      
                        style={{
                          width: '100%',
                        }}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Input
                        onClick={onSubmitOTP}
                        type='button'
                        value='Submit'
                        style={{
                          width: '30%',
                          marginTop:'3px',
                          color:'blue'
                        }}
                      />
                    </Form.Item>
                  </div>
                  :
                  ''
                }
                  
        </Form>
        <div className='loginSection'>
        </div>
        <div id='recaptcha-container'>

        </div>
        
        <div>
          <p>Already Register ? <Link onClick={registerCall} style={{color:'blue'}}> Login</Link></p>
        </div>
        </Modal>
      </div>
    );
  }
  //Register form end......




// login start -------------------->
  const onFinish = async (values) => {
    setSubmitSignup(true)
    const response = await axiosUserInstance.post('/login',values).then((res)=>{
      let resData = res.data
      if(resData.status=='err'){
        setLoginErr(resData.data)
      }
      if(resData.status=='done'){
        localStorage.setItem('userToken', resData.user)
        const user = jwt(resData.user)
        dispatch(getUserLoginDetails(user))
        setNavVisible(false);
        setLoginVisible(false)
        setNavActive(true)
        toast.success('Login Success!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        
      }
    })
  };
//login end -------------------->


  const setNavFunction = ()=>{
    setLoginVisible(false)
    setNavActive(true)
  }

  return (
    <nav>
      <div>
        {
          navActive ? 
            <div className='navBar_style'>
                <a href='#'
                  onClick={()=>setActiveNav('#')} 
                  className={activeNav === '#' ? 'active' : ''}>
                    <AiOutlineHome/>
                </a>
                
                <div>
                    {userId ? 
                    <Link to="/profile"><AiOutlineUser/></Link> 
                    :
                    // <Link to="/login"><AiOutlineUser/></Link> 
                  
                      <div>
                        <Button className='registerButton'
                        type=''
                          onClick={() => {
                            setNavVisible(true);
                          }}
                        >
                          <AiOutlineUser/>
                        </Button>
                          <CollectionCreateForm
                            className='formReg'
                            visible={navVisible}
                            onCreate={onCreate}
                            onCancel={() => {
                              setNavVisible(false);
                            }}
                          />
                      </div>
                    }
                </div>

                <a href="#services"
                  onClick={()=>setActiveNav('#services')} 
                  className={activeNav === '#services' ? 'active' : ''}>
                  <RiServiceLine/>
                </a>
                <a href="#contact"
                  onClick={()=>setActiveNav('#contact')} 
                  className={activeNav === '#contact' ? 'active' : ''}>
                  <TiMessages/>
                </a>
                
                <Link to="/gallery">
                <TfiGallery/></Link>

                <Link to="/booking">
                <FiGrid/></Link>
            </div>

          : ''
        }
      </div>
      

      <div>
        {loginVisible ?
        
            <Form
            visible={loginVisible}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button  type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>

            <div className='validation_err'>{loginErr}</div>

            <Form.Item>
              <div className='login_back'>
                  <a onClick={setNavFunction}> Back</a>
              </div>
            </Form.Item>

            
          </Form>
        : ''}
        </div>

    </nav>
  )
}

export default HomeNav