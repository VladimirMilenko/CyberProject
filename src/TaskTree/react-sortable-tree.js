import React, {Component, PropTypes} from 'react';
import TreeNode from './tree-node';

import ContentEditable from 'react-contenteditable';
import NodeRendererDefault from './node-renderer-default';
import {
    getFlatDataFromTree,
    changeNodeAtPath,
    removeNodeAtPath,
    insertNode,
    getDescendantCount,
} from './utils/tree-data-utils';
import {
    swapRows,
} from './utils/generic-utils';
import {
    defaultGetNodeKey,
} from './utils/default-handlers';
import {
    dndWrapRoot,
    dndWrapSource,
} from './utils/drag-and-drop-utils';
import styles from './react-sortable-tree.scss';
import {inject, observer} from 'mobx-react';
import moment from "moment";
import {findDOMNode} from "react-dom";
import 'moment/locale/ru';
moment.locale('ru');
import {DatePicker} from 'antd';
import Task from "../../models/GantModels/Task";
class ReactSortableTree extends Component {
    constructor(props) {
        super(props);

        this.nodeContentRenderer = dndWrapSource(props.nodeContentRenderer);

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

        this.toggleChildrenVisibility = this.toggleChildrenVisibility.bind(this);
        this.moveNode = this.moveNode.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.dragHover = this.dragHover.bind(this);
        this.endDrag = this.endDrag.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            rows: this.getRows(nextProps.treeData),
            treeData: nextProps.treeData
        });
    }

    handleChange(evt, propertyField) {
        if (!this.state.touched && propertyField == 'title') {
            console.log('reset');
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

    componentWillMount() {
    }

    toggleChildrenVisibility({node: targetNode, path, treeIndex: _treeIndex}) {
        const treeData = changeNodeAtPath({
            treeData: this.props.treeData,
            path,
            newNode: ({node}) => ({...node, expanded: !node.expanded}),
            getNodeKey: this.props.getNodeKey,
        });

        this.props.onChange(treeData);

        if (this.props.onVisibilityToggle) {
            this.props.onVisibilityToggle({
                treeData,
                node: targetNode,
                expanded: !targetNode.expanded,
            });
        }
    }

    moveNode({node, depth, minimumTreeIndex}) {
        const treeData = insertNode({
            treeData: this.state.draggingTreeData,
            newNode: node,
            depth,
            minimumTreeIndex,
            expandParent: true,
        }).treeData;

        this.props.onChange(treeData);

    }


    getRows(treeData) {
        return getFlatDataFromTree({
            ignoreCollapsed: true,
            getNodeKey: this.props.getNodeKey,
            treeData,
        });
    }

    startDrag({path}) {
        const draggingTreeData = removeNodeAtPath({
            treeData: this.props.treeData,
            path,
            getNodeKey: this.props.getNodeKey,
        });

        this.setState({
            draggingTreeData,
        });
    }

    dragHover({node: draggedNode, depth, minimumTreeIndex}) {
        const addedResult = insertNode({
            treeData: this.state.draggingTreeData,
            newNode: draggedNode,
            depth,
            minimumTreeIndex,
            expandParent: true,
        });

        const rows = this.getRows(addedResult.treeData);
        const expandedParentPath = rows[addedResult.treeIndex].path;

        const swapFrom = addedResult.treeIndex;
        const swapTo = minimumTreeIndex;
        const swapLength = 1 + getDescendantCount({node: draggedNode});
        this.setState({
            rows: swapRows(rows, swapFrom, swapTo, swapLength),
            swapFrom,
            swapLength,
            swapDepth: depth,
            draggingTreeData: changeNodeAtPath({
                treeData: this.state.draggingTreeData,
                path: expandedParentPath.slice(0, -1),
                newNode: ({node}) => ({...node, expanded: true}),
                getNodeKey: this.props.getNodeKey,
            }),
        });
    }

    endDrag(dropResult) {
        if (!dropResult) {
            return this.setState({
                draggingTreeData: null,
                swapFrom: null,
                swapLength: null,
                swapDepth: null,
                rows: this.getRows(this.props.treeData),
            });
        }
        this.moveNode(dropResult);
    }

    scrollBy(x, y) {
        if (!this.containerRef) {
            return;
        }

        if (x !== 0) {
            this.containerRef.scrollLeft += x;
        }

        if (y !== 0) {
            this.scrollTop = this.scrollTop ? (this.scrollTop + y) : y;
            this.setState({scrollToPixel: this.scrollTop});
        }
    }

    render() {
        let {
            style,
            className,
            innerStyle,
            rowHeight,
            _connectDropTarget,
        } = this.props;
        const {
            rows,
            searchMatches,
            searchFocusTreeIndex,
            scrollToPixel,
        } = this.state;
        const matchKeys = {};
        searchMatches.forEach(({path}, i) => {
            matchKeys[path[path.length - 1]] = i;
        });

        const scrollToInfo = searchFocusTreeIndex !== null ? {scrollToIndex: searchFocusTreeIndex} : {};
        return (
            <table style={{borderSpacing: '0', borderCollapse: 'collapse'}}>
                <thead>
                <tr>
                    <td className="rst__table__cell__header">
                        Задача
                    </td>
                    {this.props.taskTableViewMode.viewProperties.toJSON().filter(view => view.enabled).map((view) => {
                        return (
                            <td key={'title-' + view.propertyField} className="rst__table__cell__header">
                                {view.propertyName}
                            </td>
                        )
                    })}
                </tr>
                </thead>

                {rows.map((row, index) => {
                    return this.renderRow(
                        rows[index],
                        index,
                        row.node.taskId,
                        {},
                        () => (rows[index - 1] || null),
                        matchKeys
                    )
                })
                }
                <tfoot className="rst__node">
                <tr>
                    <td className="rst__table__cell">
                        <ContentEditable
                            html={this.state.title} // innerHTML of the editable div
                            disabled={false}       // use true to disable edition
                            onChange={(event) => {
                                this.handleChange(event, 'title')
                            }}
                            onKeyPress={this.handleKeyPress.bind(this)}
                        />
                    </td>
                    {this.props.taskTableViewMode.viewProperties.toJSON().filter(view => view.enabled).map((view) => {
                        if (view.type == 'date') {
                            return (
                                <td className="rst__table__cell" key={`editable-${view.propertyField}`}>
                                    <div style={{display: this.state.touched ? 'block' : 'none'}}>
                                        <DatePicker
                                            allowClear={false}
                                            size="medium"
                                            value={moment(this.state[[view.propertyField]], 'DD.MM.YYYY')}
                                            format="DD.MM.YYYY"
                                            placeholder=""
                                            onChange={(data) => {
                                                console.log(data);
                                                switch (view.propertyField) {
                                                    case 'plannedStartDate':
                                                        this.setState({
                                                            plannedStartDate: moment(data,'DD.MM.YYYY'),
                                                            duration: moment(this.state.plannedEndDate).diff(moment(data,'DD.MM.YYYY'), 'days') + 1
                                                        });
                                                        break;
                                                    case 'plannedEndDate':
                                                        this.setState({
                                                            plannedEndDate: moment(data,'DD.MM.YYYY'),
                                                            duration: moment(data).diff(moment(this.state.plannedStartDate,'DD.MM.YYYY'), 'days') + 1
                                                        });
                                                        break;
                                                }
                                            }}
                                            locale={{
                                                lang: {
                                                    today: 'Сегодня'
                                                }
                                            }}
                                        />
                                    </div>
                                </td>
                            )
                        }
                        return (
                            <td className="rst__table__cell" key={`editable-${view.propertyField}`}>
                                <ContentEditable
                                    html={this.state[[view.propertyField]]} // innerHTML of the editable div
                                    disabled={false}       // use true to disable edition
                                    onChange={(event) => {
                                        this.handleChange(event, view.propertyField)
                                    }}
                                    onKeyPress={this.handleKeyPress.bind(this)}
                                />
                            </td>
                        )
                    })}
                </tr>
                </tfoot>
            </table>
        );
    }

    renderRow({node, path, lowerSiblingCounts, treeIndex}, listIndex, key, style, getPrevRow, matchKeys) {
        const NodeContentRenderer = this.nodeContentRenderer;
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
            <TreeNode
                style={{...style, top: style.top}}
                key={"tree-" + node.task.key}
                treeIndex={treeIndex}
                listIndex={listIndex}
                getPrevRow={getPrevRow}
                node={node}
                path={path}
                lowerSiblingCounts={lowerSiblingCounts}
                scaffoldBlockPxWidth={this.props.scaffoldBlockPxWidth}
                swapFrom={this.state.swapFrom}
                swapLength={this.state.swapLength}
                swapDepth={this.state.swapDepth}
                maxDepth={this.props.maxDepth}
                dragHover={this.dragHover}
            >
                <NodeContentRenderer
                    node={node}
                    path={path}
                    isSearchMatch={isSearchMatch}
                    isSearchFocus={isSearchFocus}
                    treeIndex={treeIndex}
                    startDrag={this.startDrag}
                    endDrag={this.endDrag}
                    toggleChildrenVisibility={this.toggleChildrenVisibility}
                    scaffoldBlockPxWidth={this.props.scaffoldBlockPxWidth}
                    {...nodeProps}
                />
            </TreeNode>
        );
    }
}

