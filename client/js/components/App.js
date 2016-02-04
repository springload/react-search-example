import React from 'react';

import ModalTrigger from './ModalTrigger';
import Autocomplete from './Autocomplete';
import ExampleChart from './ExampleChart';

import datasets from '../datasets';

export default React.createClass({
    displayName: 'App',

    getInitialState() {
        return {
            datasetOne: datasets['270'],
            datasetTwo: datasets['49'],
        };
    },

    updateOne(dataset) {
        this.setState({
            datasetOne: dataset,
        });
    },

    updateTwo(dataset) {
        this.setState({
            datasetTwo: dataset,
        });
    },

    render() {
        const { datasetOne, datasetTwo } = this.state;
        return (
            <div className="app">
                <div>
                    <ModalTrigger id="blue" modalTitle="" label={`Blue: ${datasetOne.label}`} isOpen={false}>
                        <h3>Comparing <br />{datasetTwo.label}<br /> to:</h3>
                        <Autocomplete name="autocomplete" onUpdate={this.updateOne}/>
                    </ModalTrigger>
                    <ModalTrigger id="red" modalTitle="" label={`Red: ${datasetTwo.label}`} isOpen={false}>
                        <h3>Comparing <br />{datasetOne.label}<br /> to:</h3>
                        <Autocomplete name="autocomplete" onUpdate={this.updateTwo}/>
                    </ModalTrigger>
                    <ExampleChart data={[datasetOne.data, datasetTwo.data]}/>
                </div>
            </div>
        );
    },
});
