import React from 'react';
import { connect } from './store/connectValue';
// import { connect } from './store/Connect';

function Hello(props) {
  return (
    <div>
        {props.counter.count}
        <button onClick={() => props.addCount()} >add</button>
    </div>
  )
}

const mapStateToProps = (state) => ({counter: state.counter});

const mapDispatchToProps = (dispatch) => {
    return {
        addCount: () => dispatch({ type: "INCREMENT_COUNT"})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Hello);