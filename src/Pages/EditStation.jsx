import { useParams, useNavigate } from "react-router-dom";
import Form from "../UI/Form";
import { useUpdateStationMutate } from "../Hooks/Admin/useAdmins";
import { usePackageContext } from "../Components/PackageContext";

function EditStation() {
  const { stationId } = useParams();
  const navigate = useNavigate();

  const { dataServiceStations, pendingServiceStation } = usePackageContext();

  const { error, mutateStation, isPendingUpdate } = useUpdateStationMutate();

  const handleSubmit = (formData) => {
    const updateData = {
      name: formData.name,
      location: formData.location,
      address: formData.address,
      image: "", // Use existing image if no new upload
    };

    mutateStation({
      id: stationId,
      url: "service-station",
      updatedData: updateData,
    });
  };
  if (isPendingUpdate) return <div>Loading...</div>;
  if (error) return <div>Error loading station: {error.message}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-primary-dark mb-6">
        Edit Service Station
      </h2>

      <Form onSubmit={handleSubmit} defaultValues={dataServiceStations}>
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

          <Form.FileInput
            label="Station Image"
            name="image"
            accept="image/*"
            // validation={{
            //   validate: (value) => {
            //     if (!value && !dataServiceStations?.image)
            //       return "Image is required";
            //     return true;
            //   },
            // }}
          />

          <div className="flex gap-4 mt-8">
            <Form.ButtonSubmit>Update Station</Form.ButtonSubmit>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
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
