import React, {Component} from 'react';
import {Card, Button} from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

import {CampaignService} from '../ethereum/CampaignService';

class CampaignIndex extends Component {
    static async getInitialProps() {
        //var campaignAddresses = await factory.methods.getDeployedCampaigns().call();
        var p = CampaignService.getSummary();

        const campaigns = await p.then(function(result) {
            return result;
        });

        return {campaigns};
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(
            (item) => {
                return {
                    header: item.projectName,
                    description: <Link route={`/campaigns/${item.address}`}><a>View Campaing</a></Link>,
                    meta: item.address,
                    fluid: true
                }
            }
        );

        return <Card.Group items={items} />;
    }
    
    render() {
        return (
            <Layout>
                <div>
                    <h3>Open Campaings</h3>
                    <Link route="/campaigns/new">
                        <a><Button floated="right" content="Create Campaing" icon="add circle" primary /></a>
                    </Link>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        );
    }
}

export default CampaignIndex;