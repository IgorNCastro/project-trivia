export const fetchToken = async () => {
  try {
    const url = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(url);
    const token = await response.json();
    return token;
  } catch (e) {
    console.log(e);
  }
};

export default fetchToken;
