import App from './App';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from "react-router-dom";
import { render, screen } from './test-utils';

test('renders h1', async () => {
  await act(async () => {
    await render(<BrowserRouter>
      <App />
    </BrowserRouter>);
  })
  expect(screen.getByText('The Best Burgirs in Sofia!')).toBeInTheDocument();
  expect(screen.getByText('Wanna see our')).toBeInTheDocument();
});
