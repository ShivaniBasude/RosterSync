import DashboardCards from "../components/DashboardCards";
import ServiceGraph from "../components/ServiceGraph";
import Scheduler from "../components/Scheduler";
import Logs from "../components/Logs";
import Aging from "../components/Aging";
import BootSequence from "../components/BootSequence";
import Charts from "../components/Charts";

function Dashboard() {

  return (

    <div className="flex-1 p-6 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-6">
        Roster Sync
      </h1>

      <DashboardCards />

      <ServiceGraph />

      <BootSequence />

      <Charts />

      <Scheduler />

      <Aging />

      <Logs />

    </div>
  );
}

export default Dashboard;