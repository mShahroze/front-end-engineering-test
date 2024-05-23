import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'text-encoding';
import { setupServer } from 'msw/node';
import { handlers } from '../../../mocks/handlers'; // Adjust the import path accordingly
import UserList from '../UserList';
import { http } from 'msw';



const server = setupServer(...handlers,  {
    // Disable TextEncoder
    encoding: 'none',
  });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

test('renders loading state', () => {
  renderWithClient(<UserList />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('renders list of users', async () => {
  renderWithClient(<UserList />);
  expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
  expect(await screen.findByText(/Jane Smith/i)).toBeInTheDocument();
});

test('renders error state', async () => {
  server.use(
    http.get('/api/users', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  renderWithClient(<UserList />);
  expect(
    await screen.findByText(/An error occurred/i)
  ).toBeInTheDocument();
});
