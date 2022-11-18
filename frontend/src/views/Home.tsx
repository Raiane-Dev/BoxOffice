import { SearchOutlined } from '@ant-design/icons';
import { Image, Layout, Typography, Row, Button, Card } from 'antd';
import walp from "../assets/images/walp.jpg"
import _Header from '../components/Header';
import _Footer from '../components/Footer';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function Home(): any
{
    return (
        <>
            <_Header />

            <Layout className='root-content'>

                <Row align='middle' justify='space-between'>
                    <Title level={4}>
                        GoodNight User!
                    </Title>
                    <Button className='btn-icon npd'>
                        <SearchOutlined />
                    </Button>
                </Row>

                <Content className='items'>
                    <Row>
                        <Card className='box'>
                            <Image  src={walp} preview={false} />
                            <Row>
                                <Title level={4}>
                                    Monster
                                </Title>
                                <Paragraph className='content'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod egestas faucibus. Maecenas lacinia enim vel risus pellentesque, ut ullamcorper odio vestibulum. Vestibulum quis gravida sapien. Curabitur sollicitudin pharetra risus, vitae placerat elit posuere eu. Cras nec velit felis...
                                </Paragraph>
                                <Button className='dark' href='/ticket/1'>
                                    See now
                                </Button>
                            </Row>
                        </Card>
                    </Row>
                </Content>
            </Layout>

            <_Footer />
        </>
    );
};

export default Home;