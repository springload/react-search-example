import React, { PropTypes } from 'react';

import Modal from '../components/Modal';

/**
 * A generic modal trigger: button, modal, and state.
 */
export default React.createClass({
    displayName: 'ModalTrigger',

    propTypes: {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        className: PropTypes.string,
        iconName: PropTypes.string,
        modalTitle: PropTypes.string.isRequired,
        children: PropTypes.any.isRequired,
        isOpen: PropTypes.bool,
    },

    getDefaultProps() {
        return {
            isOpen: false,
            className: 'btn btn--block',
        };
    },

    getInitialState() {
        return {
            isOpen: this.props.isOpen,
        };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            isOpen: nextProps.isOpen,
        });
    },

    onToggleModal(isOpen, e) {
        this.toggleModal(isOpen);

        e.preventDefault();
    },

    toggleModal(isOpen = !this.state.isOpen) {
        this.setState({
            isOpen: isOpen,
        });
    },

    render() {
        const { id, className, iconName, label, modalTitle, children } = this.props;
        const { isOpen } = this.state;

        return (
            <div>
                <button id={id} className={className} onClick={this.onToggleModal.bind(this, true)}>
                    {label}
                </button>
                <Modal
                    title={modalTitle}
                    iconName={iconName}
                    isOpen={isOpen}
                    closeCallback={this.onToggleModal.bind(this, false)}
                >
                    {children}
                </Modal>
            </div>
        );
    },
});
