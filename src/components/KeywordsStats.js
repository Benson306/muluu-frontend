import React from 'react'
import {
    Input, HelperText, Label, Select, Textarea, Button, Card, CardBody
  } from '@windmill/react-ui'
import SectionTitle from '../components/Typography/SectionTitle'

function KeywordsStats({ data, longtail }) {
    
  return (
    <div>
      <SectionTitle>Keyword Stats</SectionTitle>

    <div className='block lg:flex gap-4 mb-5'>
    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Related Searches</p>
        { data.relatedSearches.map( (rs, index) => (
            <p key={index} className="text-gray-600 dark:text-gray-400">{rs.query}</p>
        ))} 
        </CardBody>
    </Card>

    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">People Also Ask</p>
        { data.peopleAlsoAsk.map( (rs, index) => (
            <p key={index} className="text-gray-600 dark:text-gray-400">{rs.question}</p>
        ))} 
        </CardBody>
    </Card>
    </div>

    <div className='block lg:flex gap-4 mb-5'>
    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Short tail keywords</p>
        <p className="text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, cum commodi a omnis
            numquam quod? Totam exercitationem quos hic ipsam at qui cum numquam, sed amet
            ratione! Ratione, nihil dolorum.
        </p>
        </CardBody>
    </Card>
    
    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Long tail Keywords</p>
        { longtail.map( (rs, index) => (
            <p key={index} className="text-gray-600 dark:text-gray-400">- {rs}</p>
        ))} 
        </CardBody>
    </Card>

    
    </div>
    </div>
  )
}

export default KeywordsStats
