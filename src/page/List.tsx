import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { List, Button, Skeleton } from 'antd';

export default class LoadMoreList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };

  componentDidMount() {
    this.getData((res: { results: any }) => {
      console.log(res);
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }

  getData = (callback: (arg0: any) => void) => {
    callback({
      results: ['贼牛皮，今天得干点什么呢', '其实我也不知道要干什么'],
    });
  };

  onLoadMore = () => {
    this.setState({
      loading: true,
    });
    this.getData((res) => {
      const data = this.state.data.concat(res.results);
      this.setState(
        {
          data,
          list: data,
          loading: false,
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        }
      );
    });
  };

  render() {
    const { initLoading, loading, list } = this.state;
    console.log(list, initLoading, loading);
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>Add</Button>
        </div>
      ) : null;
    return (
      <List
        style={{ width: '100%', height: '100%' }}
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">完成</a>,
              <a key="list-loadmore-more">删除</a>,
            ]}
          >
            <Skeleton avatar title loading={false} active>
              <List.Item.Meta
                title={item}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}
