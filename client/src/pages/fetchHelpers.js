import axios from 'axios';

export const createEvent = async (
  { title, description, price, date },
  token
) => {
  const requestBody = {
    query: `
        mutation {
          createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"})
          {
            _id
            title
            description
            price
            date
          }
        }
      `
  };

  const res = await axios({
    method: 'post',
    url: 'http://localhost:8000/graphql',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: JSON.stringify(requestBody)
  });
  if (res.status !== 200 && res.status !== 201) {
    throw new Error('Failed!');
  }
  return res.data;
};
