import React from 'react';


// PURE React component (function)
const App = (props) => { // takes component properties, returns JSX that gets converted into React.createLement() by babelify
    return (<div className='app'>
		{props.children}

	</div>);

};

export default App;