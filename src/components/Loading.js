import { motion } from 'framer-motion';

function Loading() {
	return (
	<motion.div
		key={"Loading"}
		initial={{ opacity: 0, y: 200 }}
		animate={{ opacity: 1, y: 0 }}
		exit={{ opacity: 0, y: -200 }}
		className="center"
	>
		<section className="text-center"> 
			<p style={{fontSize: '3rem', marginBottom: '10px'}}>⌛</p>
			<p style={{fontSize: '1.8rem', fontWeight: '900'}}>Loading...</p>
		</section>
	</motion.div>
	);
}

export default Loading;