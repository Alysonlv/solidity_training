import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        projectName: '',
        errorMessage: '',
        successMessage: '',
        loading: false
    }

    onSubmit = async () => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: '', successMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                    .createCampaign(this.state.minimumContribution, this.state.projectName)
                    .send({
                        from: accounts[0]
                    });

            Router.pushRoute('/');
        } catch (err) {
            let msg = err.message.split('.');
            this.setState({ errorMessage: msg[0] });
            console.error(err.message);
        }

        if (this.state.errorMessage === '') {
            this.setState({successMessage: 'Your campaign was created with success!'});
        }
        this.setState({loading: false});
    };

    render () {
        return (
            <Layout>
                <h3>Create a Campaign!</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.successMessage}>
                    <Form.Field>
                        <label>Campaign Name</label>
                        <Input value={this.state.projectName} 
                            onChange={event => this.setState({projectName: event.target.value})} />
                    </Form.Field>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input label="wei" labelPosition= "right"  
                            value={this.state.minimumContribution}
                            onChange={event => this.setState({minimumContribution: event.target.value})} />
                    </Form.Field>

                    <Message error header="Oops! Something went wrong. :(" content={this.state.errorMessage} />
                    <Message success header="Awesome! :)" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;