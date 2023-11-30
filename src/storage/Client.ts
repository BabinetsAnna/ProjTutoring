
interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
}

const LOCAL_STORAGE_KEY = 'clients';

function readClients(): Client[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading clients from localStorage:', error);
    return [];
  }
}

function writeClients(clients: Client[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(clients));
  } catch (error) {
    console.error('Error writing clients to localStorage:', error);
  }
}

function addClient(newClient: Omit<Client, 'id'>): void {
  const clients = readClients();
  const maxId = clients.length > 0 ? Math.max(...clients.map((client) => client.id)) : 0;
  const incrementedId = maxId + 1;

  const clientWithId: Client = {
    id: incrementedId,
    ...newClient,
  };

  clients.push(clientWithId);
  writeClients(clients);
}

function deleteClient(clientId: number): void {
  const clients = readClients();
  const updatedClients = clients.filter((client) => client.id !== clientId);
  writeClients(updatedClients);
}

function findClientById(clientId: number): Client | undefined {
  const clients = readClients();
  return clients.find((client) => client.id === clientId);
}
function editClient(clientId: number, updatedClientData: Partial<Omit<Client, 'id'>>): void {
  const clients = readClients();
  const updatedClients = clients.map((client) =>
    client.id === clientId ? { ...client, ...updatedClientData } : client
  );
  writeClients(updatedClients);
}

export { readClients, addClient, deleteClient, findClientById, editClient };
