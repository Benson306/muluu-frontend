import React, { useEffect, useState } from 'react'
import {
    Input, HelperText, Label, Select, Textarea, Button, Card, CardBody
  } from '@windmill/react-ui'
import SectionTitle from '../components/Typography/SectionTitle'
import { Link } from 'react-router-dom'

function KeywordsStats({ keyword, data, topLinks, topRelatedKeywords }) {

    const [socails, setSocials] = useState(null);
    const [longtail, setLongtail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [type, setType]= useState(null);

    useEffect(()=>{
        fetch(`http://localhost:3000/longtail/${keyword}`)
        .then(response => response.json())
        .then(response => {

            if (typeof response === 'string') {
                setType("string")
            } else {
                setType("array");
            }
          setLongtail(response)
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
      })
    },[])

    let uniqueObject = {};
    let uniqueTopLinks = topLinks.filter((obj) => {
    return uniqueObject.hasOwnProperty(obj.title)
        ? false
        : (uniqueObject[obj.title] = true);
    });

  return (
    <div>
      <SectionTitle>Keyword Stats</SectionTitle>

    <div className='block lg:flex gap-4 mb-5'>
    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Related Searches</p>
        { data.relatedSearches.map( (rs, index) => (
            <p key={index} className="text-sm text-gray-600 dark:text-gray-400">{rs.query}</p>
        ))} 
        </CardBody>
    </Card>


    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Top Google Related Searches</p>
        { topRelatedKeywords.slice(0,8).map( (rs, index) => (
            <p key={index} className="text-sm text-gray-600 dark:text-gray-400">{rs}</p>
        ))} 
        </CardBody>
    </Card>
    </div>

    <div className='block lg:flex gap-4 mb-5'>
    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Organic Search</p>
        { data.organic.slice(0,3).map( (rs, index) => (
            <div key={index} className='border border-gray-300 p-2 mb-1'>
                <Link key={index} to={rs.link} target='_blank' className='text-sm text-blue-500 hover:underline'>{rs.title}</Link>
                <div className='text-sm text-gray-600 dark:text-gray-400'>{rs.snippet}</div>
            </div>
        ))} 
        </CardBody>
    </Card>

    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Top Links</p>
        { uniqueTopLinks.map( (rs, index) => (
            <div key={index}>
                <Link key={index} to={rs.link} target='_blank' className='text-sm text-blue-500 hover:underline'>{rs.title}</Link>
            </div>
        ))} 
        </CardBody>
    </Card>
    </div>

    <div className='block lg:flex gap-4 mb-5'>
    {/* <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Long tail keywords</p>
        <p className="text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, cum commodi a omnis
            numquam quod? Totam exercitationem quos hic ipsam at qui cum numquam, sed amet
            ratione! Ratione, nihil dolorum.
        </p>
        </CardBody>
    </Card> */}
    
    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Long tail Keywords</p>
        {
            !loading && type == "string" && <p className="text-purple-600">{`No longtail keyword assocated with ${keyword}`}</p>
        }
        { !loading && type == "array" && longtail.map( (rs, index) => (
            <p key={index} className="text-gray-600 dark:text-gray-400">- {rs}</p>
        ))
        } 
        </CardBody>
    </Card>

    
    </div>
    </div>
  )
}

export default KeywordsStats
