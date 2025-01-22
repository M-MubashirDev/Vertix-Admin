import { useParams } from "react-router-dom";
import { usePackageContext } from "../Components/PackageContext";
import Form from "../UI/Form"; // Importing the Form component
import { useUpdatePackageMutate } from "../Hooks/Admin/useAdmins";

function EditPackage() {
  const { dataPackages } = usePackageContext();
  const { packageId } = useParams();

  const { mutatePackage, isPendingUpdate } = useUpdatePackageMutate();

  // Get the data for the package being edited
  const currentData = dataPackages?.find((data) => packageId === data._id);

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
    <div className=" p-6 mt-7 rounded-lg">
      <h2 className="text-2xl font-bold  text-primary-dark mb-8">
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
        <Form.ButtonSubmit>Update Package</Form.ButtonSubmit>
      </Form>
    </div>
  );
}

export default EditPackage;
