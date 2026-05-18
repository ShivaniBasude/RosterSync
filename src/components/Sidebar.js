import { FaServer, FaTasks, FaBug } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-5">

      <h1 className="text-3xl font-bold mb-10">
        RosterSync
      </h1>

      <ul className="space-y-6">

        <li className="flex items-center gap-3">
          <FaServer />
          Dashboard
        </li>

        <li className="flex items-center gap-3">
          <FaTasks />
          Scheduler
        </li>

        <li className="flex items-center gap-3">
          <FaBug />
          Cycle Detection
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;