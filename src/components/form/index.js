import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import { Button } from '../button';
import moment from 'moment';
import Modal from '../modal';

import './styles.scss';

class Form extends Component {

    state = {
        fields: [],
        registration_date: '',
        errors: [],
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.form_fields !== this.props.form_fields) {
            this.setState({
                fields: this.props.form_fields ? this.props.form_fields[this.props.index] : []
            })
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        await this.setState({ errors: this.validate(), valid: false });
        if (!this.state.errors.length && !this.state.valid) {
            const { runners, onClose, modal } = this.props;
            const { fields, registration_date } = this.state;
            const item = {};
            for(let field of Object.values(fields)) {
                Object.assign(item, field.name)
            }
            this.props.onSubmit({id: runners.length + 1, ...item, registration_date});
            modal && onClose(false);
        }
        else {
            this.setState({
                valid: true
            })
        }
    }

    autoCompleteField = now => {
        this.setState({
            registration_date: now
        })
    }

    handleFieldChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let formField;
        this.state.fields.map((field) => {
            if (Object.keys(field.name).toString() === name) {
                formField = field;
            }
        })
        formField.name[name] = value;
        if (name === 'date_of_birth') {
            formField.name[name] = formField.name[name].split('-').reverse().join('.')
            return formField
        }
        this.setState( prevState => { return {fields: prevState.fields},
                                             {errors: prevState.errors
                                             .filter(error => Object.keys(error)
                                             .toString() !== name)} })
    }

    validate = () => {
        const { fields } = this.state;
        const errors = [];
        fields.map(field => {
            switch (Object.keys(field.name).toString()) {
                case 'email':
                    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!re.test(Object.values(field.name).toString())) {
                        errors.push({[Object.keys(field.name).toString()]: `incorrect email!`})
                    }
                    break;
                case 'phone':
                    const phone = /^\+?[\s\-\(\)0-9]{7,19}$/;
                    if (!phone.test(Object.values(field.name).toString())) {
                        errors.push({[Object.keys(field.name).toString()]: `invalid phone number!`})
                    }
                    break;
                case 'distance':
                    if (+Object.values(field.name) < 0) {
                        errors.push({[Object.keys(field.name).toString()]: `field can't be negative!`})
                    }
                    break;
                case 'payment':
                    if (+Object.values(field.name) < 0) {
                        errors.push({[Object.keys(field.name).toString()]: `field can't be negative!`})
                    }
                    break;
            
                default:
                    break;
            }
        })
        return errors;
    }

    render() {
        const fields = this.state.fields;
        const { onClose, label, action, modal, inline } = this.props;
        const renderClose = (modal ? (
            <h3>
                <span className={'close'} onClick={() => onClose(false)}>&times;</span>
                {this.props.title}
            </h3>
        ) : <Fragment/>)
        return (
            <form className={`${this.props.className && this.props.className} ${inline && 'inline'}`} onSubmit={this.handleSubmit}>
                {renderClose}
                {fields.map((field, key) => {
                    return <Field key={key} {...field} value={Object.values(field.name).toString()} errors={this.state.errors} options={field.options}
                                  answers={field.answers} handleFieldChange={this.handleFieldChange} autoCompleteField={this.autoCompleteField}/>
                })}
                <Button title={label} type={action}/>
            </form>
        )
    }
}

