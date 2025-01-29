// import AuthUser from '../AuthUser';

import AuthUser from "../../components/AuthUser";

const DashboardHeader = () => {
  return (
      <header className="flex justify-between items-center h-[70px] bg-gray-400">
          <p>logo</p>
          <AuthUser />
      </header>
  );
}

export default DashboardHeader