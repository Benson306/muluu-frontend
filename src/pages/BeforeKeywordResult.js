import React from 'react'
import SectionTitle from '../components/Typography/SectionTitle'
import {
    Card, CardBody
  } from '@windmill/react-ui'

function BeforeKeywordResult() {
  return (
    <div className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 mt-2">
        <div className='flex justify-center mb-2'>
            <SectionTitle>Here's what to expect from the search:</SectionTitle>
        </div>

            <div className='flex flex-wrap gap-10 justify-center'>

                <Card className="p-4 w-full lg:w-1/4 bg-gray-100 dark:bg-cool-gray-900">
                    <div className='text-purple-600'>Related Keywords</div>
                    <div className='mt-1 dark:text-white'>Essential terms assisting SEO by expanding content relevance and boosting search visibility across varied queries.</div>
                </Card>

                <Card className="p-4 w-full lg:w-1/4 bg-gray-100 dark:bg-cool-gray-900">
                    <div className='text-purple-600'>Short tail Keywords</div>
                    <div className='mt-1 dark:text-white'>Concise and broad search terms, usually consisting of one or two words, often delivering high search volume and broader user intent in SEO strategies.</div>
                </Card>

                <Card className="p-4 w-full lg:w-1/4 bg-gray-100 dark:bg-cool-gray-900">
                    <div className='text-purple-600'>Long tail Keywords</div>
                    <div className='mt-1 dark:text-white'>Specific and detailed search phrases containing three or more words, targeting niche audiences and catering to more refined user search queries for SEO optimization.</div>
                </Card>

                <Card className="p-4 w-full lg:w-1/4 bg-gray-100 dark:bg-cool-gray-900">
                    <div className='text-purple-600'>What people ask about the keyword</div>
                    <div className='mt-1 dark:text-white'>People's inquiries regarding a keyword phrase, often seeking information, solutions, or details, assisting in understanding user interests and needs for content creation or optimization.</div>
                </Card>

                <Card className="p-4 w-full lg:w-1/4 bg-gray-100 dark:bg-cool-gray-900">
                    <div className='text-purple-600'>Popular social media posts about the keywords</div>
                    <div className='mt-1 dark:text-white'>Widely-shared content across social platforms, showcasing discussions, trends, or engagements, offering insights into public interest and perceptions around the specific keyword.</div>
                </Card>

                <Card className="p-4 w-full lg:w-1/4 bg-gray-100 dark:bg-cool-gray-900">
                    <div className='text-purple-600'>Hashtags about the kewyord</div>
                    <div className='mt-1 dark:text-white'>Tagged phrases used in social media posts to categorize content, amplify visibility, and engage audiences around a specific topic or theme, aiding in content discovery and trend identification.</div>
                </Card>

                <Card className="p-4 w-full lg:w-1/4 bg-gray-100 dark:bg-cool-gray-900">
                    <div className='text-purple-600'>Popular social media accounts about the keyword</div>
                    <div className='mt-1 dark:text-white'>Prominent social media profiles discussing the keyword: Influential accounts with substantial followership engaging and sharing content related to a specific topic, serving as valuable sources of information and insights within the given niche.</div>
                </Card>

            </div>
    </div>
  )
}

export default BeforeKeywordResult
