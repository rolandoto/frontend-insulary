
import { CiCalendar } from "react-icons/ci";

export default  function RevenueChart() {

   const revenue = [
        {
            "month": "Jan",
            "revenue": 2000
        },
        {
            "month": "Feb",
            "revenue": 1800
        },
        {
            "month": "Apr",
            "revenue": 2500
        },
        {
            "month": "Mar",
            "revenue": 2200
        },
        {
            "month": "Nov",
            "revenue": 3000
        },
        {
            "month": "Dec",
            "revenue": 4800
        },
        {
            "month": "Jun",
            "revenue": 3200
        }
    ]

  const chartHeight = 350;
 
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
    }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`lusitana mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      {/* NOTE: Uncomment this code in Chapter 7 */}

     <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>
          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CiCalendar className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div> 
    </div>
  );
}




const generateYAxis = (revenue) => {
    // Calculate what labels we need to display on the y-axis
    // based on highest record and in 1000s
    const yAxisLabels = [];
    const highestRecord = Math.max(...revenue.map((month) => month.revenue));
    const topLabel = Math.ceil(highestRecord / 1000) * 1000;
  
    for (let i = topLabel; i >= 0; i -= 1000) {
      yAxisLabels.push(`$${i / 1000}K`);
    }
  
    return { yAxisLabels, topLabel };
  };
