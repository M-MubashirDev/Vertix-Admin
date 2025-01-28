import { useNavigate, useParams } from "react-router-dom";
import Form from "../UI/Form";
import { usePostStationPackages } from "../Hooks/Admin/useAdmins";

function CreatePackage() {
  const navigate = useNavigate();
  const { stationId } = useParams(); // Get the `stationId` from the URL
  const { postPackageMutate, isPendingPackage } = usePostStationPackages();

  // Handle form submission
  const handleSubmit = (data) => {
    const payload = {
      ...data,
      serviceStationId: stationId, // Include the stationId in the request
    };
    postPackageMutate({ url: "create-package", data: payload });
  };

  return (
    <div className="mt-8 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-primary-dark mb-6">
        Create Package
      </h2>

      <Form onSubmit={handleSubmit}>
        {/* Title Input */}
        <Form.Input
          name="title"
          label="Package Title"
          validation={{ required: "Package title is required" }}
        />

        {/* Description Input */}
        <Form.Input
          name="description"
          label="Package Description"
          validation={{ required: "Package description is required" }}
        />

        {/* Price Input */}
        <Form.Input
          name="price"
          label="Package Price"
          type="text"
          validation={{
            required: "Package price is required",
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "Please enter a valid price (e.g., 49.99)",
            },
          }}
        />

        {/* Submit Button */}
        {/* <Form.ButtonSubmit>Create Package</Form.ButtonSubmit> */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:max-w-[50rem]">
          <Form.ButtonSubmit isSubmitting={isPendingPackage}>
            Create Package
          </Form.ButtonSubmit>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}

export default CreatePackage;
