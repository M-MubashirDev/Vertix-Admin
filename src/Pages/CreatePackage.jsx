import { useParams } from "react-router-dom";
import Form from "../UI/Form";
import { usePostStationPackages } from "../Hooks/Admin/useAdmins";

function CreatePackage() {
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
        <Form.ButtonSubmit>Create Package</Form.ButtonSubmit>
      </Form>
    </div>
  );
}

export default CreatePackage;
