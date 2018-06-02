import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import {CampaignService} from '../ethereum/CampaignService';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        successMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: '', successMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();
            await CampaignService.contribute(this.props.address, accounts[0], this.state.value);

            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch(err) {
            let msg = err.message.split('.');
            this.setState({ errorMessage: msg[0] });
            console.error(err.message);
        }

        if (this.state.errorMessage === '') {
            this.setState({successMessage: 'We have received your contribution. Thank you!'});
            setInterval(
                function() {
                },
                3000
            );
        } 

        this.setState({loading: false, value: ''});
        
    }

    render () {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.successMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input label="ether" labelPosition="right"
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})}
                    />
                </Form.Field>

                <Message error header="Oops! Something went wrong. :(" content={this.state.errorMessage} />
                <Message success header="Awesome! :)" content={this.state.successMessage} />
                <Button primary loading={this.state.loading}>Contribute</Button>
            </Form>
        );
    }
}

export default ContributeForm;