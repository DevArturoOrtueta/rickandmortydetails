const initialState = {
		items: [],
		loading: false,
		error: null
};

// Thunk action to fetch characters based on query
export const fetchCharacters = (query = '') => {
	return async (dispatch) => {
		dispatch({ type: 'characters/fetchStart' });
		try {
			const q = String(query).trim();
			const url = q === ''
				? 'https://rickandmortyapi.com/api/character'
				: (/^\d+$/.test(q) ? `https://rickandmortyapi.com/api/character/${q}` : `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(q)}`);

			const res = await fetch(url);
			if (!res.ok) {
				const errorText = await res.text().catch(() => res.statusText || 'Fetch error');
				throw new Error(errorText || `HTTP ${res.status}`);
			}
			const data = await res.json();

			let items = [];
			if (data) {
				if (data.name) items = [data];
				else if (Array.isArray(data.results)) items = data.results;
				else if (Array.isArray(data)) items = data;
			}

			dispatch({ type: 'characters/fetchSuccess', payload: items });
		} catch (err) {
			dispatch({ type: 'characters/fetchFailure', payload: err.message || String(err) });
		}
	};
};

export const clearCharacters = () => ({ type: 'characters/clear' });

export default function charactersReducer(state = initialState, action) {
	switch (action.type) {
		case 'characters/fetchStart':
			return { ...state, loading: true, error: null };
		case 'characters/fetchSuccess':
			return { ...state, loading: false, items: action.payload || [] };
		case 'characters/fetchFailure':
			return { ...state, loading: false, error: action.payload || 'Unknown error' };
		case 'characters/clear':
			return { ...state, items: [], loading: false, error: null };
		default:
			return state;
	}
}
