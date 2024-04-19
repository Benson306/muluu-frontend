import React, { useContext, useEffect, useState } from 'react'
import {
    Card, CardBody
  } from '@windmill/react-ui'
import SectionTitle from '../components/Typography/SectionTitle'
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { AuthContext } from '../context/AuthContext';

function Backlinks({ url }) {
    const [backlinks, setBacklinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    const { token } = useContext(AuthContext);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_LOCAL_IP}/backlinks`,{
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
            setBacklinks(data.result.backlinks);
            setLoading(false);
            
        })
        .catch(err =>{
            setError(true);
            setLoading(false);
            console.log(err)
        })
    },[])
  return (
    <div>
    <Card className="mb-2">
        <CardBody>
        <p className="mb-5 font-semibold text-gray-600 dark:text-gray-300">Backlinks</p>
        {
            loading && 
            <div className='flex justify-center mt-5'>
                <ReactLoading type={"spin"} color={"#805ad5"} height={'5%'} width={'5%'} />
            </div>
        }
        {
            !loading && !error && backlinks
            .filter((backlink, index, array) => 
                array.findIndex(item => item.title === backlink.title) === index)
            .slice(0,11)
            .map( (backlink, index) => (
                // <p className="text-gray-600 dark:text-gray-400">{ backlink.url_from }</p>
                <div key={index} className='border border-gray-300 p-2 mb-1'>
                    <Link key={index} to={backlink.url_from} target='_blank' className='text-sm text-blue-500 hover:underline'>{backlink.title}</Link>
                </div>
            )) 
        }
        {
            !loading && error && <div className='text-red-500 text-sm ml-2'>This data is unavailable at the moment. Try again later</div>
        }
        </CardBody>
    </Card>

    </div>
  )
}

export default Backlinks
