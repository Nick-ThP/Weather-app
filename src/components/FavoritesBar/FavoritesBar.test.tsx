import { fireEvent, render, screen } from '@testing-library/react';
import { FavoritesBar } from './FavoritesBar';

describe('FavoritesBar', () => {
	const favoriteCities = ['New York', 'Los Angeles'];
	const toggleShowMock = jest.fn();

	const props = {
		favoriteCities,
		toggleShow: toggleShowMock,
	};

	test('renders the list of favorite cities', () => {
		render(<FavoritesBar {...props} />);

		favoriteCities.forEach((city) => {
			const cityAbbreviation = city.split(' ').map((word) => word[0]).join('').substring(0, 3).toUpperCase();
			const cityAbbreviationElement = screen.getByText(cityAbbreviation);
			expect(cityAbbreviationElement).toBeInTheDocument();
		});
	});

	test('calls toggleShow when a city is clicked', () => {
		render(<FavoritesBar {...props} />);

		favoriteCities.forEach((city) => {
			const cityAbbreviation = city.split(' ').map((word) => word[0]).join('').substring(0, 3).toUpperCase();
			const cityAbbreviationElement = screen.getByText(cityAbbreviation);
			fireEvent.click(cityAbbreviationElement);
			expect(toggleShowMock).toHaveBeenCalledWith(false);
		});
	});
});