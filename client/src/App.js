import React, { useState, useEffect } from "react";
import Map from "./Components/Map";
import WelcomeModal from "./Components/WelcomeModal";
import ErrorAlert from "./Components/ErrorAlert";
import { Spinner } from "react-bootstrap";
import "./Style/App.css";

const useCurrentLocation = () => {
	const [error, setError] = useState(0);
	const [location, setLocation] = useState();

	const handleSuccess = (position) => {
		const { latitude, longitude } = position.coords;

		setLocation({
			lat: latitude,
			lng: longitude,
		});
	};

	const handleError = (e) => {
		if (e.code === e.PERMISSION_DENIED) {
			console.log("Permission Denied");
			setError(4);
		}
	};
	useEffect(() => {
		if (!navigator.geolocation) {
			setError(4);
			return;
		}

		navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
	}, []);

	return { location, error };
};

function App() {
	const [errorType, setErrorType] = useState(0);
	const [showError, setShowError] = useState(false);
	const { location, error } = useCurrentLocation();
	console.log(error);
	return (
		<div className="App">
			{error !== 0 ? (
				<div className="fullScreenWrapper">
					<p id="enable-location-error">Looks like you don't have location enabled, please "Allow" location and refresh the page. Currently the app requires you to enable location to find restaurants near you.</p>
				</div>
			) : location ? (
				<>
					<ErrorAlert
						errorType={errorType}
						showError={showError}
						setShowError={setShowError}
					></ErrorAlert>
					<WelcomeModal></WelcomeModal>
					<Map
						errorType={errorType}
						showError={showError}
						setShowError={setShowError}
						setErrorType={setErrorType}
						userLocation={location}
					></Map>
				</>
			) : (
				<div className="fullScreenWrapper">
					<Spinner animation="grow" variant="primary" role="status"></Spinner>
					<span className="sr-only">Waiting For Location...</span>
				</div>
			)}
		</div>
	);
}
export default App;
