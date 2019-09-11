const getEnter = (e) => {
	switch (e.index) {
		case 0:
			return {
				rotate: 90,
				opacity: 0,
				y: -60,
			};
		case 10:
		case 1:
			return {
				y: -60,
				x: -10,
				opacity: 0,
			};
		case 9:
		case 2:
			return {
				y: -60,
				x: 20,
				opacity: 0,
			};
		case 3:
			return {
				y: 60,
				opacity: 0,
			};
		case 8:
		case 4:
			return {
				x: 30,
				opacity: 0,
			};
		case 5:
			return {
				enter: [
					{
						scale: 2,
						opacity: 0,
						type: 'set',
					},
					{ scale: 1.2, opacity: 1, duration: 300 },
					{ scale: 0.9, duration: 200 },
					{ scale: 1.05, duration: 150 },
					{ scale: 1, duration: 100 },
				]
			};
		case 6:
			return {
				scale: 0.8,
				x: 30,
				y: -10,
				opacity: 0,
			};
		case 7:
			return {
				scale: 0.8,
				x: 30,
				y: 10,
				opacity: 0,
			};
		default:
			return {
				opacity: 0,
			};
	}
};
const getInterval_Title = (e) => {
	switch (e.index) {
		case 0:
			return 0;
		case 1:
			return 150;
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
			return 150 + 450 + (e.index - 2) * 10;
		default:
			return 150 + 450 + (e.index - 6) * 150;
	}
}
const getEnter_Title = (e) => {
	const t = {
		opacity: 0,
		scale: 0.8,
		y: '-100%',
	};
	if (e.index >= 2 && e.index <= 6) {
		return { ...t, y: '-30%', duration: 150 };
	}
	return t;
}
const componentProps_Title = {
	animation: [
	  { x: 130, type: 'set' },
	  { x: 100, delay: 500, duration: 450 },
	  {
		ease: 'easeOutQuart',
		duration: 300,
		x: 0,
	  },
	  {
		letterSpacing: 0,
		delay: -300,
		scale: 0.9,
		ease: 'easeInOutQuint',
		duration: 1000,
	  },
	  { scale: 1, width: '100%', delay: -300, duration: 1000, ease: 'easeInOutQuint' },
	],
  }
export {
	getEnter,
	getInterval_Title,
	getEnter_Title,
	componentProps_Title
};