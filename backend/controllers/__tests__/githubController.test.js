import axios from 'axios';
import { getUserDetails } from '../githubController';


// Mock axios.get method
jest.mock('axios');


describe('getUserDetails', () => {
  it('returns a list of GitHub users', async () => {
    const mockRes = { json: jest.fn() };
    const mockReq = { params: { username: 'octocat' } };

    
    // Mock the response of axios.get to return a fake response for the users search
    axios.get.mockResolvedValue({ data: { login: 'octocat', name: 'Octocat' } });


    // Call the controller function
    await getUserDetails(mockReq, mockRes);


    // Verify axios.get was called with the correct query
    expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/octocat');
    expect(mockRes.json).toHaveBeenCalledWith({ login: 'octocat', name: 'Octocat' });
  });


  it('handles errors gracefully', async () => {
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockReq = { params: { username: 'invalid' } };


    // Mock axios.get to throw an error
    axios.get.mockRejectedValue(new Error('GitHub API error'));


    // Call the controller function
    await getUserDetails(mockReq, mockRes);


    // Verify the error handling
    expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/invalid');
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error fetching user details' });
    
    
    // Snapshot the error response
    expect(mockRes.json).toMatchSnapshot();
  });
});
