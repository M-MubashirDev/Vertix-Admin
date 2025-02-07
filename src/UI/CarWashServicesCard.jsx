// import { FaCheckCircle } from "react-icons/fa"; // Reserved for future use
// import { FaArrowRight } from "react-icons/fa"; // Importing an arrow icon
// import { FaShieldAlt } from "react-icons/fa"; // Importing a shield icon
// import { useNavigate } from "react-router-dom";

// const CarWashServicesCard = ({ service }) => {
//   const navigate = useNavigate();
//   console.log(service, "😁😁");
//   function Click() {
//     if (!service) return;
//     navigate(`edit/${service._id}`);
//   }
//   return (
//     <div key={service._id} className="group h-[60vh]  relative  md:w-80">
//       <div className="relative h-[60vh]  overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-[1px] shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/25 ">
//         <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 to-blue-500 opacity-20"></div>

//         <div className="relative min-h-[60vh] flex flex-col  rounded-2xl bg-gradient-to-b from-primary-dark to-slate-900 p-6">
//           <div className="relative">
//             <h3 className="text-sm font-medium uppercase tracking-wider text-white">
//               {service.title}
//             </h3>
//             <div className="mt-2 flex items-baseline gap-2">
//               <span className="text-3xl font-bold text-white">
//                 ${service.price}
//               </span>
//             </div>
//             {/* <p className="mt-2 text-sm text-slate-400"></p> */}
//           </div>

//           {/* Placeholder for tick mark UI */}

//           <div className="flex items-start mt-2 gap-3">
//             <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
//               <FaCheckCircle className="h-4 w-4 text-cyan-500" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-white">Some feature</p>
//               <p className="text-xs text-slate-400">{service.description}</p>
//             </div>
//           </div>

//           <div className="relative   mt-auto">
//             <button
//               onClick={() => Click()}
//               className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-white to-primary-light p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]"
//             >
//               <div className="relative rounded-xl bg-slate-950/50 px-4 py-3 transition-colors group-hover/btn:bg-transparent">
//                 <span className="relative flex items-center justify-center gap-2">
//                   Edit Station & Service
//                   <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
//                 </span>
//               </div>
//             </button>
//           </div>

//           <div className="mt-4 flex items-center justify-center gap-2">
//             <FaShieldAlt className="h-4 w-4 text-slate-400" />
//             <span className="text-xs font-medium text-slate-400">
//               Your satisfaction is our promise.
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarWashServicesCard;
import {
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaTrashAlt,
} from "react-icons/fa"; // Importing necessary icons
import { useNavigate } from "react-router-dom";

const CarWashServicesCard = ({
  service,
  onDelete,
  isOpenStation,
  setSearchParams,
}) => {
  const navigate = useNavigate();

  function handleEdit() {
    if (!service) return;
    // navigate(`edit/${service._id}`);
    console.log(isOpenStation);
    navigate(`edit/${service._id}/?stationId=${isOpenStation}`);
  }

  function handleDelete() {
    if (onDelete) {
      onDelete({
        url: "delete-package",
        id: service._id,
      }); // Call the onDelete function with the service ID
    }
  }

  return (
    <div key={service._id} className="group h-[60vh] relative md:w-80">
      <div className="relative h-[60vh] overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-[1px] shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/25">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 to-blue-500 opacity-20"></div>

        <div className="relative min-h-[60vh] flex flex-col rounded-2xl bg-gradient-to-b from-primary-dark to-slate-900 p-6">
          <div className="relative flex justify-between items-center">
            <h3 className="text-sm font-medium uppercase tracking-wider text-white">
              {service.title}
            </h3>

            {/* Delete Icon */}
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 transition-transform duration-200"
              title="Delete Package"
            >
              <FaTrashAlt className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">
              ${service.price}
            </span>
          </div>

          <div className="flex items-start mt-2 gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
              <FaCheckCircle className="h-4 w-4 text-cyan-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Some feature</p>
              <p className="text-xs text-slate-400">{service.description}</p>
            </div>
          </div>

          <div className="relative mt-auto">
            <button
              onClick={handleEdit}
              className="group/btn r  elative w-full overflow-hidden rounded-xl bg-gradient-to-r from-white to-primary-light p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]"
            >
              <div className="relative text-sm sm:text-lg rounded-xl bg-slate-950/50 px-4 py-3 transition-colors group-hover/btn:bg-transparent">
                <span className="relative flex items-center justify-center gap-1 sm:gap-2">
                  Edit Packages
                  <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
              </div>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <FaShieldAlt className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-400">
              Your satisfaction is our promise.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarWashServicesCard;
