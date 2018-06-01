import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
    return (
        <div align="center" style={{ marginTop: '15px'}}>
            <Header as='h1' style={{ marginTop: '15px', marginBottom: '20px'}}>CrowdCoin - Crowd Funding Blockchain - Ethereum based!</Header>
            <Menu style={{ marginTop: '15px', marginBottom: '20px' }}>
                <Link route="/"><a className="item">CrowdCoin</a></Link>
                <Menu.Menu position="right">
                    <Link route="/"><a className="item">Campaigns</a></Link>
                    <Link route="/campaigns/new"><a className="item">+</a></Link>
                </Menu.Menu>
            </Menu>
        </div>
    );
};