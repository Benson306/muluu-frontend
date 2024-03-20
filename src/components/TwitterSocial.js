import React, { useContext, useEffect, useState } from 'react'
import {
    Card, CardBody
  } from '@windmill/react-ui'
import SectionTitle from './Typography/SectionTitle'
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { AuthContext } from '../context/AuthContext';

function TwitterSocial({ keyword }) {
    const [socials, setSocials] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const { token } = useContext(AuthContext);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_LOCAL_IP}/twitter_social`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({
                keyword: keyword,
                count: 5
            })
        })
        .then(response => {
            if(response.ok){
                
                response.json().then(res => {
                    setSocials(res.result);
                    setLoading(false);
                })
                
            }else{
                setError(true);
                setLoading(false);
            }
        })
        .catch(err => {
            setError(true);
            setLoading(false);
        })
    },[])

    
  return (
    <div>
        <SectionTitle>X</SectionTitle>
        {
            loading && socials == null && 
            <div className='flex justify-center mt-5 mb-10'>
                <ReactLoading type={"spin"} color={"#805ad5"} height={'3%'} width={'3%'} />
            </div>
        }
        {
            !loading && error && 

            <Card className="mb-5 w-full">
                <CardBody>
                    <p className='text-center text-sm p-2 text-red-500'>Error fetching Data. Try again</p>
                </CardBody>
            </Card>
        }
        {
            !loading && !error && socials !== null && 
                <div className='block lg:flex gap-4 mb-5 w-full'>
                    <Card className="mb-5 w-full lg:w-1/2">
                        <CardBody>
                        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Popular Accounts</p>
                        
                        <div className='mb-3'>
                        {
                            !loading && socials !== null && socials.posts.length > 0 ? socials.posts.map(user => (
                                <Link to={`https://x.com/${user.username}`} target="_black" className='flex items-center w-full p-3 border border-gray-300 m-2 rounded-lg'>
                                    <img crossorigin='anonymous' src={user.user_profile_pic} className='h-10 rounded-lg object-contain' />
                                    <div className='block w-3/4 ml-1'>
                                        <div className='text-gray-600 dark:text-gray-300 text-sm'>{user.username}</div>
                                    </div>
                                </Link>
                            )) : (
                                <div className='text-red-500 text-sm ml-2'>No Users found.</div>
                            )
                        }
                        </div>
                        </CardBody>
                    </Card>

                    <Card className="mb-5 w-full lg:w-1/2">
                        <CardBody>
                            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Hashtags</p>
                            {
                                !loading && socials !== null && socials.hashtags.length > 0 ? socials.hashtags.map(hashtag => (
                                    <div className='mb-2 border border-gray-300 rounded-lg p-2'>
                                        { hashtag.length > 0 && <div className='text-gray-600 dark:text-white text-sm'>{hashtag}</div> }
                                        { hashtag.htg && <div className='text-black dark:text-white text-sm'>{hashtag.htg}</div> }
                                        { hashtag.use_count && <div className='text-gray-600 dark:text-gray-300 text-xs'>View Count: {hashtag.use_count}</div> }
                                    </div>
                                )) : (
                                    <div className='text-red-500 text-sm ml-2'>No hashtags found.</div>
                                )
                            }
                        </CardBody>
                    </Card>

                </div>
        }
    </div>
  )};
  export default TwitterSocial