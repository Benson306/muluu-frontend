import React, { useEffect, useState } from 'react'
import {
    Card, CardBody
  } from '@windmill/react-ui'
import SectionTitle from '../components/Typography/SectionTitle'

function SocialMediaStats({ keyword }) {
    const [socials, setSocials] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch(`http://localhost:3000/socials`,{
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                keyword: keyword,
                count: 5
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
          setSocials(response[0])
          
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
      })
    },[])

    
  return (
    <div>
        <SectionTitle>Social Media Stats</SectionTitle>

        <div className='block lg:flex gap-4 mb-5 w-full'>
        <Card className="mb-5 w-full lg:w-1/2">
            <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Popular Accounts</p>
            <p className="text-gray-600 dark:text-gray-400">
                Instagram
            </p>
            {
                !loading && socials.instagram.users.map(user => (
                    <div className='flex w-full p-2 border-2 border-gray-400 m-1'>
                        <img crossorigin='anonymous' src={user.profile_pic_url} className='h-10 rounded-lg object-contain' />
                        <div className='block w-3/4 ml-1'>
                            <div className='text-purple-600'>{user.fullname}</div>
                            <div className='text-gray-400 text-sm'>{user.username}</div>
                        </div>
                    </div>
                ))
            }
            <p className="text-gray-600 dark:text-gray-400">
                Tiktok
            </p>
            <p className="text-gray-600 dark:text-gray-400">
                Twitter
            </p>
            <p className="text-gray-600 dark:text-gray-400">
                LinkedIn
            </p>
            </CardBody>
        </Card>

        <Card className="mb-5 w-full lg:w-1/2">
            <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Hashtags</p>
            <p className="text-gray-600 dark:text-gray-400">
                Twitter
            </p>
            <p className="text-gray-600 dark:text-gray-400">
                Tiktok
            </p>
            <p className="text-gray-600 dark:text-gray-400">
                Instagram
            </p>
            <p className="text-gray-600 dark:text-gray-400">
                LinkedIn
            </p>
            </CardBody>
        </Card>
        </div>

        <div className='block lg:flex gap-4 mb-5'>
        <Card className="mb-5 w-full">
            <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Popular Posts</p>
            <p className="text-gray-600 dark:text-gray-400">
                Twitter
            </p>
            <p className="text-gray-600 dark:text-gray-400">
                Tiktok
            </p>
            <p className="text-gray-600 dark:text-gray-400">
                Instagram
            </p>
            <p className="text-gray-600 dark:text-gray-400">
                LinkedIn
            </p>
            </CardBody>
        </Card>

        </div>
      
    </div>
  )
}

export default SocialMediaStats
