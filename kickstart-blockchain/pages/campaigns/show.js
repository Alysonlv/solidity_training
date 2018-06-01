import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import {CampaignDetails} from '../../ethereum/CampaignDetails';
import web3 from '../../ethereum/web3';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        var address = props.query.address;
        const campaign = await CampaignDetails.getCampaignDetails(address);
        
        return {campaign};
    }

    renderCards() {
        const items = [
            {
                header: this.props.campaign.manager,
                meta: 'Address of Manager',
                description: 'The Manager created this campaign.',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: this.props.campaign.minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: this.props.campaign.expensesRequestsCount,
                meta: 'Number of expenses request launched for the project',
                description: 'An expense request tries to withdraw money from the contract. The request must be approved by approvers.',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: this.props.campaign.approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to the campaign.',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: web3.utils.fromWei(this.props.campaign.balance, 'ether'),
                meta: 'Balance of the Contract (ether)',
                description: 'The balance is how much money this campaign has to spent.',
                style: { overflowWrap: 'break-word'}
            }
        ];

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h3 align="center">{this.props.campaign.projectName} Campaign!</h3>
                {this.renderCards()}
            </Layout>
        );
    }
}

export default CampaignShow;