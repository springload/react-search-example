import React, { PropTypes } from 'react';
import $ from 'jquery';
import Modal from 'react-modal';

// Necessary for the modals to work.
Modal.setAppElement(document.getElementById('mount'));

/**
 * A generic modal. Handles common affordances & styles.
 */
export default React.createClass({
    displayName: 'Modal',

    propTypes: {
        title: PropTypes.string.isRequired,
        iconName: PropTypes.string,
        children: PropTypes.any.isRequired,
        isOpen: PropTypes.bool.isRequired,
        closeCallback: PropTypes.func.isRequired,
    },

    componentDidMount() {
        $(document).on('keyup', this.onDocumentKeyUp);
        $(document).on('click', this.onDocumentClick);
    },

    onDocumentKeyUp(e) {
        const ESC = 27;

        if (e.keyCode === ESC) {
            this.props.closeCallback(e);
        }
    },

    onDocumentClick(e) {
        const $target = $(e.target);
        const isOverlay = $target.is('.ReactModal__Overlay');
        const isModal = $target.is('.ReactModal__Content');
        const isInModal = $target.parents('.ReactModal__Content').size() !== 0;

        if (isOverlay && !isModal && !isInModal) {
            this.props.closeCallback(e);
        }
    },

    render() {
        const { title, children, isOpen, closeCallback } = this.props;

        return (
            <Modal key={title} isOpen={isOpen} closeTimeoutMS={1} onRequestClose={() => {}}>
                <div className="modal modal__center">
                    <div className="modal__header [ grid grid-auto ]">
                        <div className="three-quarters"></div>
                        <button className="btn modal__close one-quarter" onClick={closeCallback}>
                            Close
                        </button>
                    </div>
                    <div className="modal__content">
                        {children}
                    </div>
                </div>
            </Modal>
        );
    },

    componentWillUnmount() {
        $(document).off('keyup', this.onDocumentKeyUp);
        $(document).off('click', this.onDocumentClick);
    },
});
