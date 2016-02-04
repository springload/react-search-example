import React from 'react';

import ModalTrigger from './ModalTrigger';

export default React.createClass({
    displayName: 'App',

    propTypes: {
        datasets: React.PropTypes.array.isRequired,
    },

    render() {
        const { datasets } = this.props;
        return (
            <div>
                <h1>react-search-example</h1>
                <ModalTrigger id="test" modalTitle="Hey there this is title speaking" label="Hey hey hey">
                    <ul>
                        {datasets.map((dataset) => {
                            return (
                                <li key={dataset.id}>{dataset.label}</li>
                            );
                        })}
                    </ul>
                </ModalTrigger>
            </div>
        );
    },
});
