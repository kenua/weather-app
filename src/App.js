import Location from './components/Location';
import BackgroundParticles from './components/BackgroundParticles';

function App() {
	const changeThemeColor = (modifier) => {
		if (modifier.length === 0) {
			document.body.className = '';
		} else {
			document.body.className = `theme--${modifier}`;
		}
	}

	return (
	<>
		<BackgroundParticles />
		<div className="corner-particle corner-particle--top-right"></div>
		<div className="corner-particle corner-particle--bottom-left"></div>
		<div className="content">
			<Location />
		</div>
	</>
	);
}

export default App;
