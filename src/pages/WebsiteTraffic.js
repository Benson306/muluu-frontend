import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import ReactLoading from 'react-loading';
import PageTitle from '../components/Typography/PageTitle'
import {
  Input, Label, Select, Button, Card, CardBody
} from '@windmill/react-ui'
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableContainer,
} from '@windmill/react-ui'
import SectionTitle from '../components/Typography/SectionTitle';

function WebsiteTraffic({ url }) {
    const { token } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [traffic, setTraffic] = useState(null);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_LOCAL_IP}/website_traffic`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              domain: url
            })
        })
        .then(response =>{
            if(response.ok){
                response.json().then(res => {
                    setTraffic(res.result);
                    setLoading(false);
                })
            }else{
                setError(true);
                setLoading(false);
            }
        })
        .catch(err => {
            console.log(err);
            setError(true);
            setLoading(false);
          })
    },[])

    const setMonth = (number) => {
        switch (number){
            case 1: 
                return 'January';
            case 2:
                return 'February';
            case 3:
                return 'March';
            case 4:
                return 'April';
            case 5:
                return 'May';
            case 6:
                return 'June';
            case 7:
                return 'July';
            case 8:
                return 'August';
            case 9:
                return 'September';
            case 10:
                return 'October';
            case 11:
                return 'November';
            case 12:
                return 'December';
        }
    }

  return (
    <div>
        <SectionTitle>Website traffic</SectionTitle>
        <div className='block lg:flex gap-4 mb-2'>
        <div className="mb-5 w-full lg:w-1/2">
            <Card className="mb-5 w-full p-2">
                <div className='pl-2 pt-2'>
                    <p className="mb-5 font-semibold text-gray-600 dark:text-gray-300">Historical traffic</p>
                </div>
            {
                loading && 
                <div className='flex justify-center mt-5'>
                    <ReactLoading type={"spin"} color={"#805ad5"} height={'5%'} width={'5%'} />
                </div>
            }
            {
                !loading && error && <div className='text-red-500 text-sm ml-2'>This data is unavailable at the moment. Try again later</div>
            }
            {
                !loading && !error && 
                <CardBody>
                    <TableContainer className="mb-8">
                        <Table>
                            <TableHeader>
                                <tr>
                                <TableCell>Timeline</TableCell>
                                <TableCell>Estimated Search Volume</TableCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {
                                    !loading && !error && traffic.organic.length > 0 && traffic.organic.map( element => (
                                        <TableRow>
                                            <TableCell>
                                                <span className="text-sm">{setMonth(element.month)}, {element.year}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm">{element.search_volume}</span>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardBody>
            }
            </Card>
        </div>
        <div className="mb-5 w-full lg:w-1/2">
            <Card className="mb-5 w-full p-2">
                <div className='pl-2 pt-2'>
                <p className="mb-5 font-semibold text-gray-600 dark:text-gray-300">Local traffic</p>
                </div>
            {
                loading && 
                <div className='flex justify-center mt-5'>
                    <ReactLoading type={"spin"} color={"#805ad5"} height={'5%'} width={'5%'} />
                </div>
            }
            { !loading && !error && 
                <CardBody>
                     <TableContainer className="mb-8">
                        <Table>
                            <TableHeader>
                                <tr>
                                <TableCell>Timeline</TableCell>
                                <TableCell>Estimated Search Volume</TableCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {
                                    !loading && !error && traffic.local.length > 0 && traffic.local.map( element => (
                                        <TableRow>
                                            <TableCell>
                                                <span className="text-sm">{setMonth(element.month)}, {element.year}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm">{element.search_volume}</span>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardBody>
            }
            {
                !loading && error && <div className='text-red-500 text-sm ml-2'>This data is unavailable at the moment. Try again later</div>
            }
            </Card>
        </div>
      </div>
    </div>
  )
}

export default WebsiteTraffic