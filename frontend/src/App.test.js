import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create a new mock instance
const mock = new MockAdapter(axios);

beforeEach(() => {
  // Reset any previous mock requests
  mock.reset();
});

test('some test', async () => {
  // Set up mock response
  mock.onGet('https://api.github.com/someendpoint').reply(200, { data: 'test' });

  // Now test code that makes the request
  const response = await axios.get('https://api.github.com/someendpoint');
  expect(response.data).toEqual({ data: 'test' });
});
