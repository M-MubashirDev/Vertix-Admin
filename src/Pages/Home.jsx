import ClientsTable from "../Components/ClientsTable";
import AdminClientChart from "../Components/Chart";

const Home = () => {
  const adminClientData = {
    labels: [
      "John Doe",
      "Jane Smith",
      "Admin 3",
      "Admin 4",
      "John Doe",
      "Jane Smith",
      "Admin 3",
      "Admin 4",
      "John Doe",
      "Jane Smith",
      "Admin 3",
      "Admin 4",
      "John Doe",
      "Jane Smith",
      "Admin 3",
      "Admin 4",
      "John Doe",
      "Jane Smith",
      "Admin 3",
      "Admin 4",
      "John Doe",
      "Jane Smith",
      "Admin 3",
      "Admin 4",
      "John Doe",
      "Jane Smith",
      "Admin 3",
      "Admin 4",
      "John Doe",
      "Jane Smith",
      "Admin 3",
      "Admin 4",
    ], // Replace with actual admin names
    values: [
      20, 15, 25, 1020, 15, 25, 10, 40, 15, 25, 1020, 15, 25, 10, 40, 15, 25,
      1020, 15, 25, 10, 40, 15, 25, 1020, 15, 25, 10, 40,
    ], // Replace with actual number of clients managed by each admin
  };
  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-primary-dark mb-4">Welcome</h1>
      <p className="text-lg text-neutral-dark mb-8">
        Here is an overview of the system:
      </p>

      <ClientsTable />
      {/* <div className="flex flex-wrap justify-center gap-16 min-w-full  mb-12">
        {" "}
        <AdminClientChart data={adminClientData} />
      </div> */}
    </div>
  );
};

export default Home;
