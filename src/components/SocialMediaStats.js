import React, { useEffect, useState } from 'react'
import {
    Card, CardBody
  } from '@windmill/react-ui'
import SectionTitle from '../components/Typography/SectionTitle'
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';

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
          
          
        })
        .then(()=>{
            setLoading(false);
        })
        .catch(err => {
          console.log(err);
      })
    },[])

    
  return (
    <div>
        <SectionTitle>Social Media Stats</SectionTitle>
    {
        loading && <div className='flex justify-center mt-5 mb-10'>
        <ReactLoading type={"spin"} color={"#805ad5"} height={'3%'} width={'3%'} />
      </div>
    }
    {
        !loading && socials !== null && 
        <div>

        <div className='block lg:flex gap-4 mb-5 w-full'>
        <Card className="mb-5 w-full lg:w-1/2">
            <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Popular Accounts</p>

            <div className='mb-3'>
                <p className="text-black dark:text-gray-400">
                    Instagram
                </p>
                {
                    !loading && socials.instagram.users.length > 0 ? socials.instagram.users.map(user => (
                        <Link to={`https://instagram.com/${user.username}`} target="_black" className='flex w-full p-3 border-2 border-gray-400 m-2 rounded-lg'>
                            <div className='block w-3/4 ml-2'>
                                <div className='text-purple-600'>{user.fullname}</div>
                                <div className='text-gray-600 dark:text-gray-300 text-sm'>{user.username}</div>
                            </div>
                        </Link>
                    )) : (
                        <div className='text-red-500 ml-2'>No users found.</div>
                    )
                }
            </div>
            
            <div className='mb-3'>
                <p className="text-black dark:text-gray-400">
                    TikTok
                </p>
                {
                    !loading && socials.tiktok.posts.length > 0 ? socials.tiktok.posts.map(post => (
                        <Link to={`https://tiktok.com/@${post.user_id}`} target="_black" className='flex w-full p-3 border-2 border-gray-400 m-2 rounded-lg'>
                                <div className='text-purple-600'>{post.username}</div>
                        </Link>
                    )) : (
                        <div className='text-red-500 ml-2'>No Users found.</div>
                    )
                }
            </div>

            <div className='mb-3'>
                <p className="text-black dark:text-gray-400">
                    X
                </p>
                {
                    !loading && socials.x.posts.length > 0 ? socials.x.posts.map(user => (
                        <Link to={`https://x.com/${user.username}`} target="_black" className='flex items-center w-full p-3 border-2 border-gray-400 m-2 rounded-lg'>
                            <img crossorigin='anonymous' src={user.user_profile_pic} className='h-10 rounded-lg object-contain' />
                            <div className='block w-3/4 ml-1'>
                                <div className='text-gray-600 dark:text-gray-300 text-sm'>{user.username}</div>
                            </div>
                        </Link>
                    )) : (
                        <div className='text-red-500 ml-2'>No Users found.</div>
                    )
                }
            </div>

            <div className='mb-3'>
                <p className="text-black dark:text-gray-400">
                    LinkedIn
                </p>
                {
                    !loading && socials.linkedIn.users.length > 0 ? socials.linkedIn.users.map(user => (
                        <Link to={`https://linkedin.com/in/${user.profileUrl}`} target="_black" className='flex item-center w-full p-3 border-2 border-gray-400 m-2 rounded-lg'>
                            <div className='block w-3/4 ml-2'>
                                <div className='text-purple-600'>{user.username}</div>
                                <div className='text-gray-600 dark:text-gray-300 text-sm'>{user.profileTitle}</div>
                            </div>
                        </Link>
                    )) : (
                        <div className='text-red-500 ml-2'>No Users found.</div>
                    )
                }
            </div>
            </CardBody>
        </Card>

        <Card className="mb-5 w-full lg:w-1/2">
            <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Hashtags</p>
            <Card className="mb-3 w-fulls">
                <CardBody>
                <p className="text-black mb-2 dark:text-gray-400">
                    TikTok Hashtags
                </p>
                {
                    !loading && socials.tiktok.hashtags.length > 0 ?   socials.tiktok.hashtags.slice(0,10).map(hashtag => (
                        <div className='mb-2 border border-gray-300 rounded-lg p-2'>
                            { hashtag.length > 0 && <div className='text-gray-700 dark:text-white text-md'>{hashtag}</div> }
                            { hashtag.hashtag && <div className='text-black dark:text-white text-md'>{hashtag.hashtag}</div> }
                            { hashtag.view_count &&<div className='text-gray-600 dark:text-gray-300 text-sm'>View Count: {hashtag.view_count}</div> }
                            { hashtag.use_count && <div className='text-gray-600 dark:text-gray-300 text-sm'>Use Count: {hashtag.use_count}</div> }
                        </div>
                    )) : (
                        <div className='text-red-500 ml-2'>No hashtags found.</div>
                    )
                }
                </CardBody>
            </Card>

            <Card className="mb-3 w-fulls">
                <CardBody>
                <p className="text-black mb-2 dark:text-gray-400">
                    X Hashtags
                </p>
                {
                    !loading && socials.x.hashtags.length > 0 ? socials.x.hashtags.map(hashtag => (
                        <div className='mb-2 border border-gray-300 rounded-lg p-2'>
                            { hashtag.length > 0 && <div className='text-gray-600 dark:text-white text-md'>{hashtag}</div> }
                            { hashtag.htg && <div className='text-black dark:text-white text-md'>{hashtag.htg}</div> }
                            { hashtag.use_count && <div className='text-gray-600 dark:text-gray-300 text-sm'>View Count: {hashtag.use_count}</div> }
                        </div>
                    )) : (
                        <div className='text-red-500 ml-2'>No hashtags found.</div>
                    )
                }
                </CardBody>
            </Card>

            <Card className="mb-3 w-fulls">
                <CardBody>
                <p className="text-black mb-2 dark:text-gray-400">
                    Instagram Hashtags
                </p>
                
                {
                    !loading && socials.instagram.hashtags.length > 0 ? socials.instagram.hashtags.map(hashtag => (
                        <div className='text-gray-600 dark:text-gray-300 text-sm'>{hashtag}</div>
                    )) : (
                        <div className='text-red-500 ml-2'>No hashtags found.</div>
                    )
                }
                </CardBody>
            </Card>

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
    }
      
    </div>
  )
}

export default SocialMediaStats
