import React from 'react'
import SectionTitle from '../components/Typography/SectionTitle'
import {
    Card, CardBody
  } from '@windmill/react-ui'

function BeforeDomainResults() {
  return (
    <div className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 mt-2">
        <div className='flex justify-center mb-2'>
            <SectionTitle>Here's what to expect from the search:</SectionTitle>
        </div>

            <div className='flex flex-wrap gap-10 justify-center'>

                <Card className="p-4 w-full lg:w-1/4 bg-gray-100 dark:bg-cool-gray-900">
                    <div className='text-purple-600'>Keyword Opportunity</div>
                    <div className='text-sm mt-1 dark:text-white'>These are keywords that rank highly for a particular industry but have not been used on this site</div>
                </Card>

                <Card className="p-4 w-full lg:w-1/4 bg-gray-100 dark:bg-cool-gray-900">
                    <div className='text-purple-600'>Backlinks</div>
                    <div className='text-sm mt-1 dark:text-white'>Backlinks are links from other websites to yours, influencing your site's credibility and search engine rankings, driving more traffic and visibility.</div>
                </Card>

                <Card className="p-4 w-full lg:w-1/4 bg-gray-100 dark:bg-cool-gray-900">
                    <div className='text-purple-600'>Best Perfoming Pages</div>
                    <div className='text-sm mt-1 dark:text-white'>Best-performing SEO pages exhibit high organic traffic, strong keyword rankings, and engaging, relevant content that satisfies search intent, leading to superior visibility and high click-through rates on SERPs.</div>
                </Card>

                <Card className="p-4 w-full lg:w-1/4 bg-gray-100 dark:bg-cool-gray-900">
                    <div className='text-purple-600'>Worst Perfoming Pages</div>
                    <div className='text-sm mt-1 dark:text-white'>Worst-performing SEO pages usually struggle with low organic traffic, poor keyword rankings, irrelevant or thin content that doesn't match search intent, resulting in limited visibility and low click-through rates on search engine results pages (SERPs).</div>
                </Card>

                

                <Card className="p-4 w-full lg:w-1/4 bg-gray-100 dark:bg-cool-gray-900">
                    <div className='text-purple-600'>Site Metrics</div>
                    <div className='text-sm mt-1 dark:text-white'>Site metrics like page load time, total blocking time, server response time, and speed index measure different aspects of a website's speed and performance, crucial for better user experience and potentially improved search engine rankings.</div>
                </Card>

            </div>
    </div>
  )
}

export default BeforeDomainResults
