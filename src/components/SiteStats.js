import React from 'react'
import {
    Card, CardBody
  } from '@windmill/react-ui'
import SectionTitle from '../components/Typography/SectionTitle'
import RoundIcon from './RoundIcon'
import InfoCard from './Cards/InfoCard'
import { CartIcon, RankIcon, ForbiddenIcon, BackLinkIcon, DomainIcon } from '../icons'

function SiteStats() {
  return (
    <div>
      <SectionTitle>Site Stats</SectionTitle>

      <Card className="mb-5">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Technical Stats</p>
        
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Backlinks" value="6389">
          <RoundIcon
            icon={BackLinkIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="SERP Position" value="321">
          <RoundIcon
            icon={RankIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Sub Domains" value="376">
          <RoundIcon
            icon={DomainIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Broken Links" value="5">
          <RoundIcon
            icon={ForbiddenIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
        </CardBody>
    </Card>

    <div className='block lg:flex gap-4 mb-5'>
        <div className="mb-5 w-full lg:w-1/2">
            <Card >
                <CardBody>
                <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Backlinks</p>
                <p className="text-gray-600 dark:text-gray-400"> Link 1 </p>
                <p className="text-gray-600 dark:text-gray-400"> Link 2 </p>
                <p className="text-gray-600 dark:text-gray-400"> Link 3 </p>
                <p className="text-gray-600 dark:text-gray-400"> Link 4 </p>
                <p className="text-gray-600 dark:text-gray-400"> Link 5 </p>
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

export default SiteStats
