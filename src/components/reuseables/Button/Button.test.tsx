import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { Button } from './Button'

jest.mock('../../../hooks/useMediaQuery')

describe('Button component', () => {
	beforeEach(() => {
		(useMediaQuery as jest.Mock).mockReturnValue([true, jest.fn()])
	})

	afterEach(() => {
		(useMediaQuery as jest.Mock).mockClear()
	})

	it('renders mobile version when media query matches', () => {
		render(<Button onClick={jest.fn()}>Click me</Button>)
		const mobileButton = screen.getByTestId('mobile-button')
		const desktopButton = screen.queryByTestId('desktop-button')
		expect(mobileButton).toBeInTheDocument()
		expect(desktopButton).not.toBeInTheDocument()
	})

	it('renders desktop version when media query does not match', () => {
		(useMediaQuery as jest.Mock).mockReturnValue([false, jest.fn()])
		render(<Button onClick={jest.fn()}>Click me</Button>)
		const mobileButton = screen.queryByTestId('mobile-button')
		const desktopButton = screen.getByTestId('desktop-button')
		expect(mobileButton).not.toBeInTheDocument()
		expect(desktopButton).toBeInTheDocument()
	})

	it('renders correctly with default props', () => {
		render(<Button onClick={jest.fn()}>Click me</Button>)
		const buttonElement = screen.getByText('Click me')
		expect(buttonElement).toBeInTheDocument()
		expect(buttonElement).toHaveStyle('width: auto')
	})

	it('renders a round button', () => {
		render(<Button onClick={jest.fn()} shape="round">Round</Button>)
		const buttonElement = screen.getByText('Round')
		expect(buttonElement).toBeInTheDocument()
		expect(buttonElement).toHaveClass('round')
	})

	it('executes onClick when clicked', () => {
		const clickFuncMock = jest.fn()
		render(<Button onClick={clickFuncMock}>Click me</Button>)
		const buttonElement = screen.getByText('Click me')
		fireEvent.click(buttonElement)
		expect(clickFuncMock).toHaveBeenCalledTimes(1)
	})

	it('renders a clicked button', () => {
		render(<Button onClick={jest.fn()} isClicked>Clicked</Button>)
		const buttonElement = screen.getByText('Clicked')
		expect(buttonElement).toBeInTheDocument()
		expect(buttonElement).toHaveClass('clicked')
	})

	it('renders a toggle button in its clicked state', () => {
		render(<Button onClick={jest.fn()} type="toggle" isClicked>Toggle</Button>)
		const buttonElement = screen.getByText('Toggle')
		expect(buttonElement).toBeInTheDocument()
		expect(buttonElement).toHaveClass('clicked')
	})

	it('renders different width based on media query', () => {
		render(<Button onClick={jest.fn()} width="50px" mobileWidth="100px">Width Test</Button>)
		const buttonElement = screen.getByText('Width Test')
		expect(buttonElement).toHaveStyle('width: 100px')
	})

	it('renders different width for round button based on media query', () => {
		render(<Button onClick={jest.fn()} shape="round" width="100px" mobileWidth="50px">Round Width Test</Button>)
		const buttonElement = screen.getByText('Round Width Test')
		expect(buttonElement).toHaveStyle('width: 50px')
	})
})
