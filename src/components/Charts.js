import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Charts() {

  const data = [

    {
      name: "Backup",
      waitTime: 48
    },

    {
      name: "VideoStream",
      waitTime: 10
    },

    {
      name: "Analytics",
      waitTime: 20
    },

    {
      name: "OSUpdate",
      waitTime: 15
    }

  ];

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg mb-10">

      <h2 className="text-2xl font-bold mb-4">
        Job Wait Time Chart
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="waitTime" fill="#2563EB" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
}

export default Charts;