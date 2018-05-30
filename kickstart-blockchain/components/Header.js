import React from 'react';
import { Menu, Header } from 'semantic-ui-react';

export default () => {
    return (
        <div align="center" style={{ marginTop: '15px'}}>
            <Header as='h1' style={{ marginTop: '15px', marginBottom: '20px'}}>CrowndFunding Blockchain - Ethereum based!</Header>
            <Menu style={{ marginTop: '15px' }}>
                <Menu.Item>
                        CrowdCoin
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                            Campaigns
                    </Menu.Item>

                    <Menu.Item>
                            +
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    );
};