import React, { useContext, useEffect, useState } from 'react'
import {
    Card, CardBody
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
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { AuthContext } from '../context/AuthContext';

function KeywordsRankingInDomain({ url }) {
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { token } = useContext(AuthContext);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_LOCAL_IP}/keywords_ranking_in_domain`,{
            method:"POST",
            headers: {
                "Content-Type":"application/json",
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({
                domain: url
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data == "Failed"){
                setError(true);
                setLoading(false);
            }else{
                setKeywords(data.keywords);
                setLoading(false);
            }
        })
        .catch(err =>{
            setError(true);
            setLoading(false);
            console.log(err)
        })
    },[])
  return (
    <div>
        
        <Card className="mb-5 w-full">
        <CardBody>
            {
                loading && 
                <div className='flex justify-center mt-5'>
                    <ReactLoading type={"spin"} color={"#805ad5"} height={'5%'} width={'5%'} />
                </div>
            }
            {
                !loading && error && <div className='text-red-500 text-sm ml-2'>This data is unavailable at the moment. Try again later</div>
            }
        { !loading && !error && <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell></TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Estimated Traffic Volume</TableCell>
              <TableCell>Competition</TableCell>
              <TableCell>CPC</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
                !loading && !error && keywords.length > 0 && keywords.map( keyword => (
                    <TableRow>
                        <TableCell>
                            <span className="text-sm">{keyword.keyword}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{keyword.avg_search_volume}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{keyword.estimated_traffic_volume}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{keyword.competition_level}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{keyword.avg_cpc}</span>
                        </TableCell>
                    </TableRow>
                ))
            }
              
          </TableBody>
        </Table>
      </TableContainer> }
        </CardBody>
    </Card>
        {/* {
            !loading && backlinks.map( (backlink, index) => (
                // <p className="text-gray-600 dark:text-gray-400">{ backlink.url_from }</p>
                <div key={index} className='border border-gray-300 p-2 mb-1'>
                    <Link key={index} to={backlink.url_from} target='_blank' className='text-sm text-blue-500 hover:underline'>{backlink.title}</Link>
                </div>
            )) 
        } */}

    </div>
  )
}

export default KeywordsRankingInDomain
