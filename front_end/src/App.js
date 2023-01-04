import react, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import axios from "axios"
import { CSVLink} from 'react-csv'


function App() {
  const [candidates, setCandidates] = useState([])

  const fetchCandidates = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/candidates")
      setCandidates([...res.data])
      
    } catch (error) {
      console.log(error)   
    }
    
  }

  useEffect(() => {
    fetchCandidates()
  }, [])


  const headers = [
    {
      label: "Candidate_id", key: "candidate_id" 
    },
    {
      label: "First_name", key: "first_name" 
    },
    {
      label: "Last_name", key: "last_name" 
    },
    {
      label: "Email", key: "email" 
    },
    {
      label: "Job_application_id", key: "job_application_id" 
    },
    {
      label: "Job_application_created_at", key: "job_application_created_at" 
    },
  ]

  const csvLink = {
    filename: "Candidates",
    headers: headers,
    data: candidates
    
  }


  console.log(candidates)

  return (
    <div className="App">
      <header className='container-fluid bg-dark text-white p-2'>
        <h4>Candicates CSV file</h4>
      </header>
      
      <div>
        <button className='btn btn-warning text-white my-5'><CSVLink {...csvLink}>Download CSV</CSVLink></button>
        
      </div>
    </div>
  );
}

export default App;
