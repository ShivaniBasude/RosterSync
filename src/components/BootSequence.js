function BootSequence() {

  const bootOrder = [
    "DNS",
    "Proxy",
    "Firewall",
    "Authentication"
  ];

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold mb-4">
        Boot Sequence
      </h2>

      {bootOrder.map((service, index) => (

        <div
          key={index}
          className="p-3 border-b"
        >
          {index + 1}. {service}
        </div>

      ))}

    </div>
  );
}

export default BootSequence;