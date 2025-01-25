import { useNavigate, useParams } from "react-router-dom";
import { usePackageContext } from "../Components/PackageContext";
import Form from "../UI/Form"; // Importing the Form component
import { useUpdatePackageMutate } from "../Hooks/Admin/useAdmins";

function EditPackage() {
  const navigate = useNavigate();
  const { dataPackages } = usePackageContext();
  const { packageId } = useParams();

  const { mutatePackage, isPendingUpdate } = useUpdatePackageMutate();

  // Get the data for the package being edited
  const currentData = dataPackages?.find((data) => packageId === data._id);
  console.log(currentData, "🌏🌏", packageId._id);
  // Check if the package exists
  if (!currentData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500">
          Package not found.
        </p>
      </div>
    );
  }

  // Handler for form submission
  const handleSubmit = (updated) => {
    const { _id, __v, ...sanitizedData } = updated; // Remove _id and __v
    console.log("Updated Package Data (Sanitized):", sanitizedData);
    // update-package
    mutatePackage({
      url: "update-package",
      id: _id,
      updatedData: sanitizedData,
    });
  };

  return (
    <div className="  py-2 rounded-lg">
      <h2 className="text-4xl font-bold  text-primary-dark mb-8">
        Edit Package
      </h2>

      <Form onSubmit={handleSubmit} defaultValues={currentData}>
        {/* Title Input */}
        <Form.Input
          name="title"
          label="Package Title"
          validation={{ required: "Title is required" }}
        />

        {/* Description Input */}
        <Form.Input
          name="description"
          label="Package Description"
          validation={{ required: "Description is required" }}
        />

        {/* Price Input */}
        <Form.Input
          name="price"
          label="Package Price"
          type="text" // Use text to allow flexible input
          validation={{
            required: "Price is required",
            pattern: {
              value: /^\d+(\.\d{1,2})?$/, // Regex for integers or up to 2 decimal places
              message: "Enter a valid price (e.g., 49.99)",
            },
          }}
        />

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:max-w-[50rem]">
          <Form.ButtonSubmit>Update Package</Form.ButtonSubmit>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full bg-gray-200  text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}

export default EditPackage;
