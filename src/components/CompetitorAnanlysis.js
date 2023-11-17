import React from 'react'
import {
    Card, CardBody
  } from '@windmill/react-ui'
import SectionTitle from '../components/Typography/SectionTitle'

function CompetitorAnanlysis() {
  return (
    <div>
    <SectionTitle>Competitor Ananlysis</SectionTitle>

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
  )
}

export default CompetitorAnanlysis
