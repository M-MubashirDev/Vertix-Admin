import { useParams } from "react-router-dom";

import Form from "../UI/Form";
import { useClientContext } from "./ClientContext";
import { useUpdateClientMutate } from "../Hooks/Client/useClient";
import BackButton from "../UI/BackButton";

function Edit() {
  const { clientId } = useParams();
  const { Client } = useClientContext();
  const { dataClients, pendingClient } = Client;
  const { users } = dataClients || { totalUsers: 0, users: [] };
  // const { Clients } = dataClients || {};
  const currentClient = users?.find((val) => val._id === clientId);

  const { updateClient, isPendingUpdate } = useUpdateClientMutate(); //update api

  function SubmitData(value) {
    if (!value) return;
    updateClient({
      url: "update-user",
      id: clientId,
      updatedData: value,
    });
  }

  if (!currentClient) {
    return (
      <div className="bg-background p-6 rounded-md max-w-[1440px] mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>
        <h2 className="text-primary-dark text-2xl font-bold mb-4">
          Client Edit
        </h2>
        <p className="text-neutral-dark">No Client data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-background p-6 rounded-md max-w-[1440px] mx-auto">
      <div className="mb-6">
        <BackButton />
      </div>
      <h2 className="text-primary-dark text-2xl font-bold mb-4">
        Edit Client Details
      </h2>
      <Form
        defaultValues={{
          firstname: currentClient.firstname,
          lastname: currentClient.lastname,
          email: currentClient.email,
        }}
        onSubmit={SubmitData}
      >
        <Form.Input label="First Name" name="firstname" />
        <Form.Input label="Last Name" name="lastname" />
        <Form.Input label="Email" name="email" type="email" />

        <Form.ButtonSubmit>Save Changes</Form.ButtonSubmit>
      </Form>
    </div>
  );
}

export default Edit;
