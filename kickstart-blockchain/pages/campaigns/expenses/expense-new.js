import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import {Utils} from '../../../ethereum/utils';
import { Link, Router } from '../../../routes';
import {CampaignService} from '../../../ethereum/CampaignService';

class ExpenseNew extends Component {
    state = {
        errorMessage: '',
        successMessage: '',
        loading: false,

        value: '',
        description: '',
        recipient: ''
    }

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
    }

    onSubmit = async event => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '', successMessage: ''});

        try {
            const accounts = await Utils.getAccounts();
            await CampaignService.addExpenseRequest(this.props.address,
                accounts[0], 
                this.state.description, 
                this.state.value, 
                this.state.recipient);
            
            Router.pushRoute('/campaigns/${this.props.address}/expenses');
        } catch(err) {
            let msg = err.message.split('.');
            this.setState({ errorMessage: msg[0] });
            console.error(err.message);
        }

        if (this.state.errorMessage === '') {
            this.setState({successMessage: 'Expense request created with success!'});
        }
        this.setState({loading: false});
    }

    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/expenses`}>
                    Back
                </Link>
                <h3>Create a new Expense</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.successMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                            value={this.state.description}
                            onChange={ event => this.setState({description: event.target.value })} />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input label="ether" labelPosition= "right" 
                            value={this.state.value}
                            onChange={ event => this.setState({value: event.target.value })} />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input 
                            value={this.state.recipient}
                            onChange={ event => this.setState({recipient: event.target.value })} />
                    </Form.Field>

                    <Message error header="Oops! Something went wrong. :(" content={this.state.errorMessage} />
                    <Message success header="Ok! :)" content={this.state.successMessage} />
                    <Button primary loading={this.state.loading}>Create Expense</Button>
                </Form>
            </Layout>
        );
    }
}

export default ExpenseNew;