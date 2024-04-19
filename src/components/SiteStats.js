import React, { useContext, useEffect, useState } from 'react'
import {
    Card, CardBody
  } from '@windmill/react-ui'
import SectionTitle from '../components/Typography/SectionTitle'
import RoundIcon from './RoundIcon'
import InfoCard from './Cards/InfoCard'
import { CartIcon, RankIcon, ForbiddenIcon, BackLinkIcon, DomainIcon } from '../icons'
import ReactLoading from 'react-loading';
import { AuthContext } from '../context/AuthContext'

function SiteStats({ url }) {

  const [resultAvailable, setResultAvailable] = useState(false);
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);

  const { token } = useContext(AuthContext);

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_LOCAL_IP}/page_seo`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        domain : url
      })
    })
    .then(response => response.json())
    .then(response => {
      setData(response.result);
      setResultAvailable(true);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
    })
  },[])
  return (
    <div>

      {
        loading && <div className='flex justify-center mt-5'>
          <ReactLoading type={"spin"} color={"#805ad5"} height={'5%'} width={'5%'} />
        </div>
      }

      {
        !loading && !resultAvailable && <Card className="mb-5">
          <CardBody>
            <div className='text-center text-red-500'>
              We do not have site metrics for this domain at the moment. Check with us later.
            </div>
          </CardBody>
        </Card>
        
      }

    { !loading && resultAvailable &&
      
      <Card className="mb-5">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Technical Stats</p>
        
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Page Load Speed" value={`${data.load_speed} s`}>
          <RoundIcon
            icon={BackLinkIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Page Content Size" value={`${data.content_size} Kbs`}>
          <RoundIcon
            icon={RankIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Internal Links Count" value={data.internal_links_count}>
          <RoundIcon
            icon={DomainIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="External Links Count" value={data.external_links_count}>
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
  }
    </div>
  )
}

export default SiteStats
