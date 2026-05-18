import { useEffect, useState } from "react";
import axios from "axios";

function Scheduler() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:5000/jobs")

      .then((response) => {

        setJobs(response.data);

      })

      .catch((error) => {

        console.log(error);

      });

  }, []);

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg mb-10">

      <h2 className="text-2xl font-bold mb-4">
        Job Scheduler
      </h2>

      <table className="w-full">

        <thead>

          <tr className="bg-gray-200">

            <th>Job</th>
            <th>Priority</th>
            <th>Burst</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {jobs.map((job, index) => (

            <tr key={index} className="text-center border-b">

              <td>{job.name}</td>
              <td>{job.priority}</td>
              <td>{job.burst}</td>
              <td>{job.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Scheduler;