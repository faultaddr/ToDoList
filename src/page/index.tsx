import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Tabs } from 'antd';
import DraggableTabs from './TabPage';
import LoadMoreList from './List';
import TimeSeries from './timeLine';

const { TabPane } = Tabs;
export default function Tab() {
  return (
    <DraggableTabs>
      <TabPane tab="今日待办" key="1" style={{ color: 'white' }}>
        <TimeSeries />
      </TabPane>
      <TabPane tab="已办事项" key="2">
        <LoadMoreList />
      </TabPane>
      <TabPane tab="备忘录" key="3">
        <LoadMoreList />
      </TabPane>
    </DraggableTabs>
  );
}
