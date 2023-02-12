import React from "react";
import PropTypes from 'prop-types';

export const connect = (mapStateToProps, mapDispatchToProps) => Component => {
    class Connect extends React.Component {
        componentDidMount() { 
            this.context.store.subscribe(this.handleStoreChange.bind(this));
         }

         handleStoreChange() {
            this.forceUpdate();
         }

         render() {
            return <div>
                <Component 
                        {...this.props}
                        {...mapStateToProps(this.context.store.getState())}
                        {...mapDispatchToProps(this.context.store.dispatch)}
                    />
            </div>
         }
    }

    Connect.contextTypes = {
        store: PropTypes,
    }
    return Connect;
}