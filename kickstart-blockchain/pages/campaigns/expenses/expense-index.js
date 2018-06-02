import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import {Utils} from '../../../ethereum/utils';
import { Link } from '../../../routes';
import {CampaignService} from '../../../ethereum/CampaignService';

class ExpenseIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;

        const expenses = await CampaignService.getExpensesRequest(address);
        console.log('________________________');
        console.log(expenses);
        console.log('________________________');
        return { address, expenses };
    }
    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <h3>Expenses</h3>

                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>Id</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                </Table>

                <Link route={`/campaigns/${this.props.address}/expenses/new`}>
                    <a><Button primary>Add Expense</Button></a>
                </Link>
            </Layout>
        );
    }
}

export default ExpenseIndex;