import React, { useEffect, useState } from 'react'
import {
    Input, HelperText, Label, Select, Textarea, Button, Card, CardBody
  } from '@windmill/react-ui'
  import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableContainer,
  } from '@windmill/react-ui'
import SectionTitle from '../components/Typography/SectionTitle'
import { Link } from 'react-router-dom'
import InfoCard from './Cards/InfoCard'
import {
    doughnutOptions,
    lineOptions,
    barOptions,
    doughnutLegends,
    lineLegends,
    barLegends,
  } from '../utils/demo/chartsData'
  import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'

function KeywordsStats({ keyword, domain, data, topLinks, topRelatedKeywords }) {

    const [socails, setSocials] = useState(null);
    const [longtail, setLongtail] = useState([]);
    const [serpData, setSerpData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [type, setType]= useState(null);
    const [showSerpData, setShowSerpData] = useState(false);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/user/longtail`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                keyword
            })
        })
        .then(response => 
            {
                if(response.ok){
                    return response.json();
                }else{
                    return null;
                }
            })
        .then(response => {
            let RespType = Array.isArray(response);
            if(RespType){
                setType("array");
                setLongtail(response)
            }else{
                setType("string")
            }

            if(domain !== null){
                fetch(`${process.env.REACT_APP_API_URL}/user/serp-search`,{
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        domain,
                        keyword
                    })
                })
                .then((newResponse)=> newResponse.json())
                .then((newResponse)=>{
                    setLoading(false);
                    setSerpData(newResponse.result.organic);
                    setShowSerpData(true);
                })
                .catch(err =>{ console.log(err) })
            }
            setLoading(false);
        })
        .catch(err => {
          console.log(err);
      })
    },[])

    let uniqueObject = {};
    let uniqueTopLinks = topLinks && topLinks.length > 0  ? topLinks.filter((obj) => {
    return uniqueObject.hasOwnProperty(obj.title)
        ? false
        : (uniqueObject[obj.title] = true);
    }) :
    null

  return (
    <div>
        <div className='block lg:flex gap-5'>
            <div className='w-full lg:w-1/2'>
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
                    <InfoCard title="Keyword Volume" value={567}></InfoCard>
                    <InfoCard title="Keyword Difficulty" value={12}></InfoCard>
                </div>

                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
                    <InfoCard title="Global Volume" value={1246}></InfoCard>
                    <InfoCard title="CPC" value={1246}></InfoCard>
                </div>
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
                    <InfoCard title="Competition" value={1246}></InfoCard>
                </div>
            </div>
            <div className='w-5/6'>
                <ChartCard title="Line Bar">
                    <Line {...lineOptions} />
                    <ChartLegend legends={lineLegends} />
                </ChartCard>
            </div>
        </div>

      <SectionTitle>Keyword Stats</SectionTitle>

      <Card className="mb-5 w-full">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Related Keywords Data</p>
        <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell></TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Global Volume</TableCell>
              <TableCell>Competition</TableCell>
              <TableCell>CPC</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
              <TableRow>
                <TableCell>
                    <span className="text-sm">Keyword 1</span>
                </TableCell>
                <TableCell>
                    <span className="text-sm">432</span>
                </TableCell>
                <TableCell>
                    <span className="text-sm">432</span>
                </TableCell>
                <TableCell>
                    <span className="text-sm">432</span>
                </TableCell>
                <TableCell>
                    <span className="text-sm">432</span>
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
        </CardBody>
    </Card>

    <div className='block lg:flex gap-4 mb-5'>
    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Related Searches</p>
        { data.relatedSearches ? data.relatedSearches.map( (rs, index) => (
            <p key={index} className="text-sm text-gray-600 dark:text-gray-400">{rs.query}</p>
        ))
        :
        <p className='text-red-500 text-sm'>No related Searches</p>
        } 
        </CardBody>
    </Card>


    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Top Google Related Searches</p>
        { topRelatedKeywords && topRelatedKeywords.length > 0 ? topRelatedKeywords.slice(0,8).map( (rs, index) => (
            <p key={index} className="text-sm text-gray-600 dark:text-gray-400">{rs}</p>
        ))
        :
        <p className='text-red-500 text-sm'>No Top google Related Searches</p>
        } 
        </CardBody>
    </Card>
    </div>

    <div className='block lg:flex gap-4 mb-5'>
    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Organic Search</p>
        { data.organic && data.organic.length > 0 ? data.organic.slice(0,3).map( (rs, index) => (
            <div key={index} className='border border-gray-300 p-2 mb-1'>
                <Link key={index} to={rs.link} target='_blank' className='text-sm text-blue-500 hover:underline'>{rs.title}</Link>
                <div className='text-sm text-gray-600 dark:text-gray-400'>{rs.snippet}</div>
            </div>
        )):
        
        <p className='text-red-500 text-sm'>No Organic Search Results</p>
        } 
        </CardBody>
    </Card>

    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Top Links</p>
        { uniqueTopLinks && uniqueTopLinks.length > 0 ? uniqueTopLinks.map( (rs, index) => (
            <div key={index}>
                <Link key={index} to={rs.link} target='_blank' className='text-sm text-blue-500 hover:underline'>{rs.title}</Link>
            </div>
        )):
        
        <p className='text-red-500 text-sm'>No Top Link Results</p>} 
        </CardBody>
    </Card>
    </div>

    <div className='block lg:flex gap-4 mb-5'>
    
    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Long tail Keywords</p>
        {
            !loading && type === "string" ? 
            ( <p className="text-red-500 text-sm">{`No longtail keywords assocated with ${keyword}`}</p> )
            :
            longtail.map( (rs, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-400 text-sm">- {rs}</p>
            ))
        }
        </CardBody>
    </Card>

    { showSerpData && 
    <Card className="mb-5 w-full lg:w-1/2">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">SERP Position</p>
        { 
            serpData && serpData.length > 0 ? serpData.map( (rs, index) => (
                <div key={index} className='border border-gray-300 p-2 mb-1'>
                    <Link key={index} to={rs.link} target='_blank' className='text-sm text-blue-500 hover:underline'>{rs.title}</Link>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>{rs.snippet}</div>
                    <div className='text-xs bg-purple-600 text-white p-1 rounded-lg px-2 mt-1 w-1/6'>Position: {rs.position}</div>
                </div>
            )):
            
            <p className='text-red-500 text-sm'>No SERP Results for this keyword</p>
        }
        </CardBody>
    </Card> }

    
    </div>
    </div>
  )
}

export default KeywordsStats
