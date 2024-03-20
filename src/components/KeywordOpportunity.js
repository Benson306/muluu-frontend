import React from 'react'
import {
    Input, Label, Select, Button, Card, CardBody
  } from '@windmill/react-ui'
function KeywordOpportunity({ url, error, keywordOpportunity }) {

    console.log(url, error, keywordOpportunity)
  return (
    <div>
        <Card>
            <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Keyword Opportunity</p>
            {/* <CTA text={"These are keywords that rank highly for a particular industry but have not been used on this site"} /> */}
            {
                error && <p className="text-red-500 dark:text-red-400">
                Error fetching keyword opportunity for {url}
            </p>
            }
            { !error && keywordOpportunity.keywords && keywordOpportunity.keywords.length > 0 ? keywordOpportunity.keywords.slice(0,9).map((keyword)=>(
                <p key={keyword} className="text-gray-600 dark:text-gray-400">
                {keyword}
                </p> 
            )) : !error && keywordOpportunity.message &&
            <p className="text-red-500 dark:text-red-400">
                No Keyword opportunities found
            </p> }
            
            </CardBody>
        </Card>
    </div>
  )
}

export default KeywordOpportunity