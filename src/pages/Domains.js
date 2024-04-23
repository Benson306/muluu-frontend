import React, { useState, useEffect, useContext } from 'react'
import ReactLoading from 'react-loading';
import PageTitle from '../components/Typography/PageTitle'
import {
  Input, Label, Select, Button, Card, CardBody
} from '@windmill/react-ui'
import SectionTitle from '../components/Typography/SectionTitle'
import CompetitorAnanlysis from '../components/CompetitorAnanlysis'
import SiteStats from '../components/SiteStats'
import BeforeDomainResults from './BeforeDomainResults';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backlinks from '../components/Backlinks';
import KeywordsRankingInDomain from '../components/KeywordsRankingInDomain';
import { AuthContext } from '../context/AuthContext';
import KeywordOpportunity from '../components/KeywordOpportunity';
import WebsiteTraffic from './WebsiteTraffic';
import CompetitorRanking from './CompetitorsRanking';

function Domains() {

  const [resultAvailable, setResultAvailable] = useState(false);

  const [url, setUrl] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [keywordOpportunity, setKeywordOpportunity] = useState(null);

  const { token } = useContext(AuthContext);

  const handleSubmit = () => {
    setResultAvailable(false);
    if(url == null || industry == null){
        toast.error('Fill all required Fields: Url & Select industry', {
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

    setResultAvailable(true);

    // setLoading(true);
    // fetch(`${process.env.REACT_APP_API_URL}/keyword_opportunity`,{
    //   method:'POST',
    //   headers:{
    //     'Content-Type':'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify({
    //     url,
    //     industry
    //   })
    // })
    // .then(response => response.json())
    // .then(response => {
    //   setKeywordOpportunity(response);
    //   setLoading(false);
    //   setResultAvailable(true);
    // })
    // .catch(err => {
    //   console.log(err);
    //   setError(true);
    //   setLoading(false);
    //   setResultAvailable(true);
    // })

    
  }

  return (
    <>
    <ToastContainer />
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
            <Input className="mt-1" onChange={e => setUrl(e.target.value)} placeholder="https://muluumark.com" />
          </div>
          <div className='w-1/2 flex gap-4'>
            <div className='w-3/4 lg:w-1/4'>
                <Label className="mt-4">
                    <span>Select Industry</span>
                </Label>
              <Select className="mt-1" onChange={e => setIndustry(e.target.value)}>
              <option value={null}></option>
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
    
    !loading && resultAvailable &&
    
    <div>
      <SiteStats url={url} />
      <div className='block lg:flex gap-4 mb-5'>
        <div className='w-full lg:w-1/2 mb-5'>
            {/* <KeywordOpportunity url={url} error={error} keywordOpportunity={keywordOpportunity} /> */}
            <CompetitorRanking url={url} />
        </div>

        <div className="w-full lg:w-1/2 mb-5">
              <Backlinks url={url} />
        </div>
      </div>

      <div className='mb-5'>
        <KeywordsRankingInDomain url={url} />
        <WebsiteTraffic url={url} />
        <CompetitorAnanlysis url={url} />
      </div>

    </div> }
    {
      !loading && !resultAvailable && <BeforeDomainResults />
    }
      
    </>
  )
}

export default Domains
