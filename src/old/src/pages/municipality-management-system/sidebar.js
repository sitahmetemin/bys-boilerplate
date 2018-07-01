import React, {Component} from 'react';
import TreeMenu from '../../components/TreeMenu'
import ScrollArea from 'react-scrollbar';
import './style.css'

export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar-menu">
                <ScrollArea
                    speed={0.8}
                    className="tree-menu-area"
                    contentClassName="content"
                    horizontal={false}
                >
                    <TreeMenu/>
                </ScrollArea>
            </div>
        );
    }
}

