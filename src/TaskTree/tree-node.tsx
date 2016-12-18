/**
 * Created by netre on 15.12.2016.
 */
import React, {ReactElement,PropTypes, Children, cloneElement} from 'react';
import {dndWrapTarget} from './utils/drag-and-drop-utils';

const styles = require('./tree-node.scss');

interface TreeNodeProps {
    children: Array<ReactElement<any>>;
    lowerSiblingCounts: Array<any>;
    connectDropTarget: (element: ReactElement<any>) => ReactElement<any>;
    isOver: boolean;
    draggedNode: Object,
    canDrop: boolean,
    getPrevRow: void,
    node: any,
    path: any,
    maxDepth: any,
    dragHover: any,
    style: any
}

@dndWrapTarget
export default class TreeNode extends React.Component<TreeNodeProps,{}> {
    render() {
        let {
            children,
            lowerSiblingCounts,
            connectDropTarget,
            isOver,
            draggedNode,
            canDrop,
            getPrevRow: _getPrevRow,
            node: _node,
            path: _path,
            maxDepth: _maxDepth,
            dragHover: _dragHover,
            style,
            ...otherProps
        } = this.props;

        if (lowerSiblingCounts) {
            const scaffoldBlockCount = lowerSiblingCounts.length;
            return connectDropTarget(
                <tbody
                    {...otherProps}
                    style={{...style, width: ''}}
                    className={styles.rst__node}
                >
                {Children.map(children, (child: any) => cloneElement(child, {
                    scaffoldBlockCount,
                    isOver,
                    canDrop,
                    draggedNode,
                }))}
                </tbody>
            );
        }
        else {
            return (
                <tbody
                    {...otherProps}
                    style={{...style, width: ''}}
                    className={styles.rst__node}
                >
                {Children.map(children, (child: any) => cloneElement(child, {
                    isOver: false,
                    canDrop: false
                }))}
                </tbody>
            );
        }
    }
}
