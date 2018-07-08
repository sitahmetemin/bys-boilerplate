import * as React from 'react';
import * as GridLayout from 'react-grid-layout';
// import './style.css'

class Home extends React.Component<{},{}> {


    change(layout:any) {
        // console.log('a',layout)
    }

    stop(layout: any, oldItem: any, newItem: any,placeholder: any, e: any, element: any) {
        /*console.log('layout',layout)
        console.log('oldItem',oldItem)
        console.log('newItem',newItem)
        console.log('placeholder',placeholder)
        console.log('e',e)*/
        // console.log('eleme',element)
    }

    render() {

        let layout = [
            {i: 'a', x: 0, y: 0, w: 1, h: 2},
            {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 12},
            {i: 'c', x: 4, y: 0, w: 1, h: 2}
        ];

        return (
            <GridLayout
                className="layout"
                layout={layout}
                cols={12}
                rowHeight={10}
                margin={[0, 0]}
                width={1200}
                autoSize={true}
                onLayoutChange={(val:any)=> this.change(val)}
                onDragStop={(layout: any, oldItem: any, newItem: any,placeholder: any, e: any, element: any)=> this.stop(layout, oldItem, newItem, placeholder, e, element)}
            >
                <div key="a">
                </div>
                <div key="b">b</div>
                <div key="c">
                    sss
                </div>
            </GridLayout>
        );
    }
}

export default Home
