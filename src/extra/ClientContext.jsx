import { createContext, useContext } from "react";
import { UsegetClients } from "../Hooks/Client/useClient";

const ClientsContext = createContext();

function ClientContext({ children }) {
  const { dataClients, pendingClient } = UsegetClients(); // Fetches Client data

  return (
    <ClientsContext.Provider
      value={{
        Client: {
          dataClients: dataClients,
          pendingClient,
        },
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useClientContext = function () {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error("useClientContext must be used within an ClientContext");
  }
  return context;
};

export default ClientContext;
