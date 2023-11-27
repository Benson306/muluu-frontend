import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Input, Label, Select, Button } from '@windmill/react-ui'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [gender, setGender] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [fullName, setFullName] = useState(null);

  //const navigate = useNavigate();

  const handleSubmit = () => {
    if(email == null || password == null || gender == 0 || confirmPassword == null || birthDate == null || fullName == null){
      toast.error('Fill all required Fields', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      return;
    }

    if(password !== confirmPassword){
      toast.error('Password does not match', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/user/register`,{
      method:'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        password,
        birth_date: birthDate,
        gender: Number(gender)
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);

      //navigate('/app/keyword');
    })
    .catch(err => {
      console.log(err);
    })
  }


  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <ToastContainer />
          
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <Label className="mt-4">
                <span>Full Name*</span>
                <Input className="mt-1" type="text" placeholder="John Doe" onChange={e => setFullName(e.target.value)} />
              </Label>

              <Label className="mt-4">
                <span>Email*</span>
                <Input className="mt-1" type="email" placeholder="john@doe.com" onChange={e => setEmail(e.target.value)} />
              </Label>

              <Label className="mt-4">
                <span>Gender*</span>
                <Select className="mt-1" onChange={e => setGender(e.target.value)}>
                <option value=""></option>
                <option value={1}>Male</option>
                <option value={2}>Female</option>
              </Select>
              </Label>
              
              <Label className="mt-4">
                <span>Birth Date*</span>
                <Input className="mt-1" type="date" placeholder="john@doe.com" onChange={e => setBirthDate(e.target.value)} />
              </Label>

              <Label className="mt-4">
                <span>Password*</span>
                <Input className="mt-1" placeholder="***************" type="password" onChange={e => setPassword(e.target.value)} />
              </Label>
              <Label className="mt-4">
                <span>Confirm password*</span>
                <Input className="mt-1" placeholder="***************" type="password" onChange={e => setConfirmPassword(e.target.value)} />
              </Label>

              {/* <Label className="mt-6" check>
                <Input type="checkbox" />
                <span className="ml-2">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
              </Label> */}

              <Button block className="mt-4" onClick={(e)=> {
                e.preventDefault();
                handleSubmit();
              }}>
                Create account
              </Button>

              <hr className="my-8" />

              {/* <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button block className="mt-4" layout="outline">
                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button> */}

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
