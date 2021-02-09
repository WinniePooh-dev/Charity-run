import React, { Fragment } from "react";
import Portal from "./portal";
import classNames from "classnames";

import './styles.scss';

export default function Modal(View) {
    return class extends View {
        className = classNames({
            'modal': this.props.modal
        });
        render() {
            const { show, modal } = this.props;
            if (modal) {
                return (
                    <Fragment>
                        { show &&
                            <Portal>
                                <div className={this.className}>
                                    { super.render() }
                                </div>
                            </Portal>
                        }
                    </Fragment>
                )
            }
            return (
                <Fragment>
                    <div className={this.className}>
                        { super.render() }
                    </div>
                </Fragment>
            )
        }
    }
}