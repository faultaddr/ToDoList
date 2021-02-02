import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Timeline, Input, Button, Modal, TimePicker, Steps } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const { Step } = Steps;

export class TimeSeries extends React.Component {
  timeRef: never;

  constructor(props: never) {
    super(props);
  }

  handleTimeChange = (_time: never, timeString: never) => {
    this.setState({
      setTime: timeString,
    });
  };

  handleOpenChange = (open: never) => {
    this.setState({ open });
  };

  handleClose = () => this.setState({ open: false });

  handleModalClose = (flag: boolean) => {
    if (flag == true) {
      if (this.state.setContent != null && this.state.setTime != null) {
        this.setState({
          modalVisible: false,
          list: [
            ...this.state.list,
            {
              time: this.state.setTime,
              content: this.state.setContent,
              color: null,
              status: 0,
            },
          ],
          setTime: null,
          setContent: null,
        });
      } else {
        this.setState({ modalVisible: false });
      }
    } else {
      this.setState({ modalVisible: false });
    }
  };

  handleInputChange = (e: never) =>
    this.setState({ setContent: e.target.value });

  handleStatusChange = (index: number) => {
    console.log(index);
    const newStatus: {
      time: string;
      content: string;
      color: string;
      status: number;
    } = this.state.list[index];
    const before = this.state.list.slice(0, index);
    const after = this.state.list.slice(index + 1);
    newStatus.color = 'green';
    newStatus.status = 1;
    this.setState({
      list: [...before, newStatus, ...after],
    });
  };

  handleStatusDelete = (index: number) => {
    const before = this.state.list.slice(0, index);
    const after = this.state.list.slice(index + 1);
    this.setState({
      list: [...before, ...after],
    });
  };

  state = {
    open: false,
    initLoading: true,
    loading: false,
    data: [],
    list: [],
    inputState: [false, false, false, false],
    modalVisible: false,
    setTime: null,
    setContent: null,
  };

  addEvent = (_e: never) => {
    // 根据index 去修改对应的数据
    this.setState({
      modalVisible: true,
    });
  };

  setRef = (element: unknown) => {
    this.timeRef = element;
  };

  render() {
    let { list } = this.state;
    list = list.sort(function (
      a: {
        time: string;
        content: string;
        color: string;
        status: number;
      },
      b: {
        time: string;
        content: string;
        color: string;
        status: number;
      }
    ): never {
      console.log(Date.parse(b.time) - Date.parse(a.time));
      return Date.parse(b.time) - Date.parse(a.time);
    });
    let elementList: never = [];
    list.map(
      (
        e: {
          time: string;
          content: string;
          color: string;
          status: number;
        },
        index
      ) => {
        elementList = [
          ...elementList,
          <Timeline.Item label={e.time} color={e.color}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ alignSelf: 'flex-start', fontSize: 16 }}>
                {e.content}
              </span>
              <div style={{ width: '60%' }}>
                <Steps current={e.status} percent={60}>
                  <Step />
                  <Step />
                </Steps>
              </div>
              <div>
                <CheckCircleTwoTone
                  twoToneColor="#52c41a"
                  style={{
                    alignSelf: 'center',
                    marginTop: '10px',
                    fontSize: '18px',
                  }}
                  onClick={(_e) => this.handleStatusChange(index)}
                />
                <CloseCircleTwoTone
                  style={{
                    alignSelf: 'center',
                    marginTop: '10px',
                    fontSize: '18px',
                    marginLeft: '10px',
                  }}
                  onClick={(_e) => this.handleStatusDelete(index)}
                />
              </div>
            </div>
          </Timeline.Item>,
        ];
      }
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Modal
          visible={this.state.modalVisible}
          onOk={(_e) => this.handleModalClose(true)}
          onCancel={(_e) => this.handleModalClose(false)}
        >
          <div>
            <TimePicker
              open={this.state.open}
              onChange={this.handleTimeChange}
              onOpenChange={this.handleOpenChange}
              defaultValue={undefined}
              renderExtraFooter={() => (
                <Button size="small" type="primary" onClick={this.handleClose}>
                  Ok
                </Button>
              )}
            />
            <Input
              placeholder="事项描述"
              onChange={this.handleInputChange}
              defaultValue=""
            />
          </div>
        </Modal>
        <Button
          style={{ alignSelf: 'center', marginBottom: '3%' }}
          onClick={(e) => this.addEvent(e)}
        >
          添加事务
        </Button>
        <Timeline mode="left" pending>
          {elementList}
        </Timeline>
      </div>
    );
  }
}
