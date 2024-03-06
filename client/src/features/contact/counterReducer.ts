export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const COUNTER_DECREMENT = 'COUNTER_DECREMENT';


export interface CounterState {
    data : number;
    title : string;
}

const initialState: CounterState = {
    data: 42,
    title : 'Yarc (yet another react counter)'
}

export function increment(amount = 1){
    return {
        type: COUNTER_INCREMENT,
        payload: amount
    }
}
export function decrement(amount = 1){
    return {
        type: COUNTER_DECREMENT,
        payload: amount
    }
}
interface CounterAction{
    type: string
    payload: number
}

export default function counterReducer(state = initialState, action: CounterAction) {
    switch (action.type) {
        case COUNTER_INCREMENT:
            return { ...state, data: state.data + action.payload };
        case COUNTER_DECREMENT:
            return { ...state, data: state.data - action.payload };
        default: return state;
    }
    
}


