import React, {PropTypes} from "react";
import {isDescendant} from "./utils/tree-data-utils";
import {inject, observer} from 'mobx-react';

import {ruRU} from 'antd/lib/locale-provider/ru_RU'
import {Choose, When} from 'jsx-control-statements';
import TaskRenderer from '../TaskRenderer/TaskRenderer';


const baseStyles = require('./node-renderer-default.scss');



@inject(["taskTableViewMode"])
@observer
export class NodeRendererDefault extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            toched: false,
            executor: "",
            startDate: "",
            endDate: "",
            duration: "",
            progress: ""

        }
    }

    render() {
        let {
            connectDragPreview,
            connectDragSource,
            node,
            path,
            taskTableViewMode,
        } =this.props;
        let task = node.task;
        return (
            <TaskRenderer task={task} taskTableViewMode={taskTableViewMode} connectDragPreview={connectDragPreview} connectDragSource={connectDragSource} path={path} />
        );
    }
}
/*
 */
NodeRendererDefault.propTypes = {
    node: PropTypes.object.isRequired,
    path: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    treeIndex: PropTypes.number.isRequired,
    isSearchMatch: PropTypes.bool,
    isSearchFocus: PropTypes.bool,

    scaffoldBlockCount: PropTypes.number,
    scaffoldBlockPxWidth: PropTypes.number,
    toggleChildrenVisibility: PropTypes.func,
    buttons: PropTypes.arrayOf(PropTypes.node),
    className: PropTypes.string,
    style: PropTypes.object,

    // Drag and drop API functions
    // Drag source
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    draggedNode: PropTypes.object,
    // Drop target
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
};

export default NodeRendererDefault;
