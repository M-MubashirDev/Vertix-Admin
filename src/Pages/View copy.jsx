import { useParams } from "react-router-dom";
import { useClientContext } from "../Components/ClientContext";
function View() {
  const { ClientId } = useParams();
  const { admin } = useClientContext();
  const { dataClients, pendinClients } = admin;
  const { Clients } = dataClients || {};
  const currentClient = Clients?.filter((val) => val._id === ClientId)[0];
  console.log(currentClient);
  if (!currentClient) {
    s;
    return (
      <div className="bg-background p-6 rounded-md max-w-[1440px] mx-auto">
        <h2 className="text-primary-dark text-2xl font-bold mb-4">
          Client Details
        </h2>
        <p className="text-neutral-dark">No Client data available.</p>
      </div>
    );
  }

  const formatDate = (isoDate) => new Date(isoDate).toLocaleString();

  return (
    <div className="bg-background p-6 rounded-md max-w-[1440px] mx-auto">
      <h2 className="text-primary-dark text-2xl font-bold mb-4">
        Client Details
      </h2>
      <div className="flex flex-col space-y-6">
        {/* Display the Client Image */}
        <div className="flex items-center">
          <img
            src={currentClient.image || "https://via.placeholder.com/150"}
            alt={`${currentClient.firstname} ${currentClient.lastname}`}
            className="w-24 h-24 rounded-full border border-neutral-light"
          />
        </div>

        {/* Display General Details */}
        <div>
          <span className="font-semibold text-neutral-dark">Name:</span>{" "}
          <span className="text-primary">
            {currentClient.firstname} {currentClient.lastname}
          </span>
        </div>
        <div>
          <span className="font-semibold text-neutral-dark">Email:</span>{" "}
          <span className="text-primary">{currentClient.email}</span>
        </div>
        <div>
          <span className="font-semibold text-neutral-dark">Phone:</span>{" "}
          <span className="text-primary">{currentClient.cellno}</span>
        </div>
        <div>
          <span className="font-semibold text-neutral-dark">Role:</span>{" "}
          <span className="text-primary">{currentClient.role}</span>
        </div>

        {/* Display Timestamps */}
        <div>
          <span className="font-semibold text-neutral-dark">Created At:</span>{" "}
          <span className="text-primary">
            {formatDate(currentClient.createdAt)}
          </span>
        </div>
        <div>
          <span className="font-semibold text-neutral-dark">Updated At:</span>{" "}
          <span className="text-primary">
            {formatDate(currentClient.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default View;
