function BackgroundParticles() {
	let particles = [];

	for (let i = 0; i < 30; i++) {
		particles.push(<span key={i} className="background-particles__particle"></span>);
	}

	return (
		<div className="background-particles">
			{ particles }
		</div>
	);
}

export default BackgroundParticles;