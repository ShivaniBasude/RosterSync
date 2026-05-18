function DashboardCards() {

  const cards = [
    { title: "Total Services", value: 15 },
    { title: "Running Services", value: 12 },
    { title: "Failed Services", value: 1 },
    { title: "Active Jobs", value: 6 }
  ];

  return (

    <div className="grid grid-cols-4 gap-6 mb-10">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-gray-500">
            {card.title}
          </h2>

          <p className="text-3xl font-bold">
            {card.value}
          </p>

        </div>

      ))}

    </div>
  );
}

export default DashboardCards;