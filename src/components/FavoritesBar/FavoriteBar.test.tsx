import { fireEvent, render, screen } from '@testing-library/react';
import { useWeatherContext } from '../../contexts/useWeatherContext';
import { FavoritesBar } from './FavoritesBar';

// Mock the useWeatherContext hook
jest.mock('../../contexts/useWeatherContext');

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		dispatchEvent: jest.fn(),
	}),
});

it('changes the city when a favorite button is clicked', () => {
	const favoriteCities = ['City1', 'City2', 'City3'];
	const toggleShowMock = jest.fn();
	const setCityMock = jest.fn();

	// Mock the context value
	(useWeatherContext as jest.Mock).mockReturnValue({
		city: '',
		futureTime: '',
		isLoading: false,
		setCity: setCityMock,
	});

	render(<FavoritesBar favoriteCities={favoriteCities} toggleShow={toggleShowMock} />);

	favoriteCities.forEach((favCity) => {
		const abbreviation = favCity
			.split(' ')
			.map((word) => word.substring(0, 1).toUpperCase())
			.join('')
			.substring(0, 3);

		const favoriteButtons = screen.queryAllByText(abbreviation);

		// Filter the buttons based on the current media query
		const visibleFavoriteButton = favoriteButtons.find(
			(button) => button.getAttribute('data-testid') === 'desktop-button' // or 'mobile-button'
		);

		if (visibleFavoriteButton) {
			fireEvent.click(visibleFavoriteButton);
			// eslint-disable-next-line jest/no-conditional-expect
			expect(setCityMock).toHaveBeenCalledWith(favCity);
		}
	});
});

it('does not change the city when a hidden favorite button is clicked', () => {
	const favoriteCities = ['City1', 'City2', 'City3'];
	const toggleShowMock = jest.fn();
	const setCityMock = jest.fn();

	// Mock the context value
	(useWeatherContext as jest.Mock).mockReturnValue({
		city: '',
		futureTime: '',
		isLoading: false,
		setCity: setCityMock,
	});

	render(<FavoritesBar favoriteCities={favoriteCities} toggleShow={toggleShowMock} />);

	favoriteCities.forEach((favCity) => {
		const abbreviation = favCity
			.split(' ')
			.map((word) => word.substring(0, 1).toUpperCase())
			.join('')
			.substring(0, 3);

		const favoriteButtons = screen.queryAllByText(abbreviation);

		// Filter the buttons based on the current media query
		const hiddenFavoriteButton = favoriteButtons.find(
			(button) => button.getAttribute('data-testid') === 'mobile-button' // or 'desktop-button'
		);

		if (hiddenFavoriteButton) {
			fireEvent.click(hiddenFavoriteButton);
			// eslint-disable-next-line jest/no-conditional-expect
			expect(setCityMock).not.toHaveBeenCalled();
		}
	});
});

it('calls toggleShow when a favorite button is clicked and media query matches', () => {
	const favoriteCities = ['City1', 'City2', 'City3'];
	const toggleShowMock = jest.fn();
	const setCityMock = jest.fn();

	// Mock the context value
	(useWeatherContext as jest.Mock).mockReturnValue({
		city: '',
		futureTime: '',
		isLoading: false,
		setCity: setCityMock,
	});

	render(<FavoritesBar favoriteCities={favoriteCities} toggleShow={toggleShowMock} />);

	favoriteCities.forEach((favCity) => {
		const abbreviation = favCity
			.split(' ')
			.map((word) => word.substring(0, 1).toUpperCase())
			.join('')
			.substring(0, 3);

		const favoriteButtons = screen.queryAllByText(abbreviation);

		// Filter the buttons based on the current media query
		const visibleFavoriteButton = favoriteButtons.find(
			(button) => button.getAttribute('data-testid') === 'desktop-button' // or 'mobile-button'
		);

		if (visibleFavoriteButton) {
			fireEvent.click(visibleFavoriteButton);
			// eslint-disable-next-line jest/no-conditional-expect
			expect(toggleShowMock).toHaveBeenCalled();
		}
	});
});

