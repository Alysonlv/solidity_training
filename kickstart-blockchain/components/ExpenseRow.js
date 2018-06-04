import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Utils } from '../ethereum/utils';
import { CampaignService } from '../ethereum/CampaignService';
import { Link, Router } from '../routes';

class ExpenseRow extends Component {
    state = {
        status: true,
        loadingApprove: false,
        loadingFinalize: false
    }

    onApproveExpense = async () => {
        this.setState({ loadingApprove: true, status: true });
        try {
            await CampaignService.approveExpense(this.props.address, this.props.id);
        } catch(err) {
            let msg = err.message.split('.');
            alert(msg[0]);
            console.error(err.message);
            this.setState({ status: false});
        }
        console.log('status = ' + this.state.status);
        if (this.state.status) {
            alert('Expense approved. Thank you!');
        }
        this.setState({ loadingApprove: false});
        Router.pushRoute('/campaigns/${this.props.address}/expenses');
    }

    onFinalizeExpense= async () => {
        this.setState({ loadingFinalize: true, status: true });

        try {
            await CampaignService.finalizeExpense(this.props.address, this.props.id);
        } catch(err) {
            let msg = err.message.split('.');
            alert(msg[0]);
            this.setState({ status: false});
        }

        console.log('status = ' + this.state.status);
        if (this.state.status) {
            alert('Expense finalized. Thank you!');
        }
        this.setState({ loadingFinalize: false});
        Router.pushRoute('/campaigns/${this.props.address}/expenses');
    }

    render() {
        const { Row, Cell } = Table;
        const { id, expense, approversCount } = this.props;
        const readyToFinalize = expense.approvalCount > approversCount/2;
        
        return (
            <Row disabled={expense.complete} positive={readyToFinalize && !expense.complete}>
                <Cell>{id}</Cell>
                <Cell>{expense.description}</Cell>
                <Cell>{Utils.fromWei(expense.value)}</Cell>
                <Cell>{expense.recipient}</Cell>
                <Cell>{expense.approvalCount}/{approversCount}</Cell>
                <Cell>
                    {expense.complete || (approversCount === expense.approvalCount) ? null : (
                        <Button color="green" basic onClick={this.onApproveExpense} loading={this.state.loadingApprove}>Approve</Button>
                    )}
                </Cell>
                <Cell>
                    {expense.complete ? null : (
                        <Button color="teal" basic onClick={this.onFinalizeExpense} loading={this.state.loadingFinalize}>Finalize</Button>
                    )}
                </Cell>
            </Row>
        );
    }
}

export default ExpenseRow;