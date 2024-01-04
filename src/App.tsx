import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { icon } from "leaflet"
import React, { useState } from "react"

// Importing restaurant data from a local JSON file.
import restaurants from "./data.json"

// Type definition for Restaurant objects used in the application.
type Restaurant = {
	name: string
	position: [number, number] // Tuple for latitude and longitude
	address: string
	phone: string
	googleMapsUrl: string
	websiteUrl?: string // Optional field for website URL
}

// Constant setup for the marker icon used in the map for each restaurant.
const ICON = icon({
	iconUrl: "/marker.svg", // URL to the marker image
	iconSize: [32, 32], // Size of the icon
})

/**
 * Main App component containing the functionality for filtering and displaying restaurants on a map.
 */
const App = () => {
	// State initialization for restaurants, filter text and filtered restaurant list.
	const initialRestaurants: Restaurant[] = restaurants as Restaurant[]
	const headerRef = React.useRef<HTMLHeadingElement>(null)
	const [filter, setFilter] = useState("")
	const [filteredRestaurants, setFilteredRestaurants] = useState(initialRestaurants)

	/**
	 * Checks if a restaurant matches the filter criteria.
	 * @param restaurant - The restaurant to check.
	 * @param filter - The filter string.
	 * @returns A boolean indicating if the restaurant matches the filter.
	 */
	const restaurantMatchesFilter = (restaurant: Restaurant, filter: string) => {
		const lowerCaseFilter = filter.toLowerCase()
		return (
			restaurant.name.toLowerCase().includes(lowerCaseFilter) ||
			restaurant.address.toLowerCase().includes(lowerCaseFilter) ||
			restaurant.phone.includes(filter) || // Phone numbers are usually not case-sensitive
			(restaurant.websiteUrl &&
				restaurant.websiteUrl.toLowerCase().includes(lowerCaseFilter))
		)
	}

	/**
	 * Handles changes to the filter input field, filtering the list of restaurants accordingly.
	 * @param event - The change event from the input field.
	 */
	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setFilter(value)
		const filtered = initialRestaurants.filter((restaurant) =>
			restaurantMatchesFilter(restaurant, value),
		)
		setFilteredRestaurants(filtered)
	}


	return (
		<div className="px-4 sm:px-16 lg:px-44 dark:bg-slate-900">
			<main id="content" role="main">
				<div className="mx-auto flex max-w-[85rem] flex-col gap-6 px-4 pb-10 pt-12 sm:px-6 md:pt-24 lg:px-8 ">
					<header ref={headerRef} className="max-w-3xl">
						<h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">
							The best halal joints in Charlotte, NC
						</h1>
						<p className="mt-2 text-lg text-gray-800 dark:text-gray-400">
							You can click on any of the markers for more deets, or use the
							search box to filter the list of restaurants if you're in a hurry
							and just need to find a place to eat.
						</p>
						<div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
							<input
								type="text"
								placeholder="Filter Restaurants"
								value={filter}
								onChange={handleFilterChange}
								className="block w-full max-w-sm rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
							/>
						</div>
					</header>
					<MapContainer
						center={[35.22660322786631, -80.84464862192975]}
						zoom={10}
						minZoom={10}
						maxZoom={18}
						className="h-[calc(100vh-20rem)] w-full"
					>
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						/>
						{filteredRestaurants.map((restaurant, index) => (
							<Marker key={index} position={restaurant.position} icon={ICON}>
								<Popup>
									<div className="p-2">
										<h2 className="text-lg font-bold">{restaurant.name}</h2>
										<p className="text-sm">{restaurant.address}</p>
										<p className="mb-2 text-sm">Tel: {restaurant.phone}</p>
										<a
											href={restaurant.googleMapsUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-500 underline hover:text-blue-700"
										>
											View on Google Maps
										</a>
										{restaurant.websiteUrl && (
											<div className="mt-1">
												<a
													href={restaurant.websiteUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="text-blue-500 underline hover:text-blue-700"
												>
													Visit Website
												</a>
											</div>
										)}
									</div>
								</Popup>
							</Marker>
						))}
					</MapContainer>
				</div>
			</main>
		</div>
	)
}

export default App
