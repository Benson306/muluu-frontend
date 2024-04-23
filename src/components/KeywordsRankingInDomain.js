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
        .then(response => {
            if(response.ok){
                response.json().then(res => {
                    setKeywords(res.result.keywords);
                    setLoading(false);
                })
            }else{
                setError(true);
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
            <p className="mb-5 font-semibold text-gray-600 dark:text-gray-300">Keywords that website ({url}) ranks for</p>
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
                !loading && !error && keywords.length < 1 && <div className='text-red-500 text-sm ml-2'>No keywords ranking for this domain</div>
            }
        { !loading && !error && keywords.length > 0 && <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell></TableCell>
              <TableCell>Search Volume</TableCell>
              <TableCell>Keyword Difficulty</TableCell>
              <TableCell>Competition</TableCell>
              <TableCell>Competition Level</TableCell>
              <TableCell>CPC</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
                !loading && !error && keywords.length > 0 && keywords.slice(0,11).map( keyword => (
                    <TableRow>
                        <TableCell>
                            <span className="text-sm">{keyword.keyword}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{keyword.search_volume}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{keyword.keyword_difficulty}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{keyword.competition}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{keyword.competition_level}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{keyword.cpc}</span>
                        </TableCell>
                    </TableRow>
                ))
            }
              
          </TableBody>
        </Table>
      </TableContainer> }
        </CardBody>
    </Card>
    </div>
  )
}

export default KeywordsRankingInDomain
