import React from "react";
import {
  BarChart,
  Bar,
  YAxis,
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "react-responsive";

const data = [
  { name: "Admin 1", clients: 30 },
  { name: "Admin 2", clients: 20 },
  { name: "Admin 3", clients: 50 },
  { name: "Admin 4", clients: 10 },
  { name: "Admin 5", clients: 25 },
  { name: "Admin 6", clients: 40 },
  { name: "Admin 7", clients: 10 },
  { name: "Admin 8", clients: 35 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primary-dark text-white p-2 rounded shadow-lg">
        <p className="font-bold">{`Admin: ${payload[0].payload.name}`}</p>
        <p>{`Clients: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const AdminClientChart = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });

  return (
    <div className="w-full p-4 bg-primary-light overflow-x-auto">
      <h3 className="text-xl font-bold text-white mb-2">
        Clients Managed by Admins
      </h3>
      <div className="min-w-[600px] h-[350px] sm:h-[250px] md:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: isSmallScreen ? 10 : 30,
              left: isSmallScreen ? 10 : 20,
              bottom: 50, // Increased bottom margin
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              stroke="#FFFFFF"
              tick={{ fontSize: isSmallScreen ? 10 : 12 }}
              angle={-45}
              textAnchor="end"
              dy={10} // Adjust vertical offset if needed
            />
            <YAxis stroke="#FFFFFF" />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="clients"
              fill="#1A2834"
              activeFill="#1A2834"
              activeOpacity={1}
              stroke="#0099ff"
              strokeWidth={1}
              barSize={isSmallScreen ? 20 : 30}
              isAnimationActive={false}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminClientChart;
