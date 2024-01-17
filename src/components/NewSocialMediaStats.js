import React, { useEffect, useState } from 'react'
import {
    Card, CardBody
  } from '@windmill/react-ui'
import SectionTitle from '../components/Typography/SectionTitle'
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';

function NewSocialMediaStats({ keyword, country }) {
    const [socials, setSocials] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/user/new-socials`,{
            mode: 'cors',
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                keyword,
                country
            }),
            redirect: "follow",
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setSocials(response.result)
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
        loading && socials == null && <div className='flex justify-center mt-5 mb-10'>
        <ReactLoading type={"spin"} color={"#805ad5"} height={'3%'} width={'3%'} />
      </div>
    }
    {
        !loading && socials && 
        <div>

        <div className='mb-5 w-full'>
        <Card className="mb-5">
            <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Popular Accounts</p>

            <div className='block lg:flex gap-4 w-full'>

                <div className='mb-3 w-full lg:w-1/2'>
                    <div className='mb-4 bg-gray-100 dark:bg-transparent  p-2 rounded-lg'>
                        <p className="text-black dark:text-gray-400 mb-2">
                            Instagram
                        </p>
                        {
                            
                            !loading && socials.length > 0 && socials.filter( social => social.socialType === "INST").map(user => 
                                <Link to={`${user.url}`} target="_black" className='flex items-center w-full p-3 border-2 border-gray-400 mb-2  rounded-lg gap-4'>
                                    <img alt="Image Not Found" onError={(e) => {e.target.src = "../assets/img/profile.png"}}  crossorigin='anonymous' src={user.image} className='h-10 rounded-lg object-contain' />
                                    <div className='flex justify-between items-center w-full'>
                                        <div className=''>
                                            <div className='text-purple-600'>{user.name}</div>
                                            <div className='text-gray-600 dark:text-gray-300 text-sm'>{user.screenName}</div>
                                            
                                        </div>
                                        <div>
                                            {
                                                user.usersCount > 33000 ? 
                                                <div className='bg-green-600 text-white text-xs p-1 px-2 rounded-md '>Macro Influencer</div>
                                                :
                                                <div className='bg-blue-600 text-white text-xs p-1 px-2 rounded-md'>Micro Influencer</div>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            )
                        }

                        {
                            !loading && socials.length > 0 && socials.filter( social => social.socialType === "INST").length < 1 && <div className='text-red-500 ml-2'>No Users found.</div>
                        }
                    </div>

                    <div className='mb-4 bg-gray-100 dark:bg-transparent  p-2 rounded-lg'>
                        <p className="text-black dark:text-gray-400 mb-2">
                            Facebook
                        </p>
                        {
                            
                            !loading && socials.length > 0 && socials.filter( social => social.socialType === "FB").map(user => 
                                <Link to={`${user.url}`} target="_black" className='flex items-center w-full p-3 border-2 border-gray-400 mb-2  rounded-lg gap-4'>
                                    <img alt="Image Not Found" onError={(e) => {e.target.src = "../assets/img/profile.png"}}  crossorigin='anonymous' src={user.image} className='h-10 rounded-lg object-contain' />
                                    <div className='flex justify-between items-center w-full'>
                                        <div className=''>
                                            <div className='text-purple-600'>{user.name}</div>
                                            <div className='text-gray-600 dark:text-gray-300 text-sm'>{user.screenName}</div>
                                            
                                        </div>
                                        <div>
                                            {
                                                user.usersCount > 33000 ? 
                                                <div className='bg-green-600 text-white text-xs p-1 px-2 rounded-md '>Macro Influencer</div>
                                                :
                                                <div className='bg-blue-600 text-white text-xs p-1 px-2 rounded-md'>Micro Influencer</div>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            )
                        }

                        {
                            !loading && socials.length > 0 && socials.filter( social => social.socialType === "FB").length < 1 && <div className='text-red-500 ml-2'>No Users found.</div>
                        }
                    </div>
                    
                </div>

                <div className='mb-3 w-full lg:w-1/2'>
                    <div className='mb-4 bg-gray-100 dark:bg-transparent  p-2 rounded-lg'>
                        <p className="text-black dark:text-gray-400 mb-2">
                            Twitter
                        </p>
                        {
                            
                            !loading && socials.length > 0 && socials.filter( social => social.socialType === "TW").map(user => 
                                <Link to={`${user.url}`} target="_black" className='flex items-center w-full p-3 border-2 border-gray-400 mb-2  rounded-lg gap-4'>
                                    <img alt="Image Not Found" onError={(e) => {e.target.src = "../assets/img/profile.png"}}  crossorigin='anonymous' src={user.image} className='h-10 rounded-lg object-contain' />
                                    <div className='flex justify-between items-center w-full'>
                                        <div className=''>
                                            <div className='text-purple-600'>{user.name}</div>
                                            <div className='text-gray-600 dark:text-gray-300 text-sm'>{user.screenName}</div>
                                            
                                        </div>
                                        <div>
                                            {
                                                user.usersCount > 5000 ? 
                                                <div className='bg-green-600 text-white text-xs p-1 px-2 rounded-md '>Macro Influencer</div>
                                                :
                                                <div className='bg-blue-600 text-white text-xs p-1 px-2 rounded-md'>Micro Influencer</div>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            )
                        }

                        {
                            !loading && socials.length > 0 && socials.filter( social => social.socialType === "TW").length < 1 && <div className='text-red-500 ml-2'>No Users found.</div>
                        }
                    </div>

                    <div className='mb-4 bg-gray-100 dark:bg-transparent  p-2 rounded-lg'>
                        <p className="text-black dark:text-gray-400 mb-2">
                            TikTok
                        </p>
                        {
                            
                            !loading && socials.length > 0 && socials.filter( social => social.socialType === "TT").map(user => 
                                <Link to={`${user.url}`} target="_black" className='flex items-center w-full p-3 border-2 border-gray-400 mb-2  rounded-lg gap-4'>
                                    <img alt="Image Not Found" onError={(e) => {e.target.src = "../assets/img/profile.png"}}  crossorigin='anonymous' src={user.image} className='h-10 rounded-lg object-contain' />
                                    <div className='flex justify-between items-center w-full'>
                                        <div className=''>
                                            <div className='text-purple-600'>{user.name}</div>
                                            <div className='text-gray-600 dark:text-gray-300 text-sm'>{user.screenName}</div>
                                            
                                        </div>
                                        <div>
                                            {
                                                user.usersCount > 5000 ? 
                                                <div className='bg-green-600 text-white text-xs p-1 px-2 rounded-md '>Macro Influencer</div>
                                                :
                                                <div className='bg-blue-600 text-white text-xs p-1 px-2 rounded-md'>Micro Influencer</div>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            )
                        }

                        {
                            !loading && socials.length > 0 && socials.filter( social => social.socialType === "TT").length < 1 && <div className='text-red-500 ml-2'>No Users found.</div>
                        }
                    </div>
                    
                
                </div>

            </div>
            
            {/* <div className='mb-3'>
                <p className="text-black dark:text-gray-400">
                    TikTok
                </p>
                {
                    !loading && socials && socials.tiktok.posts.length > 0 ? socials.tiktok.posts.map(post => (
                        <Link to={`https://tiktok.com/@${post.user_id}`} target="_black" className='flex w-full p-3 border-2 border-gray-400 m-2 rounded-lg'>
                                <div className='text-purple-600'>{post.username}</div>
                        </Link>
                    )) : (
                        <div className='text-red-500 ml-2'>No Users found.</div>
                    )
                }
            </div> */}

            {/* <div className='mb-3'>
                <p className="text-black dark:text-gray-400">
                    X
                </p>
                {
                    !loading && socials && socials.x.posts.length > 0 ? socials.x.posts.map(user => (
                        <Link to={`https://x.com/${user.username}`} target="_black" className='flex items-center w-full p-3 border-2 border-gray-400 m-2 rounded-lg'>
                            <img alt="Image Not Found" onError={(e) => {e.target.src = "../assets/img/profile.png"}}  crossorigin='anonymous' src={user.user_profile_pic} className='h-10 rounded-lg object-contain' />
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
                    !loading && socials &&  socials.linkedIn.users.length > 0 ? socials.linkedIn.users.map(user => (
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
            </div> */}
            </CardBody>
        </Card>

        {/* <Card className="mb-5 w-full lg:w-1/2">
            <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Hashtags</p>
            <Card className="mb-3 w-fulls">
                <CardBody>
                <p className="text-black mb-2 dark:text-gray-400">
                    TikTok Hashtags
                </p>
                {
                    !loading && socials && socials.tiktok.hashtags.length > 0 ?   socials.tiktok.hashtags.slice(0,10).map(hashtag => (
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
                    !loading && socials && socials.x.hashtags.length > 0 ? socials.x.hashtags.map(hashtag => (
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
                    !loading && socials &&  socials.instagram.hashtags.length > 0 ? socials.instagram.hashtags.map(hashtag => (
                        <div className='text-gray-600 dark:text-gray-300 text-sm'>{hashtag}</div>
                    )) : (
                        <div className='text-red-500 ml-2'>No hashtags found.</div>
                    )
                }
                </CardBody>
            </Card>

            </CardBody>
        </Card> */}
        </div>

        {/* <div className='block lg:flex gap-4 mb-5'>
        <Card className="mb-5 w-full">
            <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Popular Posts</p>

            <div className='block lg:flex gap-4 mb-2'>
            <div className='w-full lg:w-1/2 p-4 rounded-lg mb-2'>
                    <p className="text-gray-600 dark:text-gray-400">
                        X 
                    </p>
                    {
                        !loading && socials && socials.x.posts.length > 0 ? socials.x.posts.map(user => (
                            <Link to={`https://x.com/${user.username}`} target="_black" className='flex items-center w-full p-3 border-2 border-gray-400 m-2 rounded-lg'>
                                <img alt="Image Not Found" onError={(e) => {e.target.src = "../assets/img/profile.png"}}  crossorigin='anonymous' src={user.user_profile_pic} className='h-10 rounded-lg object-contain' />
                                <div className='block w-3/4 ml-2'>
                                    <div className='text-black dark:text-gray-300 text-sm mb-1'>{user.username}</div>
                                    <div className='text-gray-700 dark:text-gray-500 text-xs'>{user.post}</div>
                                </div>
                            </Link>
                        )) : (
                            <div className='text-red-500 ml-2'>No Posts found.</div>
                        )
                    }
            </div>
            
            <div className='w-full lg:w-1/2 p-4 rounded-lg mb-2'>
                    <p className="text-gray-600 dark:text-gray-400">
                        TikTok
                    </p>
                    {
                        !loading && socials && socials.tiktok.posts.length > 0 ? socials.tiktok.posts.map(user => (
                            <Link to={user.url} target="_black" className='flex items-center w-full p-3 border-2 border-gray-400 m-2 rounded-lg'>
                                <div className='block w-3/4 ml-2'>
                                    <div className='text-black dark:text-purple-300 text-sm mb-1'>{user.username}</div>
                                    <div className='text-gray-700 dark:text-gray-500 text-xs'>{user.post}</div>
                                </div>
                            </Link>
                        )) : (
                            <div className='text-red-500 ml-2'>No Posts found.</div>
                        )
                    }
            </div>

            </div>

            <div className='w-full p-4 rounded-lg mb-2'>
                <p className="text-gray-600 dark:text-gray-400">
                    LinkedIn
                </p>

                {
                    !loading && socials &&  socials.linkedIn.posts.length > 0 ? socials.linkedIn.posts.map(post => (
                        <div className='flex item-center w-full p-3 border-2 border-gray-400 m-2 rounded-lg'>
                            <div className='block w-3/4 ml-2'>
                                <div className='text-purple-600'>{post.postDescription}</div>
                                <div className='text-gray-600 dark:text-gray-300 text-sm flex gap-5'>
                                    {post.reactionsCount == null ? <p>0</p> : <p>{post.reactionsCount}</p> }
                                    {post.commentsCount == null ? <p>0</p> : <p>{post.commentsCount}</p> }
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className='text-red-500 ml-2'>No Users found.</div>
                    )
                }

            </div> 
            </CardBody>
        </Card>

        </div> */}
        </div>
    }
      
    </div>
  )
}

export default NewSocialMediaStats
