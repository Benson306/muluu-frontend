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

function CompetitorRanking({ url }) {
    const { token } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [traffic, setTraffic] = useState(null);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_LOCAL_IP}/competitors_ranking`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              domain: url
            })
          })
          .then(response => response.json())
          .then(response => {
            setTraffic(response.result.domain_statistics);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setError(true);
            setLoading(false);
          })
    },[])

  return (
            <Card className="mb-5 w-full p-2">
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
                    <p className="mb-5 font-semibold text-gray-600 dark:text-gray-300">Domain Statistics</p>
                    <TableContainer className="mb-8">
                        <Table>
                            <TableHeader>
                                <tr>
                                <TableCell></TableCell>
                                <TableCell>Organic</TableCell>
                                <TableCell>Paid</TableCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <span className="text-sm">Keywords in position 1</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{traffic.organic.keywords_in_pos_1}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{traffic.paid.keywords_in_pos_1}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <span className="text-sm">Keywords in position 4 - 10</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{traffic.organic.keywords_in_pos_4_10}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{traffic.paid.keywords_in_pos_4_10}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <span className="text-sm">Keywords in position 11 - 20</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{traffic.organic.keywords_in_pos_11_20}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{traffic.paid.keywords_in_pos_11_20}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <span className="text-sm">Keywords in position 21 - 30</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{traffic.organic.keywords_in_pos_21_30}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{traffic.paid.keywords_in_pos_21_30}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <span className="text-sm">Keywords in position 31 - 40</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{traffic.organic.keywords_in_pos_31_40}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{traffic.paid.keywords_in_pos_31_40}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <span className="text-sm">Keywords in position 41 - 50</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{traffic.organic.keywords_in_pos_41_50}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{traffic.paid.keywords_in_pos_41_50}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <span className="text-sm">Estimated traffic volume</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{parseFloat(traffic.organic.Estimated_traffic_volume).toFixed(2)}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{parseFloat(traffic.paid.Estimated_traffic_volume).toFixed(2)}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <span className="text-sm">Total keywords count</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{traffic.organic.total_keywords_count}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{traffic.paid.total_keywords_count}</span>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardBody>
            }
            </Card>
  )
}

export default CompetitorRanking