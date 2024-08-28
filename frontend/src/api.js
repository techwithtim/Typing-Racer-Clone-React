export const DB_URL = "";
export const DB_USER = import.meta.env.VITE_DB_USER;
export const DB_PASS = import.meta.env.VITE_DB_PASS;

const credentials = `${DB_USER}:${DB_PASS}`;
const encodedCredentials = btoa(credentials);
const authorizationHeader = `Basic ${encodedCredentials}`;
const headers = {
  "Content-Type": "application/json",
  Authorization: authorizationHeader,
};

export const getSnippets = async () => {
  const response = await fetch(DB_URL + "/Snippet/", {
    headers: headers,
  });
  const result = await response.json();
  console.log(result);
  return result;
};

export const postScore = async (snippet, time, cpm) => {
  await fetch(DB_URL + "/Scores", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      snippetId: snippet.id,
      time,
      cpm,
    }),
  });
};
