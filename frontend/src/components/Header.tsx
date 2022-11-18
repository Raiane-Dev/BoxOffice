import React, { useState } from 'react';
import { Row, Layout, Menu, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    HeatMapOutlined, HomeOutlined, MacCommandOutlined,
    TeamOutlined, AimOutlined, FieldTimeOutlined,
    HeartOutlined, CloudDownloadOutlined, FileImageOutlined,
    MessageOutlined, CodeSandboxOutlined, ShareAltOutlined,
    SettingOutlined, QuestionCircleOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { Title, Paragraph } = Typography;

function _Header(): any
{
    const [collapsed, setCollapsed] = useState(false);
    const navigate: any = useNavigate();

    const [state, setState]: any = useState({ current: '' });

    const onClick: MenuProps['onClick'] = e => {
        setState({
            current: e.key,
        });
      
        navigate(`/${e.key}`);
    };

    return(
        <>
            <Sider
                collapsible
                trigger={null}
                width={300}
            >
                <Row
                    align='middle'
                    justify='space-between'
                    className='logo'
                >
                    <HeatMapOutlined />
                    <Title level={3}>
                        _RaianeDev
                    </Title>
                </Row>
                <Row align='middle' justify='space-between'>
                    <Menu
                        theme='dark'
                        defaultSelectedKeys={['1']}
                        mode='inline'
                        className='row-icons'
                    >
                        <Menu.Item key='t'>
                            <MacCommandOutlined />
                        </Menu.Item>
                        <Menu.Item key='t'>
                            <MessageOutlined />
                        </Menu.Item>
                        <Menu.Item key='t'>
                            <CodeSandboxOutlined />
                        </Menu.Item>
                        <Menu.Item key='t'>
                            <ShareAltOutlined />
                        </Menu.Item>
                        <Menu.Item key='t'>
                            <SettingOutlined />
                        </Menu.Item>
                        <Menu.Item key='t'>
                            <QuestionCircleOutlined />
                        </Menu.Item>
                        <Menu.Item key='t'>
                            <MacCommandOutlined />
                        </Menu.Item>
                    </Menu>
                    <Menu
                        theme='dark'
                        selectedKeys={[state.current]}
                        mode='inline'
                        onClick={onClick}
                        className='row-items'
                    >
                        <Menu.Item>
                            <Paragraph>Menu</Paragraph>
                        </Menu.Item>
                        <Menu.Item key=''>
                            <HomeOutlined />
                            <Title level={5}>Home</Title>
                        </Menu.Item>
                        <Menu.Item key='create'>
                            <AimOutlined />
                            <Title level={5}>Create</Title>
                        </Menu.Item>
                        <Menu.Item key='artists'>
                            <TeamOutlined />
                            <Title level={5}>Artists</Title>
                        </Menu.Item>
                        <br /> <br />
                        <Menu.Item>
                            <Paragraph>Library</Paragraph>
                        </Menu.Item>
                        <Menu.Item key='wached'>
                            <FieldTimeOutlined />
                            <Title level={5}>Wached</Title>
                        </Menu.Item>
                        <Menu.Item key='favorit'>
                            <HeartOutlined />
                            <Title level={5}>Favorit</Title>
                        </Menu.Item>
                        <Menu.Item key='downloads'>
                            <CloudDownloadOutlined />
                            <Title level={5}>Downloads</Title>
                        </Menu.Item>
                        <br /> <br />
                        <Menu.Item>
                            <Paragraph>Social</Paragraph>
                        </Menu.Item>
                        <Menu.Item key='friends'>
                            <TeamOutlined />
                            <Title level={5}>Friends</Title>
                        </Menu.Item>
                        <Menu.Item key='gallery'>
                            <FileImageOutlined />
                            <Title level={5}>Gallery</Title>
                        </Menu.Item>
                        <Menu.Item key='talkforum'>
                            <MessageOutlined />
                            <Title level={5}>Talkforum</Title>
                        </Menu.Item>
                    </Menu>
                </Row>
            </Sider>
        </>
    );
}

export default _Header;