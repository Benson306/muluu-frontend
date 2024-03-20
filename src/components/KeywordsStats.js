import React, { useContext, useEffect, useState } from 'react'
import {
    Card, CardBody
  } from '@windmill/react-ui'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import RelatedKeywordsData from './RelatedKeywordsData'

function KeywordsStats({ keyword, domain, data, topLinks, topRelatedKeywords }) {

    const [socails, setSocials] = useState(null);
    const [longtail, setLongtail] = useState([]);
    const [serpData, setSerpData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [type, setType]= useState(null);
    const [showSerpData, setShowSerpData] = useState(false);

    const { token } = useContext(AuthContext);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/longtail`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({
                keyword
            })
        })
        .then(response => 
            {
                if(response.ok){
                    return response.json();
                }else{
                    return null;
                }
            })
        .then(response => {
            let RespType = Array.isArray(response);
            if(RespType){
                setType("array");
                setLongtail(response)
            }else{
                setType("string")
            }

            if(domain !== null){
                fetch(`${process.env.REACT_APP_API_URL}/serp-search`,{
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        domain,
                        keyword
                    })
                })
                .then((newResponse)=> newResponse.json())
                .then((newResponse)=>{
                    setLoading(false);
                    setSerpData(newResponse.result.organic);
                    setShowSerpData(true);
                })
                .catch(err =>{ console.log(err) })
            }
            setLoading(false);
        })
        .catch(err => {
          console.log(err);
      })
    },[])

    let uniqueObject = {};
    let uniqueTopLinks = topLinks && topLinks.length > 0  ? topLinks.filter((obj) => {
    return uniqueObject.hasOwnProperty(obj.title)
        ? false
        : (uniqueObject[obj.title] = true);
    }) :
    null

  return (
    <div>
    <RelatedKeywordsData keyword={keyword} country={"kenya"} />

    <div className='block lg:flex gap-4 mb-5'>
    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Related Searches</p>
        { data.relatedSearches ? data.relatedSearches.map( (rs, index) => (
            <p key={index} className="text-sm text-gray-600 dark:text-gray-400">{rs.query}</p>
        ))
        :
        <p className='text-red-500 text-sm'>No related Searches</p>
        } 
        </CardBody>
    </Card>


    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Top Google Related Searches</p>
        { topRelatedKeywords && topRelatedKeywords.length > 0 ? topRelatedKeywords.slice(0,8).map( (rs, index) => (
            <p key={index} className="text-sm text-gray-600 dark:text-gray-400">{rs}</p>
        ))
        :
        <p className='text-red-500 text-sm'>No Top google Related Searches</p>
        } 
        </CardBody>
    </Card>
    </div>

    <div className='block lg:flex gap-4 mb-5'>
    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Organic Search</p>
        { data.organic && data.organic.length > 0 ? data.organic.slice(0,3).map( (rs, index) => (
            <div key={index} className='border border-gray-300 p-2 mb-1'>
                <Link key={index} to={rs.link} target='_blank' className='text-sm text-blue-500 hover:underline'>{rs.title}</Link>
                <div className='text-sm text-gray-600 dark:text-gray-400'>{rs.snippet}</div>
            </div>
        )):
        
        <p className='text-red-500 text-sm'>No Organic Search Results</p>
        } 
        </CardBody>
    </Card>

    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Top Links</p>
        { uniqueTopLinks && uniqueTopLinks.length > 0 ? uniqueTopLinks.map( (rs, index) => (
            <div key={index}>
                <Link key={index} to={rs.link} target='_blank' className='text-sm text-blue-500 hover:underline'>{rs.title}</Link>
            </div>
        )):
        
        <p className='text-red-500 text-sm'>No Top Link Results</p>} 
        </CardBody>
    </Card>
    </div>

    <div className='block lg:flex gap-4 mb-5'>
    
    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Long tail Keywords</p>
        {
            !loading && type === "string" ? 
            ( <p className="text-red-500 text-sm">{`No longtail keywords assocated with ${keyword}`}</p> )
            :
            longtail.map( (rs, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-400 text-sm">- {rs}</p>
            ))
        }
        </CardBody>
    </Card>

    { showSerpData && 
    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">SERP Position</p>
        { 
            serpData && serpData.length > 0 ? serpData.map( (rs, index) => (
                <div key={index} className='border border-gray-300 p-2 mb-1'>
                    <Link key={index} to={rs.link} target='_blank' className='text-sm text-blue-500 hover:underline'>{rs.title}</Link>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>{rs.snippet}</div>
                    <div className='text-xs bg-purple-600 text-white p-1 rounded-lg px-2 mt-1 w-1/6'>Position: {rs.position}</div>
                </div>
            )):
            
            <p className='text-red-500 text-sm'>No SERP Results for this keyword</p>
        }
        </CardBody>
    </Card> }

    
    </div>
    </div>
  )
}

export default KeywordsStats
