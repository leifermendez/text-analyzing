export const topicMap = (response: any) => {
  const topics = {
    event: response.analyzeEntities
      .filter((a: any) => a.type === "EVENT")
      .map((b: any) => b.name),
    other: response.analyzeEntities
      .filter((a: any) => a.type === "OTHER")
      .map((b: any) => b.name),
    person: response.analyzeEntities
      .filter((a: any) => a.type === "PERSON")
      .map((b: any) => b.name),
    date: response.analyzeEntities
      .filter((a: any) => a.type === "DATE")
      .map((b: any) => b.name),
    location: response.analyzeEntities
      .filter((a: any) => a.type === "LOCATION")
      .map((b: any) => b.name),
  };

  return topics;
};
