import { FormControl, FormGroup, FormText } from 'react-bootstrap';
import actionTypes from 'shared/store/constants/actionTypes';
import { storeContext } from 'shared/store';
import { useRef, useContext, useEffect } from 'react';
import useSolverWorker from 'shared/hooks/useSolverWorker';

const GridInput = () => {
  const { state, dispatch } = useContext(storeContext);
  const [solutions, executionTime] = useSolverWorker(state.userInput);
  const inputRef = useRef();

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_SOLUTIONS,
      data: {
        solutions
      }
    });
  }, [solutions]);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_EXECUTION_TIME,
      data: {
        executionTime
      }
    });
  }, [executionTime])

  const handleUserInputChange = ({ target }) => {
    dispatch({
      type: actionTypes.SET_USER_INPUT,
      data: {
        userInput: target.value
      }
    });

    if (target.value.length === 16) {
      inputRef.current.blur();
    }
  }

  return (
    <FormGroup>
      <FormControl
        ref={inputRef}
        placeholder='Syötä kirjaimet esimerkin mukaisesti'
        maxLength={16}
        onChange={handleUserInputChange}
        value={state.userInput}
      />
      <FormText className="text-muted statistics-text">
        {state.executionTime && `Haku vei ${state.executionTime}s, löydettiin ${state.solutions.length} sanaa.`}
      </FormText>
    </FormGroup>
  );
};

export default GridInput;