import React from 'react'
import {
    Card, CardBody
  } from '@windmill/react-ui'
import SectionTitle from '../components/Typography/SectionTitle'

function SocialMediaStats() {
  return (
    <div>
        <SectionTitle>Social Media Stats</SectionTitle>

        <div className='block lg:flex gap-4 mb-5 w-full'>
        <Card className="mb-5 w-full lg:w-1/2">
            <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Popular Accounts</p>
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

        <Card className="mb-5 w-full lg:w-1/2">
            <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Hashtags</p>
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
  )
}

export default SocialMediaStats
