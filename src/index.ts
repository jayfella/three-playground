import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Root } from './root';

function main() {
    ReactDOM.render(
        React.createElement(Root),
        document.getElementById('app')
    );
}

main();
