export const getRequests = async (kvNamespace) => {
  const keys = await kvNamespace.list();
  const requests = [];
  
  for (const key of keys.keys) {
    const value = await kvNamespace.get(key.name);
    if (value) {
      requests.push(JSON.parse(value));
    }
  }
  
  return requests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const addRequest = async (kvNamespace, title, description) => {
  const id = Date.now().toString();
  const requestData = {
    id,
    title,
    description: description || '',
    timestamp: new Date().toISOString()
  };
  await kvNamespace.put(id, JSON.stringify(requestData));
  return requestData;
};

export const deleteRequest = async (kvNamespace, id) => {
  await kvNamespace.delete(id);
};
