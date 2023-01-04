import axios from "axios"

export const candidates = async (req, res, next) =>{


    const requestOptions = {
        headers: {
            'Authorization': `Token token=${process.env.API_TOKEN}`, 
            'X-Api-Version': 20210218,
        } 
    }
    const authAxios = axios.create({
        baseURL:"https://api.teamtailor.com/v1/candidates",

        headers: {
            'Authorization': `Token token=${process.env.API_TOKEN}`, 
            'X-Api-Version': 20210218,
        }
       
       
    })

    try {
        const resp = await authAxios.get()   
   
        const {data} = resp.data
        

        const filter_candidate = data.map( candi => 
            {const {id, attributes: {['first-name']: first_name,['last-name']: last_name, email}, 
            relationships: {['job-applications']: job_applications} } = candi
            let filteredData = {}

             return  filteredData = {
             candidate_id: id,
             first_name: first_name,
             last_name: last_name,
             email,
            //  RELATED URL, USED TO FETCH job_application_id and job_application_created_at
             job_application: job_applications.links.related
                                
            }
         } 
             )


             // FILTERING job_application_id and job_application_created_at TO FETCH
             const filter_job = [...filter_candidate].map(item => item.job_application)

             // FILTERING job application information...
            const jobId = await Promise.all(filter_job.map(async job => {

                    try {
                    const rree = await axios.get(job,  requestOptions)
                    const filterJodData = rree.data.data.map(jobs => {
                        const {id, attributes: {['created-at']: created_at}} = jobs

                        let Export_jobs = {}

                        return Export_jobs = {
                            job_application_id: id,
                            job_application_created_at: created_at
                        }
                    })
                    return {...filterJodData}
                    
                } catch (error) {
                    
                } 
            })) 

            
            const candidate_array = [...filter_candidate]
            const jobs_array = [...jobId]
            let Duplication_checker = []


            const candidates_list = candidate_array.map((f, i) => !Duplication_checker.includes(f) ? Object.assign({}, f, jobs_array[i]) : "")

            // ORDERING DATA TO DISPLAY ON FRONTENT
           const organized_data = candidates_list.map((candi) => {
            const {candidate_id, first_name, last_name, email, 0: {job_application_id, job_application_created_at} } = candi
            return {
                candidate_id,
                first_name,
                last_name,
                email,
                job_application_id,
                job_application_created_at

            }
           })
       
        
             res.status(200).json([...organized_data])
         
        
    } catch (error) {
        console.log(error)
    }

}   

