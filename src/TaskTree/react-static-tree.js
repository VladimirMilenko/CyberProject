/**
 * Created by netre on 07.12.2016.
 */
import React, {Component, PropTypes} from 'react';

import NodeRendererDefault from './node-renderer-default';
import {
    getFlatDataFromTree,
    changeNodeAtPath,
    removeNodeAtPath,
    insertNode,
    getDescendantCount,
} from './utils/tree-data-utils';
import {
    defaultGetNodeKey,
} from './utils/default-handlers';
import styles from './react-sortable-tree.scss';
import {inject, observer} from 'mobx-react';
import moment from "moment";
import {findDOMNode} from "react-dom";
import TaskRenderer from '../TaskRenderer/TaskRenderer';
import {If} from 'jsx-control-statements';
import 'moment/locale/ru';
moment.locale('ru');


@inject("taskTableViewMode", "appState")
@observer
class ReactStaticTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            draggingTreeData: null,
            swapFrom: null,
            swapLength: null,
            swapDepth: null,
            rows: this.getRows(props.treeData),
            treeData: props.treeData,
            searchMatches: [],
            searchFocusTreeIndex: null,
            scrollToPixel: null,
            minWidth: 200
        };

    }

    componentWillReceiveProps(nextProps) {
        console.log('cwrp');
        this.setState({
            rows: this.getRows(nextProps.treeData),
            treeData: nextProps.treeData
        });
    }

    handleChange(evt, propertyField) {
        if (!this.state.touched && propertyField == 'title') {
            this.setState({
                touched: true,
                plannedStartDate: moment().format("DD.MM.YYYY"),
                plannedEndDate: moment(moment().format("DD.MM.YYYY"), "DD.MM.YYYY").add(1, 'd').format("DD.MM.YYYY"),
                duration: "1",
                progress: "0"
            });
        }
        if (propertyField == 'duration') {
            this.setState({
                plannedEndDate: (moment(this.state.plannedStartDate, "DD.MM.YYYY").add(evt.target.value, 'd')).format("DD.MM.YYYY")
            });
        }
        if (propertyField == 'startDate') {
            if (moment(evt.target.value).isValid())
                this.setState({
                    plannedEndDate: moment(evt.target.value, "DD.MM.YYYY").add(this.state.duration, 'd').format("DD.MM.YYYY")
                });
        }
        if (propertyField == 'plannedEndDate') {
            if (moment(evt.target.value, "DD.MM.YYYY").isValid())
                this.setState({
                    duration: Math.abs(moment.duration(moment(evt.target.value, "DD.MM.YYYY").diff(moment(this.state.plannedStartDate, "DD.MM.YYYY"))).asDays() - 1)
                });
        }

        this.setState({[propertyField]: evt.target.value});

    }

    handleKeyPress(event) {
        if (event.key == 'Enter') {
            let taskJSON = {
                plannedStartDate: moment(this.state.plannedStartDate, "DD.MM.YYYY"),
                plannedEndDate: moment(this.state.plannedEndDate, "DD.MM.YYYY"),
                duration: this.state.duration,
                title: this.state.title,
            };
            event.preventDefault();
            this.props.taskCreateHandler(taskJSON);
            this.setState({
                title: "",
                touched: false,
                executor: "",
                plannedStartDate: "",
                plannedEndDate: "",
                duration: "",
                progress: ""
            });
            findDOMNode(event.target).blur();
        }

    }

    getRows(treeData) {
        return getFlatDataFromTree({
            ignoreCollapsed: true,
            getNodeKey: this.props.getNodeKey,
            treeData,
        });
    }

    switchBatchPropsState(newState) {
        for (let param of this.props.taskTableViewMode.viewProperties.toJSON()) {
            if (param.isBatchOnly && !param.required) {
                param.enabled = newState;
            }
        }
        this.props.taskTableViewMode.batchParamsVisible = newState;
    }

    render() {
        let tasksTree = this.props.appState.gantOrderStore.gantOrder;
        let rows = getFlatDataFromTree({
            treeData: tasksTree.toJSON(), getNodeKey: ({node: _node, treeIndex}) => {
                return _node.task.uuid;
            },
            ignoreCollapsed: true
        });

        return (
            <table style={{borderSpacing: '0', borderCollapse: 'collapse'}}>
                <thead>
                <tr>
                    {this.props.taskTableViewMode.viewProperties.toJSON().filter(view => view.enabled).map((view) => {
                        if (view.type == 'collapse') {
                            return (
                                <td key={'title-' + view.propertyField} className="rst__table__cell__header"
                                    style={{minWidth: 20, height: 'auto'}}>
                                    <If condition={this.props.taskTableViewMode.batchParamsVisible}>
                                        <span onClick={(e) => {
                                            this.switchBatchPropsState(false)
                                        }} className="icon icon-arrows_left"/>
                                    </If>
                                    <If condition={!this.props.taskTableViewMode.batchParamsVisible}>
                                        <span onClick={(e) => {
                                            this.switchBatchPropsState(true)
                                        }} className="icon icon-arrows_right"/>
                                    </If>
                                </td>
                            )
                        }
                        if (view.type == 'status') {
                            return (<td key={'title-' + view.propertyField}
                                        className="rst__table__cell__header rst__table__cell_status"
                                        style={{minWidth: 20, height: 'auto', borderBottom: '1px solid #cddae4'}}>

                            </td>);
                        }
                        return (
                            <td key={'title-' + view.propertyField} className="rst__table__cell__header">
                                {view.propertyName}
                                <If condition={view.orderable}>
                                    <If condition={!this.props.appState.gantOrderStore.ordered}>
                                        <span className="anticon anticon-arrow-down" onClick={(e) => {
                                            this.props.appState.gantOrderStore.orderBy(view.propertyField);
                                        }} style={{
                                            float: 'right',
                                            width: 10,
                                            height: 10,
                                            display: 'inline-block',
                                            padding: '10px 0'
                                        }}/>
                                    </If>
                                    <If condition={this.props.appState.gantOrderStore.ordered}>
                                        <span className="anticon anticon-arrow-up" onClick={(e) => {
                                            this.props.appState.gantOrderStore.orderBy(view.propertyField);
                                        }} style={{
                                            float: 'right',
                                            width: 10,
                                            height: 10,
                                            display: 'inline-block',
                                            padding: '10px 0'
                                        }}/>
                                    </If>
                                </If>
                            </td>
                        )
                    })}
                </tr>
                </thead>
                <tbody className={styles.rst__node}>
                {rows.map((row, index) => {
                    return this.renderRow(
                        rows[index],
                        index,
                        row.node.taskId,
                        {},
                        () => (rows[index - 1] || null),
                        []
                    )
                })
                }
                </tbody>
            </table>
        );
    }

    renderRow({node, path, lowerSiblingCounts, treeIndex}, listIndex, key, style, getPrevRow, matchKeys) {
        const nodeKey = path[path.length - 1];
        const isSearchMatch = nodeKey in matchKeys;
        const isSearchFocus = isSearchMatch &&
            matchKeys[nodeKey] === this.props.searchFocusOffset;

        const nodeProps = !this.props.generateNodeProps ? {} : this.props.generateNodeProps({
            node,
            path,
            lowerSiblingCounts,
            treeIndex,
            isSearchMatch,
            isSearchFocus,
        });
        return (
            <TaskRenderer
                node={node}
                key={node.task.key}
                task={node.task}
                path={path}
                taskTableViewMode={this.props.taskTableViewMode}
                isSearchMatch={isSearchMatch}
                isSearchFocus={isSearchFocus}
                treeIndex={treeIndex}
                scaffoldBlockPxWidth={this.props.scaffoldBlockPxWidth}
                {...nodeProps}
            />
        );
    }
}

ReactStaticTree.propTypes = {
    treeData: PropTypes.arrayOf(PropTypes.object).isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    innerStyle: PropTypes.object,

    rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),

    reactVirtualizedListProps: PropTypes.object,

    scaffoldBlockPxWidth: PropTypes.number,

    maxDepth: PropTypes.number,

    searchMethod: PropTypes.func, // eslint-disable-line react/no-unused-prop-types

    searchQuery: PropTypes.any,

    searchFocusOffset: PropTypes.number,

    searchFinishCallback: PropTypes.func, // eslint-disable-line react/no-unused-prop-types

    generateNodeProps: PropTypes.func,

    nodeContentRenderer: PropTypes.any,

    getNodeKey: PropTypes.func,

    onChange: PropTypes.func.isRequired,

    onMoveNode: PropTypes.func,

    onVisibilityToggle: PropTypes.func,
};

ReactStaticTree.defaultProps = {
    getNodeKey: defaultGetNodeKey,
    nodeContentRenderer: NodeRendererDefault,
    rowHeight: 31,
    slideRegionSize: 100,
    scaffoldBlockPxWidth: 20,
    style: {},
    innerStyle: {},
    searchQuery: null,
};

export default ReactStaticTree;
