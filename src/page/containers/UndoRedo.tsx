import React from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect } from 'react-redux';

const UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }: any) => (
  <p>
    <button type="button" onClick={onUndo} disabled={!canUndo}>
      Undo
    </button>
    <button type="button" onClick={onRedo} disabled={!canRedo}>
      Redo
    </button>
  </p>
);

const mapStateToProps = (state: any) => ({
  canUndo: state.todos.past.length > 0,
  canRedo: state.todos.future.length > 0,
});

const mapDispatchToProps = {
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo,
};

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedo);
