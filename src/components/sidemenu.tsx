import React, { useState } from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Automated Virtual System', '1', <PieChartOutlined />),
    getItem('Natural Language Processing', '2', <DesktopOutlined />),
    getItem('Image Recognition', '3', <ContainerOutlined />),

    getItem('Deep learning', 'sub1', <MailOutlined />, [
        getItem('Generative Adversarial Networks', '5'),
        getItem('Autoencoders', '6'),
        getItem('Transfer Learning', '7'),
        getItem('Deep Reinforcement Learning', '8'),
    ]),

    getItem('Quantum Machine Learning', 'sub2', <AppstoreOutlined />, [
        getItem('Quantum Generative Models', '9'),
        getItem('Quantum Support Vector Machines (QSVM)', '10'),

        getItem('Robotics', 'sub3', null, [getItem('Human-Robot Interaction (HRI)', '11'), getItem('Bio-Inspired Robotics', '12')]),
    ]),
];

const SideMenu: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const sideMenuWidth = collapsed ? 80 : 256;

    return (
        <div style={{ width: sideMenuWidth, transition: 'width 0.3s', overflowX: 'hidden', backgroundColor: 'white' }} className='side-menu'>
            <Button type="primary" onClick={toggleCollapsed} style={{ width: sideMenuWidth, borderRadius: 0, backgroundColor: 'black', marginBottom: 8 }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                style={{ height: '100vh' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    );
};

export {}

export default SideMenu;