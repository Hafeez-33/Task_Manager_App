import useUserAuth from "../../hooks/useUserAuth";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/inputs/DashboardLayout";
import axios from "axios";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPath";
import moment from "moment";
import { addThousandsSeparstor } from "../../utils/helper";
import InfoCard from "../../components/Cards/InfoCard";

const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const gerDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:");
    }
  };

  useEffect(() => {
    getrDashboardData();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl">Good Morning! {user?.name}</h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-2">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparstor(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-primary"
          />

           <InfoCard
            label="Pending Tasks"
            value={addThousandsSeparstor(
              dashboardData?.charts?.taskDistribution?.Pending || 0
            )}
            color="bg-violet-500"
          />

           <InfoCard
            label="In Progress Tasks"
            value={addThousandsSeparstor(
              dashboardData?.charts?.taskDistribution?.InProgress || 0
            )}
            color="bg-cyan-500"
          />

           <InfoCard
            label="Completed Tasks"
            value={addThousandsSeparstor(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color="bg-lime-500"
          />

          
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
          <div>
            <div>
              <div>
                <h5>Recent Tasks</h5>

                <button>
                  See All <LuArrowRight className="tet-base0"/>
                </button>
              </div>

              <TaskListTable tableData={dashboardData?.recentTasks || []} />
            </div>
          </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
