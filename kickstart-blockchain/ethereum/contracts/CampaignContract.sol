pragma solidity ^0.4.17;

contract CampaignFactoryContract {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum, string name) public {
        address campaign = new CampaignContract(minimum, name, msg.sender); //will deploy a new CampaignContract
        deployedCampaigns.push(campaign);
    }
    
    function getDeployedCampaigns() public view returns(address[]) {
        return deployedCampaigns;
    }
}

contract CampaignContract {
    
    struct Expense {
        string description;
        uint value;
        address recipient;
        bool complete;
        mapping(address => bool) approvals;
        uint approvalCount;
    }
    
    //Storages variables
    address public manager;
    uint public minimumContribution;
    string public projectName;
    mapping(address => bool) public approvers;
    uint public totalRaised;
    Expense[] public expensesRequests;
    uint public approversCount;

    function CampaignContract(uint minimum, string name, address creator) public {
        manager = creator; 
        minimumContribution = minimum;
        projectName = name;
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        
        totalRaised = totalRaised + msg.value;
        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount++;
        }
    }
    
    function createExpenseRequest(string description, uint value, address recipient) public restricted {
        Expense memory expenseRequest = Expense({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        }) ;
        
        //Expense expenseRequest = Expense(description, value, recipient, false);
        
        expensesRequests.push(expenseRequest);
    }
    
    function approveExpense(uint expenseId) public {
        Expense storage expense = expensesRequests[expenseId];
        require(approvers[msg.sender]);
        require(!expense.approvals[msg.sender]);
        
        expense.approvals[msg.sender] = true;
        expense.approvalCount++;
    }
    
    function finalizeExpense(uint expenseId) public restricted {
        Expense storage expense = expensesRequests[expenseId];
        
        require(expense.approvalCount > (approversCount / 2));
        require(!expense.complete);
        
        expense.recipient.transfer(expense.value);
        expense.complete = true;
    }

    function getCampaignDetail() public view returns(
        uint, uint, uint, uint, address, string
        ) {
        return (
            minimumContribution,
            this.balance,
            expensesRequests.length,
            approversCount,
            manager,
            projectName
        );
    }

    function getRequestsCount() public view returns (uint) {
        return expensesRequests.length;
    }
    
}