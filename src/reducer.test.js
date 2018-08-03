import reducer from './reducer';
import {generateAuralUpdate, restartGame, makeGuess} from './actions';

describe('reducer', () => {
    const guesses = [5, 10, 35, 49];
    const correctAnswer = 50;
    const feedback = "You're Hot!";
    const auralStatus = `Here's the status of the game right now: ${feedback} You've made ${guesses.length} guesses. In order of most- to least-recent, they are: 49, 35, 10, 5`;
    const testState = {
        guesses,
        correctAnswer,
        feedback,
        auralStatus
    };

    it('Should set the initial state when nothing is passed in', () => {
        let state = reducer(undefined, {type: '_UNKNOWN'});
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.auralStatus).toEqual('');
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = reducer(currentState, {type: '_UNKNOWN'});
        expect(state).toBe(currentState);
    });

    describe('generateAuralUpdate', () => {
        it('Should generate aural update', () => {
            let state = {
                guesses,
                correctAnswer,
                feedback,
                auralStatus: ''
            };
            state = reducer(state, generateAuralUpdate());
            expect(state).toEqual(testState);
        });
    });

    describe('restartGame', () => {
        it('Should reset state to initial state', () => {
            let state = testState;
            const answer = 75;
            state = reducer(state, restartGame(answer));
            expect(state).toEqual({
                guesses: [],
                correctAnswer: 75,
                auralStatus: '',
                feedback: 'Make your guess!'
            });
        });
    });

    describe('makeGuess', () => {
        it('Should update state with guess and display proper feedback', () => {
            let state = testState;
            const guess = 75;
            state = reducer(state, makeGuess(guess));
            expect(state).toEqual({
                guesses: [49, 35, 10, 5, 75],
                correctAnswer: 50,
                auralStatus: auralStatus,
                feedback: "You're Warm."
            });
        });
    });

});