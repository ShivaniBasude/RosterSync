function Logs() {

  const logs = [

    "Time 0 : Backup Started",

    "Time 2 : VideoStream Arrived",

    "Context Switch: Backup → VideoStream"

  ];

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold mb-4">
        Context Switch Logs
      </h2>

      {logs.map((log, index) => (

        <div key={index} className="mb-2">

          {log}

        </div>

      ))}

    </div>
  );
}

export default Logs;