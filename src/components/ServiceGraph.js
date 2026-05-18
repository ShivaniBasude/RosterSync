import { useEffect, useState } from "react";
import axios from "axios";

function ServiceGraph() {

  const [services, setServices] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:5000/graph")

      .then((response) => {

        setServices(response.data);

      })

      .catch((error) => {

        console.log(error);

      });

  }, []);

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg mb-10">

      <h2 className="text-2xl font-bold mb-6">

        Service Dependency Graph

      </h2>

      <div className="space-y-4">

        {services.map((service, index) => (

          <div
            key={index}
            className="flex items-center gap-4"
          >

            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg">

              {service.source}

            </div>

            <div className="text-2xl">

              →

            </div>

            <div className="bg-green-500 text-white px-4 py-2 rounded-lg">

              {service.target}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ServiceGraph;