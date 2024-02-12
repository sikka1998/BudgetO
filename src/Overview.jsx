import { React, useState, useEffect } from 'react'
import axios from "axios"
import './Overview.css'
import MonthlyChart from './MonthlyChart.jsx';
import Card from './Card.jsx';

const Overview = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const [basicDetails, setBasicDetails] = useState([]);
  useEffect( ()=> {
    const fetch = async () =>{
      try {
      const response1 = await axios.get("http://localhost:5000/getOverviewDetails");
      console.log(response1.data);
      setMonthlyData(response1.data);

      const response2 = await axios.get("http://localhost:5000/getBasicAccountDetails");
      console.log(response2.data);
      setBasicDetails(response2.data);

      if(response1.status === 200){
        console.log("Overall Details fetched successfully");
      }
      else{
          console.log("Overall Details failed to fetch");
      }
        
      } catch (error) {
        console.log("Error while fetching data", error.message);
      }
    }
    fetch();
  }, []);

  return (
    <div>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Account Summary</h1>
      <div className='flex flex-row p-4'>
      {basicDetails.map((basic, index) => {
        return (
        <Card key={index} title={basic.title} value={basic.value} />
      )})}
      </div>
    </div>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Monthly Income and Expense</h1>
      <MonthlyChart data={monthlyData} />
    </div>
    </div>
  )
}

export default Overview;
