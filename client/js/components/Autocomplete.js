import React from 'react';
import Autosuggest from 'react-autosuggest';

import TextHighlight from './TextHighlight';

import datasets, { data, related, idx } from '../datasets';

export default React.createClass({
    displayName: 'Autocomplete',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        className: React.PropTypes.string,
        required: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        placeholder: React.PropTypes.string,
        autoComplete: React.PropTypes.string,
    },

    getDefaultProps() {
        return {
            className: '',
            required: false,
            disabled: false,
            placeholder: null,
            autoComplete: 'search',
        };
    },

    getInitialState() {
        return {
            suggestions: [
                {
                    title: 'Related datasets',
                    suggestions: related,
                },
                {
                    title: 'All datasets',
                    suggestions: data,
                },
            ],
            value: '',
        };
    },

    componentDidMount() {
        setTimeout(() => {
            document.querySelector('#autocomplete[type="text"]').focus();
        }, 100);
    },

    getSuggestionValue(suggestion) {
        return suggestion.label;
    },

    shouldRenderSuggestions() {
        return true;
    },

    handleChange(e, change) {
        if (['enter', 'click'].indexOf(change.reason) === -1) {
            const value = change.newValue;

            this.setState({
                value: value,
            });
        }
    },

    handleSuggestionUpdateRequest(update) {
        if (['enter', 'click'].indexOf(update.reason) === -1) {
            const results = idx.search(update.value);

            this.setState({
                suggestions: [
                    {
                        title: 'Related datasets',
                        suggestions: results.length === 0 ? related : related.filter(dat => results.some(res => res.ref === dat.id)),
                    },
                    {
                        title: 'All datasets',
                        suggestions: results.length === 0 ? data : results.map(result => datasets[result.ref]),
                    },
                ],
            });
        }
    },

    handleSuggestionSelected(e, selection) {
        this.props.onUpdate(selection.suggestion);
    },


    renderSuggestion(suggestion, { value, valueBeforeUpDown }) {
        return (
            <p>
                {value !== suggestion.label && valueBeforeUpDown !== '' ? (
                    <TextHighlight highlight={valueBeforeUpDown || value} text={suggestion.label}/>
                ) :(
                    <span>{suggestion.label}</span>
                )}
            </p>
        );
    },

    renderSectionTitle(section) {
        return (
            <strong>{section.title}</strong>
        );
    },

    getSectionSuggestions(section) {
        return section.suggestions;
    },

    render() {
        const { name } = this.props;
        const { suggestions, value } = this.state;

        return (
            <Autosuggest
                id='auto'
                suggestions={suggestions}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                onSuggestionsUpdateRequested={this.handleSuggestionUpdateRequest}
                onSuggestionSelected={this.handleSuggestionSelected}
                shouldRenderSuggestions={this.shouldRenderSuggestions}
                focusInputOnSuggestionClick={false}
                renderSectionTitle={this.renderSectionTitle}
                getSectionSuggestions={this.getSectionSuggestions}
                multiSection={true}
                inputProps={{
                    ref: 'field',
                    type: 'text',
                    id: 'autocomplete',
                    name: name,
                    className: 'react-autosuggest__input',
                    onChange: this.handleChange,
                    value: value,
                }}
            />
        );
    },
});
