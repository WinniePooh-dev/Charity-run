import React, { Fragment } from "react";
import Portal from "./portal";

import './styles.scss';

export default function Modal(View) {
    return class extends View {
        render() {
            const { show } = this.props;
            return (
                <Fragment>
                    { show &&
                        <Portal>
                            <div className={'modal'}>
                                { super.render() }
                            </div>
                        </Portal>
                    }
                </Fragment>
            )
        }
    }
}