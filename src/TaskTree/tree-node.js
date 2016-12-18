import React, {PropTypes, Children, cloneElement} from 'react';
import {dndWrapTarget} from './utils/drag-and-drop-utils';
import styles from './tree-node.scss';

const TreeNode = ({
    children,
    listIndex,
    swapFrom,
    swapLength,
    swapDepth,
    scaffoldBlockPxWidth,
    lowerSiblingCounts,
    connectDropTarget,
    isOver,
    draggedNode,
    canDrop,
    treeIndex,
    getPrevRow: _getPrevRow, // Delete from otherProps
    node: _node,             // Delete from otherProps
    path: _path,             // Delete from otherProps
    maxDepth: _maxDepth,     // Delete from otherProps
    dragHover: _dragHover,   // Delete from otherProps
    ...otherProps,
}) => {
    // Construct the scaffold representing the structure of the tree
    if(lowerSiblingCounts) {
        const scaffoldBlockCount = lowerSiblingCounts.length;
        const scaffold = [];
        return connectDropTarget(
            <tbody
                {...otherProps}
                style={{...otherProps.style, width: ''}}
                className={styles.rst__node}
            >
                    {Children.map(children, child => cloneElement(child, {
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
                style={{...otherProps.style, width: ''}}
                className={styles.rst__node}
            >
                    {Children.map(children, child => cloneElement(child, {
                        isOver:false,
                        canDrop: false
                    }))}
            </tbody>
        );
    }
};

TreeNode.propTypes = {
    treeIndex: PropTypes.number.isRequired,
    node: PropTypes.object.isRequired,
    path: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    swapFrom: PropTypes.number,
    swapDepth: PropTypes.number,
    swapLength: PropTypes.number,
    scaffoldBlockPxWidth: PropTypes.number,
    lowerSiblingCounts: PropTypes.array,

    listIndex: PropTypes.number.isRequired,
    children: PropTypes.node,

    // Drop target
    connectDropTarget: PropTypes.func,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    draggedNode: PropTypes.object,
};

export default dndWrapTarget(TreeNode);
