import React, { useState, useEffect } from 'react'

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
import SocialMediaStats from '../components/SocialMediaStats'
import KeywordsStats from '../components/KeywordsStats'
import CompetitorAnanlysis from '../components/CompetitorAnanlysis'
import SiteStats from '../components/SiteStats'

function Domains() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

  return (
    <>
      <PageTitle>Domain Analysis</PageTitle>

      <p className="text-gray-600 dark:text-gray-400 mb-5">
      Discover the realm of domain analysis through our concise guide. Gain valuable insights into the pivotal role domains play in shaping online visibility and strategy. Whether you're a newcomer or an industry expert, explore how analyzing domains can impact and refine your online presence. 
            </p>

      <div className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 mt-2">
        
        <div className="block lg:flex mt-2 gap-4 w-full">
          <div className='w-full lg:w-3/4'>
            <Label className="mt-4">
                <span>Enter Url</span>
            </Label>
            <Input className="mt-1" placeholder="https://muluumark.com" />
          </div>
          <div className='w-1/2 flex gap-4'>
            <div className='w-3/4 lg:w-1/4'>
                <Label className="mt-4">
                    <span>Select Industry</span>
                </Label>
              <Select className="mt-1">
                <option value={"Finance"}>Finance</option>
                <option value={"Health"}>Health</option>
                <option value={"Arts and Entertainment"}>Arts and Entertainment</option>
                <option value={"Books and Literature"}>Books and Literature</option>
                <option value={"Computers Electronics and Technology"}>Computers Electronics and Technology</option>
                <option value={"Food and Drink"}>Food and Drink</option>
                <option value={"Travel and Tourism"}>Travel and Tourism</option>
                <option value="Pets and Animals">Pets and Animals</option>
                <option value={"Sports"}>Sports</option>
                <option value={"Home and Garden"}>Home and Garden</option>
              </Select>
            </div>
            <div className="mt-1 w-1/4">
            <Label className="mt-4">
                <span>  .</span>
            </Label>
              <Button>
                Search
              </Button>
            </div>
          </div>
        
        </div>
      </div>
      
      

      <div className='block lg:flex gap-4 mb-5'>

        <div className='w-full lg:w-1/2 mb-5'>
            <SectionTitle>Keyword Stats</SectionTitle>
            
            <Card>
                <CardBody>
                <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Keyword Opportunity</p>
                <CTA text={"These are keywords that rank highly for a particular industry but have not been used on this site"} />
                <p className="text-gray-600 dark:text-gray-400">
                    Keyword 1
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                    Keyword 2
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                    Keyword 3
                </p>
                </CardBody>
            </Card>
        </div>

            <div className="w-full lg:w-1/2 mb-5">
                <CompetitorAnanlysis />
            </div>
        </div>

        <SiteStats />

      

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

export default Domains
