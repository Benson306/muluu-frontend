import React, { useState, useEffect } from 'react'
import ReactLoading from 'react-loading';

import CTA from '../components/CTA'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Input, HelperText, Label, Select, Textarea, Button, Card, CardBody
} from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData'
import SectionTitle from '../components/Typography/SectionTitle'
import KeywordsStats from '../components/KeywordsStats'
import BeforeKeywordResult from './BeforeKeywordResult'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TikTokSocial from '../components/TikTokSocial';
import InstagramSocial from '../components/InstagramSocial';
import TwitterSocial from '../components/TwitterSocial';
import LinkedInSocial from '../components/LinkedInSocial';

function Keywords() {
  // const [page, setPage] = useState(1)
  // const [data, setData] = useState([])

  // // pagination setup
  // const resultsPerPage = 10
  // const totalResults = response.length

  // // pagination change control
  // function onPageChange(p) {
  //   setPage(p)
  // }

  const [resultAvailable, setResultAvailable] = useState(false);

  const [keyword, setKeyword] = useState(null);
  const [country, setCountry] = useState('kenya');
  const [domain, setDomain] = useState(null);
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);

  const handleSubmit = () => {
    if(keyword == null){
      toast.error('Keyword is required', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      return;
    }

    // if(domain == null){
    //   toast.error('Domain is required', {
    //     position: "top-right",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //     });
    //   return;
    // }

    if(country == null){
      toast.error('Select A Country', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      return;
    }

    setLoading(true);

    let countryAbbreaviation = 'ke';

    country == 'kenya' ? countryAbbreaviation = 'ke' 
    : 
    country == 'uganda' ? countryAbbreaviation ='ug' 
    : 
    country == 'tanzania' ? countryAbbreaviation = 'tz'
    :
    country == 'ethiopia' ? countryAbbreaviation = 'et'
    :
    countryAbbreaviation = 'ke'

    fetch(`${process.env.REACT_APP_API_URL}/user/keywords`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        keyword,
        country: countryAbbreaviation
      })
    })
    .then(response => response.json())
    .then(response => {
      setData(response);
      setLoading(false);
      setResultAvailable(true);
    })
    .catch(err => {
      console.log(err);
    })

    

    // fetch(`${process.env.REACT_APP_API_URL}/keyword/${keyword}/${countryAbbreaviation}`)
    // .then(response => response.json())
    // .then(response => {
    //   console.log(response);
    //   setData(response);
    //   setLoading(false);
    //   setResultAvailable(true);
    // })
    // .catch(err => {
    //   console.log(err);
    // })    
  }

  const [showDomain, setShowDomain] = useState(false);

  const handleDomainToggle = () => {
    setShowDomain(!showDomain);
  }


  return (
    <>
    <ToastContainer />
      <PageTitle>Keyword Research</PageTitle>

      <p className="text-gray-600 dark:text-gray-400 mb-5">
      Explore the essence of keyword research with our comprehensive guide. Discover how strategic keyword analysis can elevate your online visibility and drive targeted traffic. 
      </p>

      <div className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 mt-2">
        
        <div className="block lg:flex items-center mt-2 gap-1 w-full">
          <div className='w-full lg:w-1/3'>
            <Label className="">
              <span>Enter a keyword</span>
            </Label>
            <Input className="mt-1" placeholder="Enter a keyword...." onChange={(e)=> setKeyword(e.target.value)} />
          </div>
          { showDomain ? 
              <div className='flex items-center gap-3 w-full lg:w-1/3 mt-1 lg:mt-0'>
                <div className='w-5/6'>
                <Label className="">
                  <span>Enter a domain</span>
                </Label>
                <Input className="mt-1" placeholder="Enter a domain...." onChange={(e)=> setDomain(e.target.value)} />
                </div>
                <button 
                className='mt-6 text-red-500 text-sm font-extrabold'
                onClick={e => {
                  e.preventDefault();
                  setDomain(null);
                  handleDomainToggle();
                }}
                >X</button>
              </div>
              :
              <div className='mt-2 lg:mt-6 lg:mx-4'>
                  <Button class="border border-purple-600 hover:bg-purple-600 hover:text-white p-2 text-xs rounded-lg dark:text-white" onClick={(e)=>{
                    e.preventDefault();
                    handleDomainToggle();
                  }}>
                    + Add Domain
                  </Button>
              </div>
          
          }
          <div className='w-full lg:w-1/3 flex items-center gap-4 mt-1 lg:mt-0'>
            <div className='w-3/4 lg:w-1/2'>
              <Label className="">
                <span>Select a country</span>
              </Label>
              <Select className="mt-1" onChange={(e)=> setCountry(e.target.value)}>
                <option value="kenya">Kenya</option>
                <option value="uganda">Uganda</option>
                <option value="tanzania">Tanzania</option>
                <option valu="ethiopia">Ethiopia</option>
              </Select>
            </div>
            <div className='mt-6 w-1/4 lg:w-1/4'>
              <Button onClick={(e)=>{
                e.preventDefault();
                handleSubmit();
              }}>
                Search
              </Button>
            </div>
          </div>
        
        </div>
      </div>

      {
        loading && <div className='flex justify-center mt-5'>
          <ReactLoading type={"spin"} color={"#805ad5"} height={'5%'} width={'5%'} />
        </div>
      }

      {
        !loading && resultAvailable ? 

        <div>
          <KeywordsStats keyword={keyword} domain={domain} data={data.searchResult.result || null } topLinks={data.topLinks || null} topRelatedKeywords={ data.topRelatedKeywords ? [...new Set(data.topRelatedKeywords)] : null}/>
          
          <SectionTitle>Social Media Stats</SectionTitle>

          <TikTokSocial keyword={keyword} />

          <InstagramSocial keyword={keyword} />

          <TwitterSocial keyword={keyword} />

          <LinkedInSocial keyword={keyword} />
        </div>

        :

        !loading && <BeforeKeywordResult />

      }
      
      

      {/* <CTA /> */}

      {/* <!-- Cards --> */}
      {/* <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total clients" value="6389">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Account balance" value="$ 46,760.89">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="New sales" value="376">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending contacts" value="35">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {user.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

      <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div> */}
    </>
  )
}

export default Keywords
