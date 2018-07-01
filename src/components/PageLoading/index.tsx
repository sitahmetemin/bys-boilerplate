import * as React from 'react';
import './style.css'

class LoadingComponent extends React.Component<{},{}> {

    render(): JSX.Element {

        return (
            <div className="app-page-loading" lang={'TR'}>
                Sayfa Yükleniyor..
            </div>
        );
    }
}

export default LoadingComponent
