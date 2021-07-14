import React from 'react';
import {render as rtlRender, screen} from '@testing-library/react'
import App from '../App';
import Register from '../components/Register';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

describe('Snapshot tests for main app component', () => {
  it('Main app renders correctly', () => {
    const tree = rtlRender(<App />);
    expect(tree).toMatchSnapshot();
  });

  it("testing if components match is falsy", async () => {
    const wrapper = shallow(<Register />);
    const wrapper1 = shallow(<App />);
    expect(wrapper).not.toBe(wrapper1);
  });


  it("checks if the button is working as expected", () => {
    const wrapper = shallow(<Register />);
    wrapper.find('Button').simulate('click');
  });
});

describe('Render screen elements correctly', () => {
  const render = (ui, {route = '/'} = {}) => {
    window.history.pushState({}, 'Test page', route)

    return rtlRender(ui, {wrapper: Router})
  }
  // Testing to see if our url routing works
  test('full app rendering/navigating', () => {
    render(<App />)
    expect(screen.getByText(/Appointments/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Appointments/i));

    expect(screen.getByText(/Register page/i)).toBeInTheDocument();
  })
});
