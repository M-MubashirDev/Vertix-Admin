// import { useParams, useNavigate } from "react-router-dom";
// import Form from "../UI/Form";
// import { useUpdateStationMutate } from "../Hooks/Admin/useAdmins";
// import { usePackageContext } from "../Components/PackageContext";

// function EditStation() {
//   const { stationId } = useParams();
//   const navigate = useNavigate();

//   const { dataServiceStations, pendingServiceStation } = usePackageContext();
//   const { error, mutateStation, isPendingUpdate } = useUpdateStationMutate();

//   // Filter the specific station data
//   const filteredData = dataServiceStations?.find(
//     (data) => data._id === stationId
//   );

//   console.log("Filtered Data:", filteredData);

//   // Handle form submission
//   const handleSubmit = (formData) => {
//     const updateData = {
//       name: formData.name,
//       location: formData.location,
//       address: formData.address,
//       image: formData.image || "", // Use existing image if no new upload
//     };

//     mutateStation({
//       id: stationId,
//       url: "service-station",
//       updatedData: updateData,
//     });
//   };

//   if (isPendingUpdate) return <div>Loading...</div>;
//   if (error) return <div>Error loading station: {error.message}</div>;

//   if (pendingServiceStation || !filteredData) {
//     return <div>Loading station data...</div>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-4xl font-bold text-primary-dark mb-6">
//         Edit Service Station
//       </h2>

//       {/* Pass default values to the Form */}
//       <Form onSubmit={handleSubmit} defaultValues={filteredData}>
//         <div className="space-y-6">
//           <Form.Input
//             label="Station Name"
//             name="name"
//             validation={{ required: "Station name is required" }}
//           />

//           <Form.Input
//             label="Location"
//             name="location"
//             validation={{ required: "Location is required" }}
//           />

//           <Form.Input
//             label="Address"
//             name="address"
//             validation={{ required: "Address is required" }}
//           />

//           <Form.FileInput label="Station Image" name="image" accept="image/*" />

//           <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:max-w-[50rem]">
//             <Form.ButtonSubmit>Update Station</Form.ButtonSubmit>
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="w-full bg-gray-200  text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-300 transition-colors"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Form>
//     </div>
//   );
// }

// export default EditStation;
import { useParams, useNavigate } from "react-router-dom";
import Form from "../UI/Form";
import { useUpdateStationMutate } from "../Hooks/Admin/useAdmins";
import { usePackageContext } from "../Components/PackageContext";
import { Spinner } from "../UI/Spinner";

function EditStation() {
  const { stationId } = useParams();
  const navigate = useNavigate();

  const { dataServiceStations, pendingServiceStation } = usePackageContext();
  const { error, mutateStation, isPendingUpdate } = useUpdateStationMutate();

  // Filter the specific station data
  const filteredData = dataServiceStations?.find(
    (data) => data._id === stationId
  );

  console.log("Filtered Data:", filteredData);

  // Handle form submission
  const handleSubmit = (formData) => {
    const updateData = {
      name: formData.name,
      location: formData.location,
      address: formData.address,
      latitude: formData.latitude, // Include latitude in the update data
      longitude: formData.longitude, // Include longitude in the update data
      image: formData.image || "", // Use existing image if no new upload
    };

    mutateStation({
      id: stationId,
      url: "service-station",
      updatedData: updateData,
    });
  };

  if (pendingServiceStation || !filteredData) {
    return <Spinner />;
  }

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-primary-dark mb-6">
        Edit Service Station
      </h2>

      {/* Pass default values to the Form */}
      <Form onSubmit={handleSubmit} defaultValues={filteredData}>
        <div className="space-y-6">
          <Form.Input
            label="Station Name"
            name="name"
            validation={{ required: "Station name is required" }}
          />

          <Form.Input
            label="Location"
            name="location"
            validation={{ required: "Location is required" }}
          />

          <Form.Input
            label="Address"
            name="address"
            validation={{ required: "Address is required" }}
          />

          <Form.Input
            label="Latitude"
            name="latitude"
            validation={{
              required: "Latitude is required",
              pattern: {
                value: /^-?\d+(\.\d+)?$/, // Regex for latitude validation
                message: "Enter a valid latitude (e.g., 40.7128)",
              },
            }}
          />

          <Form.Input
            label="Longitude"
            name="longitude"
            validation={{
              required: "Longitude is required",
              pattern: {
                value: /^-?\d+(\.\d+)?$/, // Regex for longitude validation
                message: "Enter a valid longitude (e.g., -74.0060)",
              },
            }}
          />

          <Form.FileInput label="Station Image" name="image" accept="image/*" />

          <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:max-w-[50rem]">
            <Form.ButtonSubmit isSubmitting={isPendingUpdate}>
              Update Package
            </Form.ButtonSubmit>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default EditStation;