class Field extends Component {
    render() {
        const {type, label, value, name, handleFieldChange, autoCompleteField, errors, options, answers} = this.props;
        let content;
        switch (type) {
            case 'date':
                content = <Date type={type} name={Object.keys(name).toString()} handleFieldChange={handleFieldChange}/>
                break;
            case 'email':
                content = <Email value={value} type={type} error={errors.find(er => Object.keys(er).toString() === Object.keys(name).toString())}
                                 name={Object.keys(name).toString()} handleFieldChange={handleFieldChange}/>
                break;
            case 'phone':
                content = <Phone value={value} error={errors.find(er => Object.keys(er).toString() === Object.keys(name).toString())}
                                 name={Object.keys(name).toString()} handleFieldChange={handleFieldChange}/>
                break;
            case 'number':
                content = <Number type={type} error={errors.find(er => Object.keys(er).toString() === Object.keys(name).toString())}
                                  value={value} name={Object.keys(name).toString()} handleFieldChange={handleFieldChange}/>
                break;
            case 'disabled':
                content = <Disabled name={Object.keys(name).toString()} handleFieldChange={autoCompleteField}/>
                break;
            case 'select':
                content = <Select type={type} value={value} options={options} name={Object.keys(name).toString()} handleFieldChange={handleFieldChange}/>
                break;
            case 'radio':
                content = <Radio type={type} value={value} name={Object.keys(name).toString()} answers={answers} handleFieldChange={handleFieldChange}/>
                break;
            case 'text':
            default:
                content = <Text type={type} value={value} name={Object.keys(name).toString()} handleFieldChange={handleFieldChange}/>
                break;
        }
        return <>
            <label>{label}</label>
            {content}
        </>
    }
}

class Select extends Component {
    render() {
        const field = this.props;
        return (
            <select value={this.props.value ? this.props.value : null} name={field.name} onChange={e => this.props.handleFieldChange(e)}>
                <option selected disabled hidden>Choose here</option>
                {field.options.map((option, key) => {
                    if(typeof option === 'string') {
                        return <option key={key} value={option}>{option}</option>
                    }
                    else if (option instanceof Object && !Array.isArray(option)) {
                        return Object.values(option).map(({id, title, value}) => {
                            return <option key={id} value={value}>{title}</option>
                        })
                    }
                })}
            </select>
        )
    }
}

class Radio extends Component {
    render() {
        const field = this.props;
        return (
            <Fragment>
                {field.answers.map((answer, key) => {
                    console.log(answer)
                    return (
                        <label key={key} className={'radio-label'}>
                            <input type={this.props.type} name={this.props.name} checked={answer.value == this.props.value} value={answer.value}
                                   onChange={e => this.props.handleFieldChange(e)}/>
                            {answer.title}
                        </label>
                    )
                })}
            </Fragment>
        )
    }
}

class Date extends Component {
    render() {
        return <input required type={this.props.type} name={this.props.name} onChange={e => this.props.handleFieldChange(e)}/>
    }
}

class Text extends Component {
    render() {
        return <input required type={this.props.type} value={this.props.value} name={this.props.name} onChange={e => this.props.handleFieldChange(e)}/>
    }
}

class Email extends Component {
    render() {
        const { error, value, type, name, handleFieldChange } = this.props;
        return <input required type={type} placeholder={error ? Object.values(error).toString() : ''} value={error ? '' : value} className={error ? 'error' : ''}
                      name={name} onChange={e => handleFieldChange(e)}/>
    }
}

class Phone extends Component {
    render() {
        const { error, value, name, handleFieldChange } = this.props;
        return <input required type={'text'} placeholder={error ? Object.values(error).toString() : ''} value={error ? '' : value} className={error ? 'error' : ''}
                      name={name} onChange={e => handleFieldChange(e)}/>
    }
}

class Number extends Component {
    render() {
        const { error, value, name, handleFieldChange, type } = this.props;
        return <input required type={type} placeholder={error ? Object.values(error).toString() : ''} value={error ? '' : value} className={error ? 'error' : ''}
                      name={name} onChange={e => handleFieldChange(e)}/>
    }
}

class Disabled extends Component {
    state = {
        date: ''
    }
    tick = () => {
        const date = moment().format('DD MMM YYYY, H:mm:ss');
        this.setState({ date });
    }
    componentDidMount() {
        this.clock = setInterval(() => this.tick(), 1000);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.date !== this.state.date) {
            this.props.handleFieldChange(this.state.date.split(',').join(''));
        }
    }
    componentWillUnmount() {
        clearInterval(this.clock);
    }
    render() {
        const date = this.state;
        return <input required disabled value={Object.values(date)} name={this.props.name}/>
    }
}

const mapStateToProps = ({ runners, form_fields }) => {
    return { runners, form_fields }
}

export default connect(mapStateToProps, actions)(Modal(Form));