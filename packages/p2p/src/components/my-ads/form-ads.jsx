import React, { Component, Fragment } from 'react';
import PropTypes                 from 'prop-types';
import { localize, Localize }              from 'deriv-translations';
import { Formik, Field, Form }   from 'formik';
import { Autocomplete, Loading, Input, Button, ThemedScrollbars } from 'deriv-components';
import { WS }                    from '../../utils/websocket';
import IconBack                  from '../../assets/icon-back.jsx';

class FormAds extends Component {
    state = {
        initial_values: {
            country        : '',
            currency       : '',
            type           : '',
            asset          : '',
            fix_price      : '',
            amount         : '',
            min_transaction: '',
            payment_method : '',
            advertiser_note: '',
        },
        residence_list: [],
        is_loading    : true,
    }

    componentDidMount() {
        WS().send({ 'residence_list': 1 }).then((response) => {
            this.setState({
                residence_list: response.residence_list,
            });
            // TODO: call api to populate country, currency, and asset


            if (this.props.ad_id) {
                // call the api, get the file based on id
                // populate the state from the respnose
            } else {
                this.setState({ is_loading: false });
            }
    
        });
    }
    handleSubmit(formik_vars) {
        console.log(formik_vars);
    }

    render() {
        return <Fragment>
            <div className='my-ads__heading--wrapper'>
                <div onClick={() => this.props.handleShowForm(false)} className='my-ads__heading--btn'>
                    <IconBack />
                </div>
                <h2>Create new ad</h2>
            </div>
            {this.state.is_loading ? <Loading is_fullscreen={false} /> : (
                <Formik initialValues={{...this.state.initial_values}} onSubmit={this.handleSubmit} validate={this.validateFormAds}>
                    {({
                        isSubmitting,
                        errors,
                        touched,
                        setFieldValue,
                    }) => (
                        <div className='my-ads__form'>
                            <Form noValidate>
                                <ThemedScrollbars
                                    autoHide
                                    style={{ height: 'calc(520px - 70px)' }} // height of container minus height of modal footer container
                                >
                                    <div className='my-ads__form--container'>
                                        <Field name='country'>
                                            {({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    data-lpignore='true'
                                                    autoComplete='new-password'
                                                    type='text'
                                                    className='my-ads__form--field'
                                                    label={localize('Country')}
                                                    required
                                                    list_items={this.state.residence_list}
                                                    disabled
                                                    onItemSelection={
                                                        ({ value, text }) => setFieldValue('country', value ? text : '', true)
                                                    }
                                                />
                                            )}
                                        </Field>
                                        <Field name='currency'>
                                            {({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    data-lpignore='true'
                                                    autoComplete='off'
                                                    type='text'
                                                    className='my-ads__form--field'
                                                    label={localize('Currency')}
                                                    required
                                                    disabled
                                                    list_items={this.state.residence_list}
                                                    onItemSelection={
                                                        ({ value, text }) => setFieldValue('currency', value ? text : '', true)
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </div>
                                    <div className='my-ads__form--container'>
                                        <Field name='type'>
                                            {({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    data-lpignore='true'
                                                    autoComplete='off'
                                                    type='text'
                                                    error={touched.type && errors.type}
                                                    className='my-ads__form--field'
                                                    label={localize('Type')}
                                                    required
                                                    list_items={this.state.residence_list}
                                                    onItemSelection={
                                                        ({ value, text }) => setFieldValue('type', value ? text : '', true)
                                                    }
                                                />
                                            )}
                                        </Field>
                                        <Field name='asset'>
                                            {({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    data-lpignore='true'
                                                    autoComplete='off'
                                                    type='text'
                                                    error={touched.asset && errors.asset}
                                                    className='my-ads__form--field'
                                                    label={localize('Asset')}
                                                    required
                                                    list_items={this.state.residence_list}
                                                    onItemSelection={
                                                        ({ value, text }) => setFieldValue('asset', value ? text : '', true)
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </div>
                                    <div className='my-ads__form--container'>
                                        <Field name='fix_price'>
                                            {({ field }) => (
                                                <Input
                                                    {...field}
                                                    data-lpignore='true'
                                                    type='number'
                                                    error={touched.fix_price && errors.fix_price}
                                                    label={localize('Fixed price')}
                                                    className='my-ads__form--field'
                                                    required
                                                />
                                            )}
                                        </Field>
                                        <Field name='amount'>
                                            {({ field }) => (
                                                <Input
                                                    {...field}
                                                    data-lpignore='true'
                                                    type='number'
                                                    error={touched.amount && errors.amount}
                                                    label={localize('Amount')}
                                                    className='my-ads__form--field'
                                                    required
                                                />
                                            )}
                                        </Field>
                                    </div>
                                    <Field name='min_transaction'>
                                        {({ field }) => (
                                            <Input
                                                {...field}
                                                data-lpignore='true'
                                                type='number'
                                                error={touched.min_transaction && errors.min_transaction}
                                                label={localize('Min. transaction')}
                                                className='my-ads__form--field my-ads__form--field-single'
                                                required
                                            />
                                        )}
                                    </Field>
                                    <Field name='payment_method'>
                                        {({ field }) => (
                                            <Autocomplete
                                                {...field}
                                                data-lpignore='true'
                                                autoComplete='off'
                                                type='text'
                                                error={touched.payment_method && errors.payment_method}
                                                className='my-ads__form--field my-ads__form--field-single'
                                                label={localize('Payment method')}
                                                required
                                                list_items={this.state.residence_list}
                                                onItemSelection={
                                                    ({ value, text }) => setFieldValue('payment_method', value ? text : '', true)
                                                }
                                            />
                                        )}
                                    </Field>
                                    <Field name='advertiser_note'>
                                        {({ field }) => (
                                            <Input
                                                {...field}
                                                data-lpignore='true'
                                                type='textarea'
                                                error={touched.advertiser_note && errors.advertiser_note}
                                                label={localize('Advertiser notes')}
                                                className='my-ads__form--field my-ads__form--field-textarea'
                                                required
                                            />
                                        )}
                                    </Field>
                                </ThemedScrollbars>
                                <div className='my-ads__form--footer'>
                                    <Button secondary large type='reset'>{localize('Cancel')}</Button>
                                    <Button primary large>{localize('Post ad')}</Button>
                                </div>
                            </Form>
                        </div>
                    )}

                </Formik>
            )}
        </Fragment>;
    }

    validateFormAds = (values) => {
        const available_price = 0.8; // later get available amount from the api
        const validations = {
            type: [
                v => !!v,
            ],
            asset: [
                v => !!v,
            ],
            fix_price: [
                v => !!v,
            ],
            amount: [
                v => !!v,
                v => v > available_price,
            ],
            min_transaction: [
                v => !!v,
            ],
            payment_method: [
                v => !!v,
            ],
            advertiser_note: [
                v => !!v,
                v => v.length < 400,
            ],
        };

        const mappedKey = {
            type           : localize('Type'),
            asset          : localize('Asset'),
            fix_price      : localize('Fixed price'),
            amount         : localize('Amount'),
            min_transaction: localize('Min. transaction'),
            payment_method : localize('Payment method'),
            advertiser_note: localize('Advertiser note'),
        };

        const common_messages  = [
            '{{field_name}} is required',
        ];

        const amount_messages = [
            '{{field_name}} is required',
            '{{field_name}} is too low',
        ];

        const note_messages = [
            '{{field_name}} is required',
            '{{field_name}} has exceed maximum length',
        ];

        const errors    = {};

        Object.entries(validations)
            .forEach(([key, rules]) => {
                const error_index = rules.findIndex(v => !v(values[key]));

                if (error_index !== -1) {
                    switch (key) {
                        case 'amount':
                            errors[key] = errors[key] = <Localize
                                i18n_default_text={amount_messages[error_index]}
                                values={{
                                    field_name: mappedKey[key],
                                }}
                            />;
                            break;
                        case 'advertiser_note':
                            errors[key] = errors[key] = <Localize
                                i18n_default_text={note_messages[error_index]}
                                values={{
                                    field_name: mappedKey[key],
                                }}
                            />;
                            break;
                        default:
                            errors[key] = errors[key] = <Localize
                                i18n_default_text={common_messages[error_index]}
                                values={{
                                    field_name: mappedKey[key],
                                }}
                            />;
                    }
                }
            });

        return errors;
    };
}

FormAds.propTypes = {
    ad_id         : PropTypes.string,
    handleShowForm: PropTypes.func
};
 
export default FormAds;
