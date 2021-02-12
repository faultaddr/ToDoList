import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Timeline, Input, Button, Modal, TimePicker, Steps } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const { Step } = Steps;
/**
 * 首先导出Props声明, 同样是{ComponentName}Props形式命名
 */
export interface TimeSeriesProps {
  defaultCount?: number; // 可选props, 不需要?修饰
}

/**
 * 组件状态, 不需要暴露
 */
interface State {
  open: boolean;
  list: ListType[];
  modalVisible: boolean;
  setTime: string;
  setContent: string;
}

interface ListType {
  time: string;
  content: string;
  color: string;
  status: number;
}
export default class TimeSeries extends React.Component<
  TimeSeriesProps,
  State
> {
  constructor(props: TimeSeriesProps) {
    super(props);
    this.state = {
      open: false,
      list: [],
      modalVisible: false,
      setTime: '',
      setContent: '',
    };
  }

  handleTimeChange = (_time: any, timeString: string) => {
    console.log('>>>>>', timeString);
    this.setState({
      setTime: timeString,
    });
  };

  handleOpenChange = (open: boolean) => {
    this.setState({ open });
  };

  handleClose = () => this.setState({ open: false });

  handleModalClose = (flag: boolean) => {
    const tempState = this.state;
    console.log(tempState);
    if (flag === true) {
      if (tempState.setContent !== '' && tempState.setTime !== '') {
        const newStatus: ListType = {
          time: tempState.setTime,
          content: tempState.setContent,
          color: '',
          status: 0,
        };
        this.setState({
          modalVisible: false,
          list: [...tempState.list, newStatus],
          setTime: '',
          setContent: '',
        });
      } else {
        this.setState({ modalVisible: false });
      }
    } else {
      this.setState({ modalVisible: false });
    }
  };

  handleInputChange = (e: any) => this.setState({ setContent: e.target.value });

  handleStatusChange = (index: number) => {
    const tempState = this.state;
    const newStatus: ListType = tempState.list[index];
    const before = tempState.list.slice(0, index);
    const after = tempState.list.slice(index + 1);
    newStatus.color = 'green';
    newStatus.status = 1;
    this.setState({
      list: [...before, newStatus, ...after],
    });
  };

  handleStatusDelete = (index: number) => {
    const tempState = this.state;
    const before = tempState.list.slice(0, index);
    const after = tempState.list.slice(index + 1);
    this.setState({
      list: [...before, ...after],
    });
  };

  addEvent = () => {
    // 根据index 去修改对应的数据
    this.setState({
      modalVisible: true,
    });
  };

  getSecond = (s: string) => {
    const as: string[] = s.split(':');
    const hour: number = Number.parseInt(as[0], 10);
    const minute: number = Number.parseInt(as[1], 10);
    const second: number = Number.parseInt(as[2], 10);
    return second + minute * 60 + hour * 3600;
  };

  render() {
    let { list } = this.state;
    const tempState = this.state;

    list = list.sort((a: ListType, b: ListType): number => {
      const sa = this.getSecond(a.time);
      const sb = this.getSecond(b.time);
      return sa - sb;
    });
    const elementList: unknown[] = [];
    list.map(
      (e: ListType, index: number): ListType => {
        elementList.push(
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
              {/* <div style={{ width: '60%' }}>
                <Steps current={e.status} percent={60}>
                  <Step />
                  <Step />
                </Steps>
              </div> */}
              <div>
                <CheckCircleTwoTone
                  twoToneColor="#52c41a"
                  style={{
                    alignSelf: 'center',
                    marginTop: '10px',
                    fontSize: '18px',
                  }}
                  onClick={() => this.handleStatusChange(index)}
                />
                <CloseCircleTwoTone
                  style={{
                    alignSelf: 'center',
                    marginTop: '10px',
                    fontSize: '18px',
                    marginLeft: '10px',
                  }}
                  onClick={() => this.handleStatusDelete(index)}
                />
              </div>
            </div>
          </Timeline.Item>
        );
        return list[index];
      }
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Modal
          style={{ backgroundColor: 'transparent !important' }}
          visible={tempState.modalVisible}
          onOk={(e) => this.handleModalClose(true)}
          onCancel={(e) => this.handleModalClose(false)}
        >
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TimePicker
              open={tempState.open}
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
          style={{
            alignSelf: 'flex-end',
            marginBottom: '3%',
            marginRight: '3%',
          }}
          onClick={() => this.addEvent()}
        >
          添加事务
        </Button>
        <Timeline mode="left" pending style={{ marginLeft: '-50%' }}>
          {elementList}
        </Timeline>
      </div>
    );
  }
}
