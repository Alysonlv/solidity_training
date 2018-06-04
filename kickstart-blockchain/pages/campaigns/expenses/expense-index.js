import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import {Utils} from '../../../ethereum/utils';
import { Link } from '../../../routes';
import {CampaignService} from '../../../ethereum/CampaignService';
import ExpenseRow from '../../../components/ExpenseRow';

class ExpenseIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;

        const requests = await CampaignService.getExpensesRequest(address);
        const expenses = requests.expenses;
        const expensesCount = requests.expensesCount;

        const approversCount = await CampaignService.getApprovers(address);
        return { address, expenses, expensesCount, approversCount };
    }

    renderRow() {
        return this.props.expenses.map((expense, index) => {
            return <ExpenseRow key={index} id={index} expense={expense} address={this.props.address} approversCount={this.props.approversCount} />
        });
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <h3>Expenses</h3>

                <Link route={`/campaigns/${this.props.address}/expenses/new`}>
                    <a>
                        <Button primary floated="right" style={{ marginBottom: 10 }}>Add Expense</Button>
                    </a>
                </Link>

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

                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>

                <div>Found {this.props.approversCount} expense(s)</div>
            </Layout>
        );
    }
}

export default ExpenseIndex;