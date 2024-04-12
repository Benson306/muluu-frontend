import React from 'react'
import {
    Card, CardBody
  } from '@windmill/react-ui'
import SectionTitle from '../components/Typography/SectionTitle'

function CompetitorAnanlysis({ url }) {
  return (
    <div>
    <SectionTitle>Competitor Ananlysis</SectionTitle>
    <div className='block lg:flex gap-4 mb-5'>
        <div className="mb-5 w-full lg:w-1/2">
            <Card className="mb-5 ">
              <CardBody>
                <p className="mb-5 font-semibold text-gray-600 dark:text-gray-300">Best Perfoming Pages</p>
                <p className="text-gray-600 dark:text-gray-400">Page 1</p>
                <p className="text-gray-600 dark:text-gray-400">Page 2</p>
                <p className="text-gray-600 dark:text-gray-400">Page 3</p>
                <p className="text-gray-600 dark:text-gray-400">Page 4</p>
                <p className="text-gray-600 dark:text-gray-400">Page 5</p>
              </CardBody>
            </Card>
        </div>
        <div className="mb-5 w-full lg:w-1/2">
            <Card>
                <CardBody>
                <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Worst Perfoming Pages</p>
                <p className="text-gray-600 dark:text-gray-400"> Link 1 </p>
                <p className="text-gray-600 dark:text-gray-400"> Link 2 </p>
                <p className="text-gray-600 dark:text-gray-400"> Link 3 </p>
                <p className="text-gray-600 dark:text-gray-400"> Link 4 </p>
                <p className="text-gray-600 dark:text-gray-400"> Link 5 </p>
                </CardBody>
            </Card>
        </div>
      </div>
    </div>
  )
}

export default CompetitorAnanlysis
