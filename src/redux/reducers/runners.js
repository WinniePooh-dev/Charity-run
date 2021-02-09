import { ADD_NEW_FIELD, ADD_RUNNER, SORT_RUNNERS } from '../action-types';

const init_state = [
	{
		"id": 1,
		"date": "11.03.1987",
		"name": "Куклина Мария Ивановна",
		"email": "kyklina@mail.ru",
		"phone": "+79223625999",
		"distance": 5,
		"payment": 500
	},
	{
		"id": 2,
		"date": "8.05.1997",
		"name": "Мокрушина Галина Юрьевна",
		"email": "mokrushina@mail.ru",
		"phone": "+79881125999",
		"distance": 10,
		"payment": 300
	},
	{
		"id": 3,
		"date": "24.01.1886",
		"name": "Ольга Сергеевна Заводская",
		"email": "olga.zavodckaia@mail.ru",
		"phone": "+79008011000",
		"distance": 3,
		"payment": 1500
	}
]

export default function runners( state = init_state, action ) {
    switch (action.type) {
		case ADD_NEW_FIELD:
			return action.payload
		case ADD_RUNNER:
			return action.payload
		case SORT_RUNNERS:
			return action.payload
		default:
			return state;
	}
}