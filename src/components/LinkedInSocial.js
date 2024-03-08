import React, { useEffect, useState } from 'react'
import {
    Card, CardBody
  } from '@windmill/react-ui'
import SectionTitle from './Typography/SectionTitle'
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';

function LinkedInSocial({ keyword }) {
    const [socials, setSocials] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch(`http://localhost:3000/linkedin_social`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                keyword: keyword,
                count: 5
            })
        })
        .then(response => {
            if(response.ok){
                
                response.json().then(res => {
                    console.log(res)
                    setSocials(res[0].result);
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
        <SectionTitle>LinkedIn</SectionTitle>
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
                                !loading && socials &&  socials.users.length > 0 ? socials.users.map(user => (
                                    <Link to={`https://linkedin.com/in/${user.profileUrl}`} target="_black" className='flex item-center w-full p-3 border border-gray-300 m-2 rounded-lg'>
                                        <div className='block w-3/4 ml-2'>
                                            <div className='text-purple-600'>{user.username}</div>
                                            <div className='text-gray-600 dark:text-gray-300 text-sm'>{user.profileTitle}</div>
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
                            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Top Posts</p>
                            {
                                !loading && socials &&  socials.posts.length > 0 ? socials.posts.map(post => (
                                    <div className='flex item-center w-full p-3 border border-gray-300 m-2 rounded-lg'>
                                        <div className='block w-3/4 ml-2'>
                                            <div className='text-purple-600 text-sm'>{post.postDescription}</div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className='text-red-500 text-sm ml-2'>No posts found.</div>
                                )
                            }
                        </CardBody>
                    </Card>

                </div>
        }
    </div>
  )};
  export default LinkedInSocial