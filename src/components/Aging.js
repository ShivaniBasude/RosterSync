function Aging() {

  const reports = [

    {
      job: "Backup",
      before: 48,
      after: 12
    }

  ];

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold mb-4">
        Aging Report
      </h2>

      {reports.map((r, index) => (

        <div key={index}>

          {r.job} :
          Before Aging = {r.before}
          ,
          After Aging = {r.after}

        </div>

      ))}

    </div>
  );
}

export default Aging;