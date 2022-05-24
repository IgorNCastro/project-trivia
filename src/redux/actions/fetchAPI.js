import md5 from 'crypto-js/md5';

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

export const fetchGravatar = (email) => {
  try {
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return url;
  } catch (e) {
    console.log(e);
  }
};
