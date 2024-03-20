import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import ReactLoading from 'react-loading';
import {
    Card, CardBody, Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableContainer,
  } from '@windmill/react-ui'
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
  import SectionTitle from '../components/Typography/SectionTitle'

function RelatedKeywordsData({ keyword, country}) {
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_LOCAL_IP}/keyword_volume`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify({
                keyword,
                country
            })
        })
        .then(response => response.json())
        .then(response =>{
            setData(response.keywords);
            setLoading(false);
        })
        .catch(err =>{
            setError(true);
            setLoading(false);
        })
    },[])
  return (
    <div>
        {
            loading && <div className='flex justify-center mt-5'>
            <ReactLoading type={"spin"} color={"#805ad5"} height={'3%'} width={'5%'} />
          </div>
        }
        { !loading && data.length > 0 &&
        <div className='block lg:flex gap-5'>
            <div className='w-full lg:w-1/2'>
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
                    <InfoCard title="Keyword Volume" value={data[0].search_volume}></InfoCard>
                    <InfoCard title="Keyword Difficulty" value={data[0].keyword_difficulty}></InfoCard>
                </div>

                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
                    <InfoCard title="CPC" value={data[0].cpc}></InfoCard>
                    <InfoCard title="Competition" value={data[0].competition}></InfoCard>
                </div>
            </div>
            <div className='w-5/6'>
                <ChartCard title="Line Bar">
                    <Line {...lineOptions} />
                    <ChartLegend legends={lineLegends} />
                </ChartCard>
            </div>
        </div>
        }

        <SectionTitle>Keyword Stats</SectionTitle>

        <Card className="mb-5 w-full">
        <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Related Keywords Data</p>
        {
            !loading && error && <p className='text-red-500 text-sm'>Failed to fetch related keywords data</p> 
        }
        {
            loading && <div className='flex justify-center mt-5'>
            <ReactLoading type={"spin"} color={"#805ad5"} height={'3%'} width={'5%'} />
            </div>
        }
        {
            !loading &&
        
        <TableContainer className="mb-8">
        <Table>
            <TableHeader>
                <tr>
                <TableCell></TableCell>
                <TableCell>Volume</TableCell>
                <TableCell>Keyword Difficulty</TableCell>
                <TableCell>Competition</TableCell>
                <TableCell>CPC</TableCell>
                </tr>
            </TableHeader>
            <TableBody>
                { data.length > 0 && data.slice(1, 6).map( data => (<TableRow>
                    <TableCell>
                        <span className="text-sm">{data.keyword}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{data.search_volume}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{data.keyword_difficulty}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{data.competition}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{data.cpc}</span>
                    </TableCell>
                </TableRow> ))
            }
            </TableBody>
            </Table>
        </TableContainer>
        }
        </CardBody>
    </Card>
    </div>
  )
}

export default RelatedKeywordsData