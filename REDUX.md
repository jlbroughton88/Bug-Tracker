# Action creators
Functions that create actions, or simply return them.

# Actions
Payloads of information which send data to the store.
Return an object that can contain 2 keys, type and payload.
Default case is necessary for the event that an action type does not exist to prevent from breaking.

# Store
Holds application state
Allows access to state via getState(). This method returns the current state tree of the app.
Allows state to e updated via dispatch(action). The dispatch method "dispatches" an action, consequently triggering a state change.
Registers listeners via subscribe(listener) . The subscribe(listener) adds a change listener.
Handles unregistering of listeners via the function returned by subscript(listener).
Note: A redux application only needs one store.

# Reducers
These describe how the application state changes with respect to actions dispatched to the redux store.

# Provider
Gives redux store access to the application.
Takes store and children as props.
Calling configureStore() from src/store.js creates the redux store, which is passed as props to Provider.
React binding from react-redux.

# Connect react component to store
This will be done using the connect react binding from react-redux.
connect() takes in 2 parameters: mapStateToProps and mapDispatchToProps.
    - mapStateToProps allows React component to subscribe to redux state updates.
    - mapDispatchToProps can either be:
        1. An object of action creators wrapped into a dispatch.
        2. A function with a dispatch parameter. The function should return an object that uses dispatch to bind action creators. 
           Alternatively, you can use the bindActionCreators() helpter from redux.
    - Passing these as connect parameters merges the action creators and store updates to the components props.