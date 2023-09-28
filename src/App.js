import Location from './components/Location';
import BackgroundParticles from './components/BackgroundParticles';

function App() {
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