ReactSortableTree.propTypes = {
    // Tree data in the following format:
    // [{title: 'main', subtitle: 'sub'}, { title: 'value2', expanded: true, children: [{ title: 'value3') }] }]
    // `title` is the primary label for the node
    // `subtitle` is a secondary label for the node
    // `expanded` shows children of the node if true, or hides them if false. Defaults to false.
    // `children` is an array of child nodes belonging to the node.
    treeData: PropTypes.arrayOf(PropTypes.object).isRequired,

    // Style applied to the container wrapping the tree (style defaults to {height: '100%'})
    style: PropTypes.object,

    // Class name for the container wrapping the tree
    className: PropTypes.string,

    // Style applied to the inner, scrollable container (for padding, etc.)
    innerStyle: PropTypes.object,

    // Used by react-virtualized
    // Either a fixed row height (number) or a function that returns the
    // height of a row given its index: `({ index: number }): number`
    rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),

    // Size in px of the region near the edges that initiates scrolling on dragover
    slideRegionSize: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types

    // Custom properties to hand to the react-virtualized list
    // https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#prop-types
    reactVirtualizedListProps: PropTypes.object,

    // The width of the blocks containing the lines representing the structure of the tree.
    scaffoldBlockPxWidth: PropTypes.number,

    // Maximum depth nodes can be inserted at. Defaults to infinite.
    maxDepth: PropTypes.number,

    // The method used to search nodes.
    // Defaults to a function that uses the `searchQuery` string to search for nodes with
    // matching `title` or `subtitle` values.
    // NOTE: Changing `searchMethod` will not update the search, but changing the `searchQuery` will.
    searchMethod: PropTypes.func, // eslint-disable-line react/no-unused-prop-types

    // Used by the `searchMethod` to highlight and scroll to matched nodes.
    // Should be a string for the default `searchMethod`, but can be anything when using a custom search.
    searchQuery: PropTypes.any,

    // Outline the <`searchFocusOffset`>th node and scroll to it.
    searchFocusOffset: PropTypes.number,

    // Get the nodes that match the search criteria. Used for counting total matches, etc.
    searchFinishCallback: PropTypes.func, // eslint-disable-line react/no-unused-prop-types

    // Generate an object with additional props to be passed to the node renderer.
    // Use this for adding buttons via the `buttons` key,
    // or additional `style` / `className` settings.
    generateNodeProps: PropTypes.func,

    // Override the default component for rendering nodes (but keep the scaffolding generator)
    // This is an advanced option for complete customization of the appearance.
    // It is best to copy the component in `node-renderer-default.js` to use as a base, and customize as needed.
    nodeContentRenderer: PropTypes.any,

    // Determine the unique key used to identify each node and
    // generate the `path` array passed in callbacks.
    // By default, returns the index in the tree (omitting hidden nodes).
    getNodeKey: PropTypes.func,

    // Called whenever tree data changed.
    // Just like with React input elements, you have to update your
    // own component's data to see the changes reflected.
    onChange: PropTypes.func.isRequired,

    // Called after node move operation.
    onMoveNode: PropTypes.func,

    // Called after children nodes collapsed or expanded.
    onVisibilityToggle: PropTypes.func,

    // Injected by react-dnd
    _connectDropTarget: PropTypes.func.isRequired,
};

ReactSortableTree.defaultProps = {
    getNodeKey: defaultGetNodeKey,
    nodeContentRenderer: NodeRendererDefault,
    rowHeight: 31,
    slideRegionSize: 100,
    scaffoldBlockPxWidth: 20,
    style: {},
    innerStyle: {},
    searchQuery: null,
};

export default inject("taskTableViewMode")(observer(dndWrapRoot(ReactSortableTree)));
