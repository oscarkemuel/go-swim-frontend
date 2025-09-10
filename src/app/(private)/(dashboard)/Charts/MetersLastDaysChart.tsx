"use client"

import { useDashboard } from "@/hooks/useDashboard";
import { formatDate } from "@/utils";
import Skeleton from "react-loading-skeleton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Label } from "recharts";

export default function MetersLastDaysChart() {
  const { metersLastTrainings } = useDashboard();

  if(metersLastTrainings.isLoading || metersLastTrainings.isFetching) {
    return (
      <Skeleton height={320} width="100%" />
    )
  }

  const data = metersLastTrainings.data?.metersByDate || [];

  const formatedData = data.map(item => ({
    ...item,
    date: formatDate(item.date),
  }));

  return (
    <div className="w-full h-80 pt-2 pb-10 px-4 bg-white rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-4">Evolução dos últimos treinos</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatedData} onClick={() => {}}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }}>
            <Label value="Metros" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey="totalMeters" stroke="#3A36DB" strokeWidth={2} name="Metros" />
          <Legend align="right" verticalAlign="top" wrapperStyle={{
            top: -20
          }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
